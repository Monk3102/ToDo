import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Mail,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  PROJECT_4_EFFORT_REALITY,
  PROJECT_4_HEADER,
  PROJECT_4_IMMEDIATE_CHECKLIST,
  PROJECT_4_PRIORITY_AUDIT,
  PROJECT_4_STRUCTURE_SUMMARY,
  PROJECT_4_WEEKS,
  PROJECT_4_WORKLOAD_AUDIT,
  PROJECT_4_WORKSTREAMS,
  type Project4Workstream,
} from '../data/project4Data';
import { FocusNoteCard } from './FocusNoteCard';
import { InfoPopover } from './InfoPopover';
import type { KnowledgeCategory, KnowledgeProjectFilter } from './KnowledgeBaseView';

type FilterMode = 'all' | 'remaining' | 'completed';
type ViewFocus = 'both' | 'weeks' | 'workstreams';

const STORAGE_EMAIL_BATCHES_KEY = 'phd_email_batches_v1';

interface BatchCount {
  sent: number;
  qualified: number;
}

const DEFAULT_BATCHES: Record<string, BatchCount> = {
  '1': { sent: 0, qualified: 0 },
  '2': { sent: 0, qualified: 0 },
  '3': { sent: 0, qualified: 0 },
  '4': { sent: 0, qualified: 0 },
  '5': { sent: 0, qualified: 0 },
};

function getInitialBatches(): Record<string, BatchCount> {
  try {
    const raw = localStorage.getItem(STORAGE_EMAIL_BATCHES_KEY);
    if (raw) {
      return { ...DEFAULT_BATCHES, ...(JSON.parse(raw) as Record<string, BatchCount>) };
    }
  } catch {
    // Ignore storage errors
  }
  return DEFAULT_BATCHES;
}

interface Project4ViewProps {
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  onResetProject4: () => void;
  onOpenKnowledgeBase: (cat: KnowledgeCategory, proj: KnowledgeProjectFilter) => void;
}

function WorkstreamCard({
  ws,
  completedIds,
  onToggleComplete,
  onSetManyComplete,
  filterMode,
  searchQuery,
  onOpenKnowledgeBase,
}: {
  ws: Project4Workstream;
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  filterMode: FilterMode;
  searchQuery: string;
  onOpenKnowledgeBase: (cat: KnowledgeCategory, proj: KnowledgeProjectFilter) => void;
}) {
  const [activeSubId, setActiveSubId] = useState<string>('all');
  const q = searchQuery.trim().toLowerCase();

  const allTaskIds = useMemo(
    () => ws.subsections.flatMap((s) => (s.tasks ?? []).map((t) => t.id)),
    [ws]
  );
  const totalTasks = allTaskIds.length;
  const doneTasks = allTaskIds.filter((id) => Boolean(completedIds[id])).length;
  const allDone = totalTasks > 0 && doneTasks === totalTasks;

  const visibleSubsections = useMemo(() => {
    return ws.subsections.filter((sub) => {
      if (activeSubId !== 'all' && sub.id !== activeSubId) return false;
      if (!q && filterMode === 'all') return true;

      const tasks = sub.tasks ?? [];
      if (tasks.length === 0) {
        if (filterMode !== 'all') return false;
        if (!q) return true;
        return (
          sub.title.toLowerCase().includes(q) ||
          (sub.intro?.toLowerCase().includes(q) ?? false) ||
          (sub.secondaryItems?.some((i) => i.toLowerCase().includes(q)) ?? false) ||
          (sub.countries?.some((c) => c.toLowerCase().includes(q)) ?? false) ||
          (sub.templates?.some(
            (t) => t.name.toLowerCase().includes(q) || t.focus.toLowerCase().includes(q)
          ) ?? false) ||
          (sub.table?.rows.some((r) => r.some((cell) => cell.toLowerCase().includes(q))) ?? false)
        );
      }

      return tasks.some((t) => {
        const isDone = Boolean(completedIds[t.id]);
        if (filterMode === 'remaining' && isDone) return false;
        if (filterMode === 'completed' && !isDone) return false;
        if (!q) return true;
        return (
          t.text.toLowerCase().includes(q) ||
          sub.title.toLowerCase().includes(q) ||
          ws.title.toLowerCase().includes(q)
        );
      });
    });
  }, [ws, activeSubId, q, filterMode, completedIds]);

  if ((q || filterMode !== 'all') && visibleSubsections.length === 0) {
    return null;
  }

  return (
    <section
      id={ws.id}
      className="scroll-mt-24 rounded-xl border border-slate-200 bg-white overflow-hidden"
    >
      <div className="px-5 py-4 sm:px-6 border-b border-slate-100">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span className="font-mono font-semibold text-blue-700">
                Workstream {ws.letter}
              </span>
              {ws.badge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-amber-800">{ws.badge}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {doneTasks}/{totalTasks} tasks
              </span>
            </div>
            <h3 className="mt-1 text-base sm:text-lg font-semibold tracking-tight text-slate-900">
              {ws.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">{ws.summary}</p>
            {ws.intro && <p className="mt-2 text-xs sm:text-sm text-slate-600">{ws.intro}</p>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <InfoPopover
              label={`Workstream ${ws.letter} guide & templates`}
              title={`Workstream ${ws.letter} · ${ws.title}`}
            >
              <p className="text-slate-700">{ws.summary}</p>
              {ws.intro && <p className="text-slate-600">{ws.intro}</p>}
              {ws.deliverable && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2 text-emerald-950">
                  <span className="font-semibold">Deliverable: </span>
                  <span>{ws.deliverable}</span>
                </div>
              )}
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('schemas', 'project-4')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open PhD Schemas, Email Skeleton & Folders →
                </button>
              </div>
            </InfoPopover>

            {totalTasks > 0 && (
              <button
                type="button"
                onClick={() => onSetManyComplete(allTaskIds, !allDone)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                  allDone
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {allDone ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>All done</span>
                  </>
                ) : (
                  <span>Check workstream</span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Interactive Subsection Switcher Tabs */}
        {ws.subsections.length > 1 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSubId('all')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSubId === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              All ({ws.subsections.length})
            </button>
            {ws.subsections.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveSubId(sub.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeSubId === sub.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {sub.title.split('.')[0]}
                {sub.title.includes('.') ? `. ${sub.title.split('.').slice(1).join('.').trim()}` : ''}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {visibleSubsections.map((sub) => {
          const subTasks = (sub.tasks ?? []).filter((t) => {
            const isDone = Boolean(completedIds[t.id]);
            if (filterMode === 'remaining' && isDone) return false;
            if (filterMode === 'completed' && !isDone) return false;
            if (!q) return true;
            return (
              t.text.toLowerCase().includes(q) ||
              sub.title.toLowerCase().includes(q) ||
              ws.title.toLowerCase().includes(q)
            );
          });

          const subTaskIds = (sub.tasks ?? []).map((t) => t.id);
          const subDoneCount = subTaskIds.filter((id) => Boolean(completedIds[id])).length;

          return (
            <div key={sub.id} className="px-5 py-4 sm:px-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">{sub.title}</h4>
                  {sub.badge && (
                    <span className="text-xs font-semibold text-amber-800">
                      · {sub.badge}
                    </span>
                  )}
                  {sub.note && (
                    <InfoPopover
                      label={`Rule & note for ${sub.title}`}
                      title={sub.title}
                      buttonText="Rule"
                      align="left"
                    >
                      <p className="text-slate-700">{sub.note}</p>
                    </InfoPopover>
                  )}
                </div>
                {subTaskIds.length > 0 && (
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    {subDoneCount}/{subTaskIds.length}
                  </span>
                )}
              </div>

              {sub.intro && <p className="text-xs sm:text-sm text-slate-600">{sub.intro}</p>}

              {sub.countries && (
                <div className="flex flex-wrap gap-1.5">
                  {sub.countries.map((country) => (
                    <span
                      key={country}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              )}

              {sub.templates && (
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {sub.templates.map((tpl) => (
                    <div
                      key={tpl.name}
                      className="rounded-lg border border-slate-200 bg-slate-50/70 p-3"
                    >
                      <div className="text-xs font-semibold text-slate-900">{tpl.name}</div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{tpl.focus}</p>
                    </div>
                  ))}
                </div>
              )}

              {sub.table && (
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <tr>
                        {sub.table.columns.map((col) => (
                          <th key={col} className="px-3.5 py-2 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {sub.table.rows.map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-3.5 py-2 font-medium text-slate-900 whitespace-nowrap">
                            {row[0]}
                          </td>
                          <td className="px-3.5 py-2 text-slate-600">{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {sub.secondaryHeading && (
                <p className="text-xs font-semibold text-slate-700 pt-1">
                  {sub.secondaryHeading}
                </p>
              )}

              {subTasks.length > 0 && (
                <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white overflow-hidden">
                  {subTasks.map((task) => {
                    const isDone = Boolean(completedIds[task.id]);
                    return (
                      <li
                        key={task.id}
                        className={`flex items-start gap-3 px-4 py-2.5 transition-colors ${
                          isDone ? 'bg-slate-50/70' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={isDone}
                          onClick={() => onToggleComplete(task.id)}
                          aria-label={`Mark "${task.text}" as ${isDone ? 'incomplete' : 'complete'}`}
                          className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
                            isDone
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                          }`}
                        >
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleComplete(task.id)}
                          className={`flex-1 text-left text-sm leading-relaxed transition-colors cursor-pointer ${
                            isDone ? 'text-slate-400 line-through' : 'text-slate-800'
                          }`}
                        >
                          {task.text}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {sub.secondaryItems && (
                <ul className="space-y-1.5 rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs sm:text-sm text-slate-700">
                  {sub.secondaryItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {ws.deliverable && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6 text-xs text-slate-700">
          <span className="font-semibold text-slate-900">Deliverable: </span>
          <span>{ws.deliverable}</span>
        </div>
      )}
    </section>
  );
}

export function Project4View({
  completedIds,
  onToggleComplete,
  onSetManyComplete,
  onResetProject4,
  onOpenKnowledgeBase,
}: Project4ViewProps) {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [viewFocus, setViewFocus] = useState<ViewFocus>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const [emailBatches, setEmailBatches] = useState<Record<string, BatchCount>>(getInitialBatches);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EMAIL_BATCHES_KEY, JSON.stringify(emailBatches));
    } catch {
      // Ignore storage errors
    }
  }, [emailBatches]);

  const stats = useMemo(() => {
    const immTasks = PROJECT_4_IMMEDIATE_CHECKLIST.tasks;
    const immTotal = immTasks.length;
    const immDone = immTasks.filter((t) => completedIds[t.id]).length;

    let weekTotal = 0;
    let weekDone = 0;
    for (const w of PROJECT_4_WEEKS) {
      for (const t of w.tasks) {
        weekTotal += 1;
        if (completedIds[t.id]) weekDone += 1;
      }
    }

    let wsTotal = 0;
    let wsDone = 0;
    for (const ws of PROJECT_4_WORKSTREAMS) {
      for (const sub of ws.subsections) {
        for (const t of sub.tasks ?? []) {
          wsTotal += 1;
          if (completedIds[t.id]) wsDone += 1;
        }
      }
    }

    const cpTotal = PROJECT_4_PRIORITY_AUDIT.criticalPath.length;
    const cpDone = PROJECT_4_PRIORITY_AUDIT.criticalPath.filter((c) => completedIds[c.id]).length;

    const totalAll = immTotal + weekTotal + wsTotal;
    const doneAll = immDone + weekDone + wsDone;

    return {
      immTotal,
      immDone,
      weekTotal,
      weekDone,
      wsTotal,
      wsDone,
      cpTotal,
      cpDone,
      totalAll,
      doneAll,
      remainingAll: totalAll - doneAll,
      percent: totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0,
    };
  }, [completedIds]);

  const emailTotals = useMemo(() => {
    let sent = 0;
    let qualified = 0;
    for (const key of ['1', '2', '3', '4', '5']) {
      sent += emailBatches[key]?.sent ?? 0;
      qualified += emailBatches[key]?.qualified ?? 0;
    }
    return { sent, qualified };
  }, [emailBatches]);

  const adjustBatch = (monday: string, field: 'sent' | 'qualified', delta: number) => {
    setEmailBatches((prev) => {
      const curr = prev[monday] ?? { sent: 0, qualified: 0 };
      const nextVal = Math.max(0, Math.min(30, curr[field] + delta));
      const updated = { ...curr, [field]: nextVal };
      if (field === 'qualified' && nextVal > updated.sent) {
        updated.sent = nextVal;
      }
      if (field === 'sent' && nextVal < updated.qualified) {
        updated.qualified = nextVal;
      }
      return { ...prev, [monday]: updated };
    });
  };

  const setBatchTarget = (monday: string, target: number) => {
    setEmailBatches((prev) => ({
      ...prev,
      [monday]: { sent: target, qualified: target },
    }));
  };

  const q = searchQuery.trim().toLowerCase();

  const visibleImmediateTasks = PROJECT_4_IMMEDIATE_CHECKLIST.tasks.filter((task) => {
    const isDone = Boolean(completedIds[task.id]);
    if (filterMode === 'remaining' && isDone) return false;
    if (filterMode === 'completed' && !isDone) return false;
    if (!q) return true;
    return (
      task.text.toLowerCase().includes(q) ||
      (task.category?.toLowerCase().includes(q) ?? false)
    );
  });

  const immAllIds = PROJECT_4_IMMEDIATE_CHECKLIST.tasks.map((t) => t.id);
  const allImmDone = stats.immTotal > 0 && stats.immDone === stats.immTotal;

  const hasAnyCompleted = stats.doneAll > 0 || stats.cpDone > 0;

  return (
    <div className="space-y-6">
      {/* Compact Header Strip */}
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span>PhD</span>
              <span aria-hidden="true">·</span>
              <span>{PROJECT_4_HEADER.title}</span>
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Campaign & Outreach To-Do List
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-mono tabular-nums">
              <span>
                Immediate: {stats.immDone}/{stats.immTotal}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Weeks 0–5: {stats.weekDone}/{stats.weekTotal}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Workstreams A–F: {stats.wsDone}/{stats.wsTotal}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-semibold">
                Emails: {emailTotals.sent}/70 ({emailTotals.qualified} qualified)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {stats.percent}%
              </span>
              <span className="font-mono text-xs text-slate-600 tabular-nums">
                {stats.doneAll}/{stats.totalAll} tasks
              </span>
            </div>

            <InfoPopover
              label="Project 4 overview & connected projects"
              title={PROJECT_4_HEADER.title}
              buttonText="Project info"
            >
              <div className="space-y-1.5 text-slate-700">
                {PROJECT_4_HEADER.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/75 p-2.5 text-slate-800">
                {PROJECT_4_HEADER.overlapNote}
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-slate-900">
                  {PROJECT_4_STRUCTURE_SUMMARY.campaignTitle}
                </div>
                {PROJECT_4_STRUCTURE_SUMMARY.streams.map((s) => (
                  <div key={s.letter} className="text-slate-700">
                    <span className="font-mono font-semibold text-blue-700">{s.letter}.</span>{' '}
                    <span className="font-medium text-slate-900">{s.name}:</span> {s.desc}
                  </div>
                ))}
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('audits', 'project-4')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open PhD Audits, Critical Path & Decisions in Knowledge Base →
                </button>
              </div>
            </InfoPopover>
          </div>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-200"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
      </div>

      <FocusNoteCard
        projectId="project-4"
        onOpenKnowledgeBase={() => onOpenKnowledgeBase('audits', 'project-4')}
      />

      {/* Interactive 5-Monday Email Batch Counter (0 to 70 target) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600 shrink-0" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Monday Email Batch Tracker (Target: 70 emails by 25 Dec)
              </h2>
              <p className="text-xs text-slate-500">
                Click + / - or Set 14 on each Monday session. Track both sent and qualified emails.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
            <span className="font-semibold text-slate-900">
              Sent: {emailTotals.sent}/70
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-emerald-700">
              Qualified: {emailTotals.qualified}/70
            </span>
            <InfoPopover
              label="Monday quality rule & qualified email definition"
              title="Monday Batch Quality Rule"
            >
              <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-2.5 text-slate-900 font-medium">
                {PROJECT_4_WORKLOAD_AUDIT.qualityRule}
              </div>
              <p className="text-slate-700">{PROJECT_4_EFFORT_REALITY.adjustment}</p>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('audits', 'project-4')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open full Workload Audit & Effort Tiers →
                </button>
              </div>
            </InfoPopover>
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {PROJECT_4_WORKLOAD_AUDIT.table
            .filter((row) => !row.isTotal)
            .map((row) => {
              const batch = emailBatches[row.monday] ?? { sent: 0, qualified: 0 };
              const metTarget = batch.qualified >= row.target;
              return (
                <div
                  key={row.monday}
                  className={`rounded-lg border p-3 transition-colors ${
                    metTarget
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      Mon {row.monday} · {row.date}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setBatchTarget(row.monday, metTarget ? 0 : row.target)
                      }
                      className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold transition-colors cursor-pointer ${
                        metTarget
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {metTarget ? '14/14' : 'Set 14'}
                    </button>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <span className="text-slate-600">Sent</span>
                    <div className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                      <button
                        type="button"
                        onClick={() => adjustBatch(row.monday, 'sent', -1)}
                        className="h-5 w-5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                        aria-label={`Decrease Monday ${row.monday} sent`}
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold text-slate-900">
                        {batch.sent}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustBatch(row.monday, 'sent', 1)}
                        className="h-5 w-5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                        aria-label={`Increase Monday ${row.monday} sent`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-slate-600">Qualified</span>
                    <div className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                      <button
                        type="button"
                        onClick={() => adjustBatch(row.monday, 'qualified', -1)}
                        className="h-5 w-5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                        aria-label={`Decrease Monday ${row.monday} qualified`}
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold text-emerald-700">
                        {batch.qualified}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustBatch(row.monday, 'qualified', 1)}
                        className="h-5 w-5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
                        aria-label={`Increase Monday ${row.monday} qualified`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Primary Filter, Search & View Focus Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({stats.totalAll})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('remaining')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'remaining'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Remaining ({stats.remainingAll})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('completed')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === 'completed'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Done ({stats.doneAll})
              </button>
            </div>

            {/* Interactive View Switcher */}
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewFocus('both')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewFocus === 'both'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weeks + Workstreams
              </button>
              <button
                type="button"
                onClick={() => setViewFocus('weeks')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewFocus === 'weeks'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                5-Week Calendar (0–5)
              </button>
              <button
                type="button"
                onClick={() => setViewFocus('workstreams')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewFocus === 'workstreams'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Workstreams (A–F)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 lg:justify-end">
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search weeks, workstreams, or tasks..."
                aria-label="Search PhD tasks"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-8 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                disabled={!hasAnyCompleted}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onResetProject4();
                    setConfirmReset(false);
                  }}
                  className="rounded bg-red-600 px-2 py-0.5 font-semibold text-white hover:bg-red-700 cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded px-2 py-0.5 font-medium text-slate-700 hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 8: Immediate Execution Checklist (Visible first) */}
      <section
        id="p4-immediate"
        className="scroll-mt-24 rounded-xl border border-slate-200 bg-white overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-mono font-semibold text-amber-800">First 4 Days</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {stats.immDone}/{stats.immTotal} done
              </span>
            </div>
            <h2 className="mt-0.5 text-base sm:text-lg font-semibold tracking-tight text-slate-900">
              Immediate Execution Checklist (In Order)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {PROJECT_4_IMMEDIATE_CHECKLIST.intro}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSetManyComplete(immAllIds, !allImmDone)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
              allImmDone
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {allImmDone ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>All done</span>
              </>
            ) : (
              <span>Check all 11</span>
            )}
          </button>
        </div>

        {visibleImmediateTasks.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {visibleImmediateTasks.map((task, idx) => {
              const isDone = Boolean(completedIds[task.id]);
              return (
                <li
                  key={task.id}
                  className={`flex items-start gap-3 px-5 py-3 sm:px-6 transition-colors ${
                    isDone ? 'bg-slate-50/60' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isDone}
                    onClick={() => onToggleComplete(task.id)}
                    aria-label={`Mark "${task.text}" as ${isDone ? 'incomplete' : 'complete'}`}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                      isDone
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleComplete(task.id)}
                    className={`flex-1 text-left text-[15px] leading-relaxed transition-colors cursor-pointer ${
                      isDone ? 'text-slate-400 line-through' : 'text-slate-800'
                    }`}
                  >
                    <span className="font-mono text-xs text-slate-400 mr-2">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{task.text}</span>
                    {task.category && (
                      <span className="ml-2 text-xs font-medium text-slate-400">
                        · {task.category}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-6 py-6 text-center text-xs text-slate-500">
            No immediate tasks match the current filter.
          </div>
        )}
      </section>

      {/* 5-Week Campaign Calendar (Weeks 0-5) */}
      {(viewFocus === 'both' || viewFocus === 'weeks') && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-slate-900">
                Week-by-Week Plan (19 November – 25 December)
              </h2>
              <p className="text-xs text-slate-500">
                Structured around your five Monday-morning email sessions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {PROJECT_4_WEEKS.map((w, i) => (
                <a
                  key={w.id}
                  href={`#${w.id}`}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  W{i}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {PROJECT_4_WEEKS.map((week) => {
              const weekTaskIds = week.tasks.map((t) => t.id);
              const weekDone = weekTaskIds.filter((id) => Boolean(completedIds[id])).length;
              const allWeekDone = weekTaskIds.length > 0 && weekDone === weekTaskIds.length;

              const visibleTasks = week.tasks.filter((task) => {
                const isDone = Boolean(completedIds[task.id]);
                if (filterMode === 'remaining' && isDone) return false;
                if (filterMode === 'completed' && !isDone) return false;
                if (!q) return true;
                return (
                  task.text.toLowerCase().includes(q) ||
                  week.label.toLowerCase().includes(q) ||
                  week.dates.toLowerCase().includes(q)
                );
              });

              if ((q || filterMode !== 'all') && visibleTasks.length === 0) {
                return null;
              }

              return (
                <section
                  key={week.id}
                  id={week.id}
                  className="scroll-mt-24 rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                        <span className="font-mono font-semibold text-blue-700">{week.dates}</span>
                        {week.mondayNote && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-slate-700">{week.mondayNote}</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {weekDone}/{week.tasks.length} tasks
                        </span>
                      </div>
                      <h3 className="mt-0.5 text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                        {week.label}
                      </h3>
                      {week.intro && (
                        <p className="mt-0.5 text-xs text-slate-500">{week.intro}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSetManyComplete(weekTaskIds, !allWeekDone)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                        allWeekDone
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {allWeekDone ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Week done</span>
                        </>
                      ) : (
                        <span>Check week</span>
                      )}
                    </button>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {visibleTasks.map((task) => {
                      const isDone = Boolean(completedIds[task.id]);
                      return (
                        <li
                          key={task.id}
                          className={`flex items-start gap-3 px-5 py-3 sm:px-6 transition-colors ${
                            isDone ? 'bg-slate-50/60' : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={isDone}
                            onClick={() => onToggleComplete(task.id)}
                            aria-label={`Mark "${task.text}" as ${isDone ? 'incomplete' : 'complete'}`}
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                              isDone
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleComplete(task.id)}
                            className={`flex-1 text-left text-[15px] leading-relaxed transition-colors cursor-pointer ${
                              isDone ? 'text-slate-400 line-through' : 'text-slate-800'
                            }`}
                          >
                            {task.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900">{week.deliverablesTitle}:</div>
                    <ul className="mt-1 space-y-0.5 text-slate-600">
                      {week.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {/* Workstreams A-F */}
      {(viewFocus === 'both' || viewFocus === 'workstreams') && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-slate-900">
                Workstreams A–F (Detailed Operational Checklists & Schemas)
              </h2>
              <p className="text-xs text-slate-500">
                Each workstream runs in parallel; use the subsection tabs inside any card to jump to schemas, templates, or countries.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {PROJECT_4_WORKSTREAMS.map((ws) => (
                <a
                  key={ws.id}
                  href={`#${ws.id}`}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  {ws.letter}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {PROJECT_4_WORKSTREAMS.map((ws) => (
              <WorkstreamCard
                key={ws.id}
                ws={ws}
                completedIds={completedIds}
                onToggleComplete={onToggleComplete}
                onSetManyComplete={onSetManyComplete}
                filterMode={filterMode}
                searchQuery={searchQuery}
                onOpenKnowledgeBase={onOpenKnowledgeBase}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
