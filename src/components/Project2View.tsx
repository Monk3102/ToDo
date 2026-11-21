import { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  PROJECT_2_HEADER,
  PROJECT_2_ORDER_OF_EXECUTION,
  PROJECT_2_SUBJECTS,
  type SubjectData,
} from '../data/project2Data';
import { FocusNoteCard } from './FocusNoteCard';
import { InfoPopover } from './InfoPopover';
import type { KnowledgeCategory, KnowledgeProjectFilter } from './KnowledgeBaseView';

type FilterMode = 'all' | 'remaining' | 'completed';

interface Project2ViewProps {
  completedIds: Record<string, boolean>;
  expandedSubjects: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  onToggleExpandSubject: (id: string) => void;
  onResetProject2: () => void;
  onOpenKnowledgeBase: (cat: KnowledgeCategory, proj: KnowledgeProjectFilter) => void;
}

function SubjectCard({
  subject,
  completedIds,
  onToggleComplete,
  onSetManyComplete,
  isExpanded,
  onToggleExpand,
  filterMode,
  searchQuery,
}: {
  subject: SubjectData;
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  filterMode: FilterMode;
  searchQuery: string;
}) {
  const [activeGroupTab, setActiveGroupTab] = useState<string>('all');
  const q = searchQuery.trim().toLowerCase();

  const totalMilestones = subject.milestones.length;
  const doneMilestones = subject.milestones.filter((m) => completedIds[m.id]).length;
  const allMilestonesDone = totalMilestones > 0 && doneMilestones === totalMilestones;

  const allDetailIds = useMemo(() => {
    const ids: string[] = [];
    for (const grp of subject.detailGroups) {
      for (const item of grp.items ?? []) ids.push(item.id);
      for (const pkg of grp.packageTable ?? []) {
        for (const t of pkg.tasks) ids.push(t.id);
      }
    }
    for (const ex of subject.practicalExercises) ids.push(ex.id);
    return ids;
  }, [subject]);

  const totalDetails = allDetailIds.length;
  const doneDetails = allDetailIds.filter((id) => Boolean(completedIds[id])).length;

  const visibleMilestones = subject.milestones.filter((m) => {
    const isDone = Boolean(completedIds[m.id]);

    if (filterMode === 'remaining' && isDone) return false;
    if (filterMode === 'completed' && !isDone) return false;

    if (q) {
      const inMilestone = m.text.toLowerCase().includes(q);
      const inTitle = subject.title.toLowerCase().includes(q) || subject.number.toLowerCase().includes(q);
      const inDetails =
        subject.detailGroups.some(
          (g) =>
            g.heading.toLowerCase().includes(q) ||
            g.items?.some((i) => i.text.toLowerCase().includes(q)) ||
            g.packageTable?.some(
              (p) => p.pkg.toLowerCase().includes(q) || p.tasks.some((t) => t.text.toLowerCase().includes(q))
            )
        ) || subject.practicalExercises.some((e) => e.text.toLowerCase().includes(q));
      if (!inMilestone && !inTitle && !inDetails) return false;
    }

    return true;
  });

  if (visibleMilestones.length === 0) return null;

  const visibleGroups =
    activeGroupTab === 'all'
      ? subject.detailGroups
      : activeGroupTab === 'exercises' || activeGroupTab === 'resources'
        ? []
        : subject.detailGroups.filter((g) => g.id === activeGroupTab);

  const showExercises = activeGroupTab === 'all' || activeGroupTab === 'exercises';
  const showResources = activeGroupTab === 'all' || activeGroupTab === 'resources';

  return (
    <section
      id={subject.id}
      aria-labelledby={`${subject.id}-heading`}
      className={`rounded-xl border transition-colors ${
        allMilestonesDone ? 'border-emerald-200 bg-white' : 'border-slate-200 bg-white'
      }`}
    >
      {/* Subject Header */}
      <div className="px-5 pt-4 pb-3.5 sm:px-6 border-b border-slate-100">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span className="font-mono text-slate-700">Subject {subject.number}</span>
              <span aria-hidden="true">·</span>
              <span>{subject.subtitle}</span>
            </div>
            <h3 id={`${subject.id}-heading`} className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900">
              {subject.number}. {subject.title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="text-right">
              <span
                className={`font-mono text-sm font-semibold tabular-nums ${
                  allMilestonesDone ? 'text-emerald-700' : 'text-slate-900'
                }`}
              >
                {doneMilestones}/{totalMilestones}
              </span>
              <span className="ml-1.5 text-xs text-slate-500">completed</span>
            </div>

            <InfoPopover
              label={`${subject.title} competency & links`}
              title={`Subject ${subject.number} · ${subject.title}`}
            >
              <div>
                <span className="font-semibold text-slate-900">Objective: </span>
                <span>{subject.objective}</span>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5 text-emerald-950">
                <span className="font-semibold">Final competency: </span>
                <span>{subject.finalCompetency}</span>
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-1">Key resources</div>
                <ul className="space-y-1">
                  {subject.resources.map((res) => (
                    <li key={res.label}>
                      {res.url ? (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
                        >
                          <span>{res.label}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-slate-800">{res.label}</span>
                      )}
                      {res.note && <span className="text-slate-600"> — {res.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </InfoPopover>
          </div>
        </div>

        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full transition-all duration-200 ${allMilestonesDone ? 'bg-emerald-600' : 'bg-blue-600'}`}
            style={{ width: `${totalMilestones > 0 ? (doneMilestones / totalMilestones) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Major Milestones List */}
      <ul className="divide-y divide-slate-100" role="list">
        {visibleMilestones.map((m) => {
          const isDone = Boolean(completedIds[m.id]);

          return (
            <li
              key={m.id}
              className={`flex items-start gap-3 px-5 py-3 sm:px-6 transition-colors ${
                isDone ? 'bg-slate-50/60' : 'hover:bg-slate-50/80'
              }`}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={isDone}
                onClick={() => onToggleComplete(m.id)}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  isDone
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                }`}
                aria-label={`Mark "${m.text}" as ${isDone ? 'incomplete' : 'complete'}`}
              >
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => onToggleComplete(m.id)}
                className={`flex-1 text-left text-[15px] leading-relaxed transition-colors cursor-pointer focus-visible:outline-none ${
                  isDone ? 'text-slate-400 line-through' : 'text-slate-800'
                }`}
              >
                {m.text}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Expandable Detailed Subject Curriculum (Section 3) */}
      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-2.5 sm:px-6 rounded-b-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-500" />
            )}
            <span>{isExpanded ? 'Hide detailed subject guide' : 'Show detailed subject guide'}</span>
            <span className="font-mono font-normal text-slate-500 tabular-nums">
              · {doneDetails}/{totalDetails} topics & exercises
            </span>
          </button>

          {allMilestonesDone && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              All milestones completed
            </span>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-5 border-t border-slate-200/70 pt-4 text-sm text-slate-700">
            {/* Interactive Section Switcher & Bulk Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveGroupTab('all')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                    activeGroupTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                {subject.detailGroups.map((g) => {
                  const letter = g.heading.split('.')[0];
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setActiveGroupTab(g.id)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                        activeGroupTab === g.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setActiveGroupTab('exercises')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                    activeGroupTab === 'exercises'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mini-projects
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGroupTab('resources')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                    activeGroupTab === 'resources'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Resources
                </button>
              </div>

              <button
                type="button"
                onClick={() => onSetManyComplete(allDetailIds, doneDetails < totalDetails)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap"
              >
                {doneDetails < totalDetails ? 'Check all topics' : 'Uncheck all topics'}
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-800 space-y-1">
              <div>
                <span className="font-semibold text-slate-900">Objective: </span>
                <span>{subject.objective}</span>
              </div>
              {subject.intro && <p className="text-slate-600">{subject.intro}</p>}
            </div>

            {visibleGroups.map((group) => (
              <div key={group.id} className="space-y-2.5 rounded-lg border border-slate-200/80 bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">{group.heading}</h4>
                {group.intro && <p className="text-xs text-slate-600">{group.intro}</p>}

                {group.items && (
                  <ul className="grid gap-1.5 sm:grid-cols-2" role="list">
                    {group.items.map((item) => {
                      const subDone = Boolean(completedIds[item.id]);
                      return (
                        <li key={item.id} className="flex items-start gap-2.5">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={subDone}
                            onClick={() => onToggleComplete(item.id)}
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer ${
                              subDone
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                            }`}
                            aria-label={`Mark "${item.text}" as ${subDone ? 'incomplete' : 'complete'}`}
                          >
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleComplete(item.id)}
                            className={`text-left text-sm leading-relaxed cursor-pointer ${
                              subDone ? 'text-slate-400 line-through' : 'text-slate-700 hover:text-slate-950'
                            }`}
                          >
                            {item.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {group.packageTable && (
                  <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                        <tr>
                          <th className="px-3.5 py-2 font-semibold">Package</th>
                          <th className="px-3.5 py-2 font-semibold">To-do list</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {group.packageTable.map((row) => (
                          <tr key={row.pkg} className="align-top">
                            <td className="px-3.5 py-2.5 font-mono text-xs font-semibold text-blue-800 whitespace-nowrap">
                              {row.pkg}
                            </td>
                            <td className="px-3.5 py-2.5">
                              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                {row.tasks.map((t) => {
                                  const tDone = Boolean(completedIds[t.id]);
                                  return (
                                    <button
                                      key={t.id}
                                      type="button"
                                      role="checkbox"
                                      aria-checked={tDone}
                                      onClick={() => onToggleComplete(t.id)}
                                      className="inline-flex items-center gap-1.5 text-left text-xs sm:text-sm cursor-pointer group/pkg"
                                    >
                                      <span
                                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors ${
                                          tDone
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-slate-300 bg-white text-transparent group-hover/pkg:border-blue-500'
                                        }`}
                                      >
                                        <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                                      </span>
                                      <span className={tDone ? 'text-slate-400 line-through' : 'text-slate-700'}>
                                        {t.text}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* Practical Exercises */}
            {showExercises && (
              <div className="space-y-2.5 rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">{subject.practicalExercisesTitle}</h4>
                <ul className="space-y-1.5" role="list">
                  {subject.practicalExercises.map((ex) => {
                    const exDone = Boolean(completedIds[ex.id]);
                    return (
                      <li key={ex.id} className="flex items-start gap-2.5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={exDone}
                          onClick={() => onToggleComplete(ex.id)}
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer ${
                            exDone
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                          }`}
                          aria-label={`Mark "${ex.text}" as ${exDone ? 'incomplete' : 'complete'}`}
                        >
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleComplete(ex.id)}
                          className={`text-left text-sm cursor-pointer ${
                            exDone ? 'text-slate-400 line-through' : 'text-slate-700 hover:text-slate-950'
                          }`}
                        >
                          {ex.text}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Resources to follow */}
            {showResources && (
              <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">Resources to follow</h4>
                <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-decimal pl-5">
                  {subject.resources.map((res) => (
                    <li key={res.label}>
                      {res.url ? (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-700 hover:underline"
                        >
                          <span>{res.label}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-slate-800">{res.label}</span>
                      )}
                      {res.note && <span className="text-slate-600"> — {res.note}</span>}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Final competency */}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-xs sm:text-sm text-emerald-950">
              <span className="font-semibold">Final competency: </span>
              <span>{subject.finalCompetency}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function Project2View({
  completedIds,
  expandedSubjects,
  onToggleComplete,
  onSetManyComplete,
  onToggleExpandSubject,
  onResetProject2,
  onOpenKnowledgeBase,
}: Project2ViewProps) {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const stats = useMemo(() => {
    let totalMilestones = 0;
    let doneMilestones = 0;
    let totalDetails = 0;
    let doneDetails = 0;

    for (const subj of PROJECT_2_SUBJECTS) {
      for (const m of subj.milestones) {
        totalMilestones += 1;
        if (completedIds[m.id]) doneMilestones += 1;
      }
      for (const grp of subj.detailGroups) {
        for (const item of grp.items ?? []) {
          totalDetails += 1;
          if (completedIds[item.id]) doneDetails += 1;
        }
        for (const pkg of grp.packageTable ?? []) {
          for (const t of pkg.tasks) {
            totalDetails += 1;
            if (completedIds[t.id]) doneDetails += 1;
          }
        }
      }
      for (const ex of subj.practicalExercises) {
        totalDetails += 1;
        if (completedIds[ex.id]) doneDetails += 1;
      }
    }

    const percent = totalMilestones > 0 ? Math.round((doneMilestones / totalMilestones) * 100) : 0;
    return {
      totalMilestones,
      doneMilestones,
      remainingMilestones: totalMilestones - doneMilestones,
      totalDetails,
      doneDetails,
      percent,
    };
  }, [completedIds]);

  const hasAnyCompleted = useMemo(() => {
    for (const subj of PROJECT_2_SUBJECTS) {
      if (subj.milestones.some((m) => completedIds[m.id])) return true;
      for (const grp of subj.detailGroups) {
        if (grp.items?.some((i) => completedIds[i.id])) return true;
        if (grp.packageTable?.some((p) => p.tasks.some((t) => completedIds[t.id]))) return true;
      }
      if (subj.practicalExercises.some((e) => completedIds[e.id])) return true;
    }
    for (const st of PROJECT_2_ORDER_OF_EXECUTION.stages) {
      if (st.steps.some((s) => completedIds[`p2-order-${s.num}`])) return true;
    }
    return false;
  }, [completedIds]);

  const hasVisibleSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECT_2_SUBJECTS.some((subj) =>
      subj.milestones.some((m) => {
        const isDone = Boolean(completedIds[m.id]);
        if (filterMode === 'remaining' && isDone) return false;
        if (filterMode === 'completed' && !isDone) return false;
        if (q) {
          const inM = m.text.toLowerCase().includes(q);
          const inT = subj.title.toLowerCase().includes(q) || subj.number.toLowerCase().includes(q);
          const inD =
            subj.detailGroups.some(
              (g) =>
                g.heading.toLowerCase().includes(q) ||
                g.items?.some((i) => i.text.toLowerCase().includes(q)) ||
                g.packageTable?.some(
                  (p) => p.pkg.toLowerCase().includes(q) || p.tasks.some((t) => t.text.toLowerCase().includes(q))
                )
            ) || subj.practicalExercises.some((e) => e.text.toLowerCase().includes(q));
          return inM || inT || inD;
        }
        return true;
      })
    );
  }, [completedIds, filterMode, searchQuery]);

  return (
    <div>
      {/* Compact Top Bar for To-Do First View */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span>Learn</span>
              <span aria-hidden="true">·</span>
              <span>Astronomy, Astrostatistics, Cosmology & Multimessenger Astronomy</span>
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Learning To-Do List
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {stats.percent}%
              </span>
              <span className="font-mono text-xs text-slate-600 tabular-nums">
                {stats.doneMilestones}/{stats.totalMilestones} milestones
              </span>
            </div>

            <InfoPopover
              label="Project 2 overview & goal"
              title={PROJECT_2_HEADER.title}
              buttonText="Project info"
            >
              <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-500">
                {PROJECT_2_HEADER.meta.join(' · ')}
              </div>
              <div className="space-y-1.5 text-slate-700">
                {PROJECT_2_HEADER.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-2.5 text-slate-800">
                <span className="font-semibold text-blue-950">Ultimate objective: </span>
                <span>Move comfortably between Theory, Computation, and Observation across all five subjects.</span>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('schedules', 'project-2')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open Execution Order & Weekly Schedule in Knowledge Base →
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

      {/* Main Workspace */}
      <div className="grid gap-8 lg:grid-cols-[248px_1fr] lg:items-start">
        <aside className="hidden lg:block sticky top-20 rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold text-slate-900 px-2">Subjects (01–05)</div>
          <nav aria-label="Learn subject navigation" className="mt-2 space-y-0.5">
            {PROJECT_2_SUBJECTS.map((subj) => {
              const total = subj.milestones.length;
              const done = subj.milestones.filter((m) => completedIds[m.id]).length;
              const isComplete = total > 0 && done === total;

              return (
                <a
                  key={subj.id}
                  href={`#${subj.id}`}
                  className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-slate-50 transition-colors group"
                >
                  <span className="truncate text-slate-700 group-hover:text-slate-950 font-medium">
                    <span className="font-mono text-slate-400 mr-1.5">{subj.number}</span>
                    {subj.title}
                  </span>
                  <span
                    className={`font-mono tabular-nums shrink-0 ${
                      isComplete ? 'text-emerald-700 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {isComplete ? <CheckCircle2 className="h-3.5 w-3.5" /> : `${done}/${total}`}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="my-3 border-t border-slate-100" />

          <div className="text-xs font-semibold text-slate-900 px-2">Deep-Dive Guides</div>
          <nav aria-label="Learn reference sections in Knowledge Base" className="mt-2 space-y-0.5 text-xs text-slate-600">
            <button
              type="button"
              onClick={() => onOpenKnowledgeBase('resources', 'project-2')}
              className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-blue-700 cursor-pointer"
            >
              Tracks & Connection Map →
            </button>
            <button
              type="button"
              onClick={() => onOpenKnowledgeBase('schedules', 'project-2')}
              className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-blue-700 cursor-pointer"
            >
              16-Step Order & 6h Schedule →
            </button>
            <button
              type="button"
              onClick={() => onOpenKnowledgeBase('workflows', 'project-2')}
              className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-blue-700 cursor-pointer"
            >
              Core Rule & Two-AI Study Loop →
            </button>
          </nav>
        </aside>

        <main className="min-w-0 space-y-6">
          <FocusNoteCard
            projectId="project-2"
            onOpenKnowledgeBase={() => onOpenKnowledgeBase('schedules', 'project-2')}
          />

          {/* Primary To-Do List */}
          <div id="p2-master-todo" className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    filterMode === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({stats.totalMilestones})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('remaining')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    filterMode === 'remaining'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Remaining ({stats.remainingMilestones})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('completed')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    filterMode === 'completed'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Done ({stats.doneMilestones})
                </button>
              </div>

              <div className="flex items-center gap-2 flex-1 sm:justify-end">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter milestones or topics..."
                    aria-label="Filter milestones or topics"
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
                    title="Reset progress"
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
                        onResetProject2();
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

            {hasVisibleSubjects ? (
              <div className="space-y-4">
                {PROJECT_2_SUBJECTS.map((subj) => (
                  <SubjectCard
                    key={subj.id}
                    subject={subj}
                    completedIds={completedIds}
                    onToggleComplete={onToggleComplete}
                    onSetManyComplete={onSetManyComplete}
                    isExpanded={Boolean(expandedSubjects[subj.id])}
                    onToggleExpand={() => onToggleExpandSubject(subj.id)}
                    filterMode={filterMode}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
                  <p className="text-sm font-medium text-slate-900">No milestones match the current filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterMode('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    Show all 39 milestones
                  </button>
                </div>
                <FocusNoteCard
                  projectId="project-2"
                  forceShow
                  onOpenKnowledgeBase={() => onOpenKnowledgeBase('schedules', 'project-2')}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
