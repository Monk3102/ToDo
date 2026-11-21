import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  getAllProject5TaskIds,
  PROJECT_5_COMPLETION_CRITERIA,
  PROJECT_5_FINDING_STUDENTS,
  PROJECT_5_HEADER,
  PROJECT_5_PRICING_PAYMENTS,
  PROJECT_5_RECOMMENDATION,
  PROJECT_5_ROUTE_A,
  PROJECT_5_ROUTE_B,
  PROJECT_5_WEEKLY_BUDGET,
  type Project5Task,
} from '../data/project5Data';
import { FocusNoteCard } from './FocusNoteCard';
import { InfoPopover } from './InfoPopover';
import type { KnowledgeCategory, KnowledgeProjectFilter } from './KnowledgeBaseView';

type FilterMode = 'all' | 'remaining' | 'completed';
type RouteFocus = 'all' | 'route-a' | 'route-b' | 'launch';

const STORAGE_WEEKLY_BUDGET_KEY = 'job_weekly_budget_v1';

function getInitialRecord(key: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    // Ignore storage errors
  }
  return {};
}

interface Project5ViewProps {
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  onResetProject5: () => void;
  onOpenKnowledgeBase: (cat: KnowledgeCategory, proj: KnowledgeProjectFilter) => void;
}

function TaskItemRow({
  task,
  isDone,
  onToggleComplete,
  prefix,
}: {
  task: Project5Task;
  isDone: boolean;
  onToggleComplete: (id: string) => void;
  prefix?: string;
}) {
  return (
    <li
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
        {prefix && (
          <span className="font-mono text-xs text-slate-400 mr-2">{prefix}</span>
        )}
        <span>{task.text}</span>
      </button>
    </li>
  );
}

export function Project5View({
  completedIds,
  onToggleComplete,
  onSetManyComplete,
  onResetProject5,
  onOpenKnowledgeBase,
}: Project5ViewProps) {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [routeFocus, setRouteFocus] = useState<RouteFocus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const [routeASubTab, setRouteASubTab] = useState<'all' | 'a1' | 'a2' | 'a3'>('all');
  const [routeBSubTab, setRouteBSubTab] = useState<'all' | 'b1' | 'b2' | 'b3' | 'b4' | 'b5'>('all');
  const [activeDemoId, setActiveDemoId] = useState<string>('physics');

  const [weeklyDone, setWeeklyDone] = useState<Record<string, boolean>>(() =>
    getInitialRecord(STORAGE_WEEKLY_BUDGET_KEY)
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WEEKLY_BUDGET_KEY, JSON.stringify(weeklyDone));
    } catch {
      // Ignore storage errors
    }
  }, [weeklyDone]);

  const allTaskIds = useMemo(() => getAllProject5TaskIds(), []);

  const routeAIds = useMemo(
    () => [
      ...PROJECT_5_ROUTE_A.a1Tasks.map((t) => t.id),
      ...PROJECT_5_ROUTE_A.a2Groups.flatMap((g) => g.questions.map((q) => q.id)),
      ...PROJECT_5_ROUTE_A.a3Tasks.map((t) => t.id),
    ],
    []
  );

  const routeBIds = useMemo(
    () => [
      ...PROJECT_5_ROUTE_B.b1.tasks.map((t) => t.id),
      ...PROJECT_5_ROUTE_B.b2.platforms.map((p) => p.id),
      ...PROJECT_5_ROUTE_B.b3.tasks.map((t) => t.id),
      ...PROJECT_5_ROUTE_B.b4.demos.flatMap((d) =>
        PROJECT_5_ROUTE_B.b4.perLessonSteps.map((s) => `p5-b4-${d.id}-${s.key}`)
      ),
      ...PROJECT_5_ROUTE_B.b5.tasks.map((t) => t.id),
    ],
    []
  );

  const launchIds = useMemo(
    () => [
      ...PROJECT_5_PRICING_PAYMENTS.partA.tasks.map((t) => t.id),
      ...PROJECT_5_PRICING_PAYMENTS.partB.tasks.map((t) => t.id),
      ...PROJECT_5_FINDING_STUDENTS.tasks.map((t) => t.id),
      ...PROJECT_5_COMPLETION_CRITERIA.initial.tasks.map((t) => t.id),
      ...PROJECT_5_COMPLETION_CRITERIA.longTerm.tasks.map((t) => t.id),
    ],
    []
  );

  const stats = useMemo(() => {
    const immIds = PROJECT_5_RECOMMENDATION.immediateTasks.map((t) => t.id);
    const immDone = immIds.filter((id) => completedIds[id]).length;
    const aDone = routeAIds.filter((id) => completedIds[id]).length;
    const bDone = routeBIds.filter((id) => completedIds[id]).length;
    const launchDone = launchIds.filter((id) => completedIds[id]).length;

    const totalAll = allTaskIds.length;
    const doneAll = allTaskIds.filter((id) => completedIds[id]).length;

    return {
      immDone,
      immTotal: immIds.length,
      aDone,
      aTotal: routeAIds.length,
      bDone,
      bTotal: routeBIds.length,
      launchDone,
      launchTotal: launchIds.length,
      totalAll,
      doneAll,
      remainingAll: totalAll - doneAll,
      percent: totalAll > 0 ? Math.round((doneAll / totalAll) * 100) : 0,
    };
  }, [completedIds, allTaskIds, routeAIds, routeBIds, launchIds]);

  const weeklyMinutesUsed = useMemo(
    () =>
      PROJECT_5_WEEKLY_BUDGET.rows.reduce(
        (acc, r) => acc + (weeklyDone[r.id] ? r.minutes : 0),
        0
      ),
    [weeklyDone]
  );

  const q = searchQuery.trim().toLowerCase();

  const matchesTask = (task: Project5Task, context = '') => {
    const isDone = Boolean(completedIds[task.id]);
    if (filterMode === 'remaining' && isDone) return false;
    if (filterMode === 'completed' && !isDone) return false;
    if (!q) return true;
    return (
      task.text.toLowerCase().includes(q) ||
      context.toLowerCase().includes(q)
    );
  };

  const immIds = PROJECT_5_RECOMMENDATION.immediateTasks.map((t) => t.id);
  const allImmDone = stats.immTotal > 0 && stats.immDone === stats.immTotal;
  const visibleImmTasks = PROJECT_5_RECOMMENDATION.immediateTasks.filter((t) =>
    matchesTask(t, 'immediate')
  );

  const allRouteADone = routeAIds.length > 0 && stats.aDone === routeAIds.length;
  const allRouteBDone = routeBIds.length > 0 && stats.bDone === routeBIds.length;

  const activeDemo =
    PROJECT_5_ROUTE_B.b4.demos.find((d) => d.id === activeDemoId) ??
    PROJECT_5_ROUTE_B.b4.demos[0];

  const activeDemoTaskIds = PROJECT_5_ROUTE_B.b4.perLessonSteps.map(
    (s) => `p5-b4-${activeDemo.id}-${s.key}`
  );
  const activeDemoDoneCount = activeDemoTaskIds.filter((id) => completedIds[id]).length;
  const allActiveDemoDone =
    activeDemoTaskIds.length > 0 && activeDemoDoneCount === activeDemoTaskIds.length;

  return (
    <div className="space-y-6">
      {/* Compact Header Strip (Overview info hidden until expanded) */}
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span>Job</span>
              <span aria-hidden="true">·</span>
              <span>{PROJECT_5_HEADER.title}</span>
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Online Tutoring & Freelancing To-Do List
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-mono tabular-nums">
              <span>
                Immediate: {stats.immDone}/{stats.immTotal}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Route A: {stats.aDone}/{stats.aTotal}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Route B: {stats.bDone}/{stats.bTotal}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Pricing & Milestones: {stats.launchDone}/{stats.launchTotal}
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
              label="Project 5 overview & dual-route strategy"
              title={PROJECT_5_HEADER.title}
              buttonText="Project info"
            >
              <p className="text-slate-700">{PROJECT_5_HEADER.objective}</p>
              <div className="space-y-1.5">
                {PROJECT_5_HEADER.routes.map((route, idx) => (
                  <div
                    key={route.title}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-2"
                  >
                    <div className="font-semibold text-slate-900">
                      {idx === 0 ? 'Route A · ' : 'Route B · '}
                      {route.title}
                    </div>
                    <p className="text-slate-600 mt-0.5">{route.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-700">{PROJECT_5_HEADER.strategyNote}</p>
              <div className="rounded-lg border border-amber-200 bg-amber-50/75 p-2 text-slate-800">
                {PROJECT_5_HEADER.distinctionNote}
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('resources', 'project-5')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open 26-Topic Confidence Matrix & Month-1 Plan →
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
        projectId="project-5"
        onOpenKnowledgeBase={() => onOpenKnowledgeBase('resources', 'project-5')}
      />

      {/* Interactive Weekly Time Budget Tracker (Max 2.5 hrs / week) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600 shrink-0" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Weekly Time Guard (Max 2–3 hrs/week — Keep PhD Applications Priority #1)
              </h2>
              <p className="text-xs text-slate-500">
                Check off this week&apos;s allocated time blocks to stay within the 150-minute (2.5 hr) cap.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold text-slate-900 tabular-nums">
              {weeklyMinutesUsed}/150 min ({(weeklyMinutesUsed / 60).toFixed(1)} / 2.5 hrs)
            </span>
            {weeklyMinutesUsed > 0 && (
              <button
                type="button"
                onClick={() => setWeeklyDone({})}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Reset week
              </button>
            )}
            <InfoPopover
              label="Why max 2.5 hrs/week rule"
              title="PhD Deadline Protection Rule"
            >
              <p className="text-slate-700">{PROJECT_5_WEEKLY_BUDGET.intro}</p>
              <p className="text-slate-700 font-medium">{PROJECT_5_WEEKLY_BUDGET.priorityNote}</p>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('schedules', 'project-5')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open First-Month Plan & Time Budget Table →
                </button>
              </div>
            </InfoPopover>
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_5_WEEKLY_BUDGET.rows.map((row) => {
            const done = Boolean(weeklyDone[row.id]);
            return (
              <button
                key={row.id}
                type="button"
                onClick={() =>
                  setWeeklyDone((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                }
                aria-pressed={done}
                className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  done
                    ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
                    : 'border-slate-200 bg-slate-50/60 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      done
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-xs font-medium truncate">{row.activity}</span>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-500 shrink-0 tabular-nums">
                  {row.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Filter, Search & Route View Switcher Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
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

            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setRouteFocus('all')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  routeFocus === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Routes
              </button>
              <button
                type="button"
                onClick={() => setRouteFocus('route-a')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  routeFocus === 'route-a'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Route A · Professor
              </button>
              <button
                type="button"
                onClick={() => setRouteFocus('route-b')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  routeFocus === 'route-b'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Route B · Independent
              </button>
              <button
                type="button"
                onClick={() => setRouteFocus('launch')}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  routeFocus === 'launch'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pricing, Students & Milestones
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
                placeholder="Filter tutoring tasks, platforms, questions..."
                aria-label="Filter tutoring tasks"
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
                disabled={stats.doneAll === 0}
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
                    onResetProject5();
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

      {/* Immediate Task Checklist (Visible First) */}
      <section
        id="p5-immediate"
        className="scroll-mt-24 rounded-xl border border-slate-200 bg-white overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-mono font-semibold text-amber-800">Start Immediately</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {stats.immDone}/{stats.immTotal} done
              </span>
            </div>
            <h2 className="mt-0.5 text-base sm:text-lg font-semibold tracking-tight text-slate-900">
              Your Immediate Tutoring Checklist
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {PROJECT_5_RECOMMENDATION.immediateIntro}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSetManyComplete(immIds, !allImmDone)}
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
              <span>Check all 4</span>
            )}
          </button>
        </div>

        {visibleImmTasks.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {visibleImmTasks.map((task, idx) => (
              <TaskItemRow
                key={task.id}
                task={task}
                isDone={Boolean(completedIds[task.id])}
                onToggleComplete={onToggleComplete}
                prefix={String(idx + 1).padStart(2, '0')}
              />
            ))}
          </ul>
        ) : (
          <div className="px-6 py-6 text-center text-xs text-slate-500">
            No immediate tasks match the current filter.
          </div>
        )}
      </section>

      {/* Section 2: Route A — Learn from your professor */}
      {(routeFocus === 'all' || routeFocus === 'route-a') && (
        <section
          id="p5-route-a"
          className="scroll-mt-24 rounded-xl border border-slate-200 bg-white overflow-hidden"
        >
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                  <span className="font-semibold text-blue-700">
                    {PROJECT_5_ROUTE_A.subtitle}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {stats.aDone}/{stats.aTotal} tasks
                  </span>
                </div>
                <h2 className="mt-0.5 text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                  {PROJECT_5_ROUTE_A.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl">
                  {PROJECT_5_ROUTE_A.intro}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSetManyComplete(routeAIds, !allRouteADone)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                  allRouteADone
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {allRouteADone ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Route A done</span>
                  </>
                ) : (
                  <span>Check Route A</span>
                )}
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All (A1–A3)' },
                { id: 'a1', label: 'A1. Prepare (5)' },
                { id: 'a2', label: 'A2. Questions (20)' },
                { id: 'a3', label: 'A3. Opportunity (8)' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRouteASubTab(t.id as 'all' | 'a1' | 'a2' | 'a3')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    routeASubTab === t.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {/* A1 */}
            {(routeASubTab === 'all' || routeASubTab === 'a1') && (() => {
              const items = PROJECT_5_ROUTE_A.a1Tasks.filter((t) =>
                matchesTask(t, 'A1 prepare professor response')
              );
              if (items.length === 0 && (q || filterMode !== 'all')) return null;
              return (
                <div>
                  <div className="bg-slate-50/70 px-5 py-2.5 sm:px-6 text-xs font-semibold text-slate-800">
                    {PROJECT_5_ROUTE_A.a1Title}
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {items.map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                  </ul>
                </div>
              );
            })()}

            {/* A2 */}
            {(routeASubTab === 'all' || routeASubTab === 'a2') && (
              <div>
                <div className="bg-slate-50/70 px-5 py-2.5 sm:px-6 text-xs font-semibold text-slate-800">
                  {PROJECT_5_ROUTE_A.a2Title}
                </div>
                <div className="divide-y divide-slate-100">
                  {PROJECT_5_ROUTE_A.a2Groups.map((group) => {
                    const items = group.questions.filter((item) =>
                      matchesTask(item, `${group.title} questions professor`)
                    );
                    if (items.length === 0) return null;
                    return (
                      <div key={group.id}>
                        <div className="px-5 pt-3 pb-1 sm:px-6 text-xs font-semibold text-blue-700">
                          {group.title}
                        </div>
                        <ul className="divide-y divide-slate-100">
                          {items.map((item) => (
                            <TaskItemRow
                              key={item.id}
                              task={item}
                              isDone={Boolean(completedIds[item.id])}
                              onToggleComplete={onToggleComplete}
                            />
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* A3 */}
            {(routeASubTab === 'all' || routeASubTab === 'a3') && (() => {
              const items = PROJECT_5_ROUTE_A.a3Tasks.filter((t) =>
                matchesTask(t, 'A3 opportunity offer')
              );
              if (items.length === 0 && (q || filterMode !== 'all')) return null;
              return (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50/70 px-5 py-2.5 sm:px-6">
                    <span className="text-xs font-semibold text-slate-800">
                      {PROJECT_5_ROUTE_A.a3Title}
                    </span>
                    <InfoPopover
                      label="A3 clarity note"
                      title="Clarify Arrangements First"
                      buttonText="Note"
                    >
                      <p className="text-slate-800">{PROJECT_5_ROUTE_A.a3Note}</p>
                    </InfoPopover>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {items.map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Section 3: Route B — Build your own international tutoring profile */}
      {(routeFocus === 'all' || routeFocus === 'route-b') && (
        <section
          id="p5-route-b"
          className="scroll-mt-24 rounded-xl border border-slate-200 bg-white overflow-hidden"
        >
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                  <span className="font-semibold text-blue-700">
                    {PROJECT_5_ROUTE_B.subtitle}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {stats.bDone}/{stats.bTotal} tasks
                  </span>
                </div>
                <h2 className="mt-0.5 text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                  {PROJECT_5_ROUTE_B.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl">
                  {PROJECT_5_ROUTE_B.intro}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSetManyComplete(routeBIds, !allRouteBDone)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                  allRouteBDone
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {allRouteBDone ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Route B done</span>
                  </>
                ) : (
                  <span>Check Route B</span>
                )}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All (B1–B5)' },
                { id: 'b1', label: 'B1. Market (10)' },
                { id: 'b2', label: 'B2. Platforms (5)' },
                { id: 'b3', label: 'B3. Profile (10)' },
                { id: 'b4', label: 'B4. 3 Demo Lessons (24)' },
                { id: 'b5', label: 'B5. Setup (9)' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setRouteBSubTab(t.id as 'all' | 'b1' | 'b2' | 'b3' | 'b4' | 'b5')
                  }
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    routeBSubTab === t.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {/* B1 */}
            {(routeBSubTab === 'all' || routeBSubTab === 'b1') && (() => {
              const items = PROJECT_5_ROUTE_B.b1.tasks.filter((t) =>
                matchesTask(t, 'B1 market countries')
              );
              if (items.length === 0 && (q || filterMode !== 'all')) return null;
              return (
                <div>
                  <div className="bg-slate-50/70 px-5 py-3 sm:px-6 space-y-2">
                    <div className="text-xs font-semibold text-slate-900">
                      {PROJECT_5_ROUTE_B.b1.title}
                    </div>
                    <p className="text-xs text-slate-600">{PROJECT_5_ROUTE_B.b1.intro}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECT_5_ROUTE_B.b1.countries.map((c) => (
                        <span
                          key={c}
                          className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">{PROJECT_5_ROUTE_B.b1.caution}</p>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {items.map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                  </ul>
                  <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 sm:px-6 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">Deliverable: </span>
                    <span>{PROJECT_5_ROUTE_B.b1.deliverable}</span>
                  </div>
                </div>
              );
            })()}

            {/* B2: Research tutoring platforms */}
            {(routeBSubTab === 'all' || routeBSubTab === 'b2') && (() => {
              const platforms = PROJECT_5_ROUTE_B.b2.platforms.filter((p) => {
                const isDone = Boolean(completedIds[p.id]);
                if (filterMode === 'remaining' && isDone) return false;
                if (filterMode === 'completed' && !isDone) return false;
                if (!q) return true;
                return (
                  p.name.toLowerCase().includes(q) ||
                  p.description.toLowerCase().includes(q) ||
                  'platforms'.includes(q)
                );
              });
              if (platforms.length === 0 && (q || filterMode !== 'all')) return null;
              return (
                <div>
                  <div className="bg-slate-50/70 px-5 py-3 sm:px-6 space-y-1">
                    <div className="text-xs font-semibold text-slate-900">
                      {PROJECT_5_ROUTE_B.b2.title}
                    </div>
                    <p className="text-xs text-slate-600">{PROJECT_5_ROUTE_B.b2.intro}</p>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {platforms.map((plat) => {
                      const isDone = Boolean(completedIds[plat.id]);
                      return (
                        <li
                          key={plat.id}
                          className={`flex items-start justify-between gap-3 px-5 py-3 sm:px-6 transition-colors ${
                            isDone ? 'bg-slate-50/60' : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={isDone}
                              onClick={() => onToggleComplete(plat.id)}
                              aria-label={`Mark ${plat.name} research as ${isDone ? 'incomplete' : 'complete'}`}
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer ${
                                isDone
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
                              }`}
                            >
                              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onToggleComplete(plat.id)}
                              className="flex-1 text-left cursor-pointer"
                            >
                              <div
                                className={`text-sm font-semibold ${
                                  isDone ? 'text-slate-400 line-through' : 'text-slate-900'
                                }`}
                              >
                                {plat.name}
                              </div>
                              <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
                                {plat.description}
                              </p>
                            </button>
                          </div>
                          <a
                            href={plat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 shrink-0 whitespace-nowrap"
                          >
                            <span>Official site</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 sm:px-6 text-xs text-slate-600">
                    {PROJECT_5_ROUTE_B.b2.closingNote}
                  </div>
                </div>
              );
            })()}

            {/* B3 */}
            {(routeBSubTab === 'all' || routeBSubTab === 'b3') && (() => {
              const items = PROJECT_5_ROUTE_B.b3.tasks.filter((t) =>
                matchesTask(t, 'B3 tutor profile')
              );
              if (items.length === 0 && (q || filterMode !== 'all')) return null;
              return (
                <div>
                  <div className="bg-slate-50/70 px-5 py-3 sm:px-6 space-y-2">
                    <div className="text-xs font-semibold text-slate-900">
                      {PROJECT_5_ROUTE_B.b3.title}
                    </div>
                    <p className="text-xs text-slate-600">{PROJECT_5_ROUTE_B.b3.questionsIntro}</p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-800">
                      {PROJECT_5_ROUTE_B.b3.questions.map((question) => (
                        <li key={question}>· {question}</li>
                      ))}
                    </ul>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {items.map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                  </ul>
                  <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 sm:px-6 text-xs text-slate-600">
                    {PROJECT_5_ROUTE_B.b3.note}
                  </div>
                </div>
              );
            })()}

            {/* B4: 3 Demonstration Lessons (Interactive Switcher) */}
            {(routeBSubTab === 'all' || routeBSubTab === 'b4') && (
              <div className="space-y-3">
                <div className="bg-slate-50/70 px-5 py-3 sm:px-6 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        {PROJECT_5_ROUTE_B.b4.title}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {PROJECT_5_ROUTE_B.b4.intro}
                      </p>
                    </div>
                    <InfoPopover
                      label="Demo lesson purpose note"
                      title="What Your Demo Portfolio Proves"
                      buttonText="Tip"
                    >
                      <p className="text-slate-700">{PROJECT_5_ROUTE_B.b4.note}</p>
                    </InfoPopover>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <tr>
                          <th className="px-3.5 py-2 font-semibold">Demonstration lesson</th>
                          <th className="px-3.5 py-2 font-semibold">Suggested topic</th>
                          <th className="px-3.5 py-2 font-semibold">What it demonstrates</th>
                          <th className="px-3.5 py-2 font-semibold">Progress</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {PROJECT_5_ROUTE_B.b4.demos.map((demo) => {
                          const dIds = PROJECT_5_ROUTE_B.b4.perLessonSteps.map(
                            (s) => `p5-b4-${demo.id}-${s.key}`
                          );
                          const dDone = dIds.filter((id) => completedIds[id]).length;
                          return (
                            <tr
                              key={demo.id}
                              onClick={() => setActiveDemoId(demo.id)}
                              className={`cursor-pointer transition-colors ${
                                activeDemoId === demo.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                              }`}
                            >
                              <td className="px-3.5 py-2 font-semibold text-slate-900 whitespace-nowrap">
                                {demo.lesson}
                              </td>
                              <td className="px-3.5 py-2 text-slate-700">{demo.topic}</td>
                              <td className="px-3.5 py-2 text-slate-600">{demo.demonstrates}</td>
                              <td className="px-3.5 py-2 font-mono text-xs text-slate-700 tabular-nums">
                                {dDone}/{dIds.length}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {PROJECT_5_ROUTE_B.b4.demos.map((demo) => {
                        const dIds = PROJECT_5_ROUTE_B.b4.perLessonSteps.map(
                          (s) => `p5-b4-${demo.id}-${s.key}`
                        );
                        const dDone = dIds.filter((id) => completedIds[id]).length;
                        return (
                          <button
                            key={demo.id}
                            type="button"
                            onClick={() => setActiveDemoId(demo.id)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                              activeDemoId === demo.id
                                ? 'bg-slate-900 text-white'
                                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {demo.lesson} ({dDone}/{dIds.length})
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSetManyComplete(activeDemoTaskIds, !allActiveDemoDone)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                        allActiveDemoDone
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {allActiveDemoDone ? 'Demo done' : `Check ${activeDemo.lesson} demo`}
                    </button>
                  </div>
                </div>

                <ul className="divide-y divide-slate-100">
                  {PROJECT_5_ROUTE_B.b4.perLessonSteps
                    .map((step) => ({
                      id: `p5-b4-${activeDemo.id}-${step.key}`,
                      text: `${activeDemo.lesson}: ${step.label}`,
                    }))
                    .filter((t) => matchesTask(t, `${activeDemo.lesson} ${activeDemo.topic} demo`))
                    .map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                </ul>
              </div>
            )}

            {/* B5 */}
            {(routeBSubTab === 'all' || routeBSubTab === 'b5') && (() => {
              const items = PROJECT_5_ROUTE_B.b5.tasks.filter((t) =>
                matchesTask(t, 'B5 online teaching setup zoom meet onenote openboard')
              );
              if (items.length === 0 && (q || filterMode !== 'all')) return null;
              return (
                <div>
                  <div className="bg-slate-50/70 px-5 py-3 sm:px-6">
                    <div className="text-xs font-semibold text-slate-900">
                      {PROJECT_5_ROUTE_B.b5.title}
                    </div>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {items.map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                  </ul>
                  <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700">
                      {PROJECT_5_ROUTE_B.b5.toolsIntro}
                    </span>
                    {PROJECT_5_ROUTE_B.b5.tools.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 font-medium text-blue-700 hover:bg-blue-50"
                      >
                        <span>{tool.name}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Sections 4, 5, 8: Pricing, Finding Students & Completion Milestones */}
      {(routeFocus === 'all' || routeFocus === 'launch') && (
        <div className="space-y-4">
          {/* Section 4: Pricing & Payments */}
          <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                {PROJECT_5_PRICING_PAYMENTS.title}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                {PROJECT_5_PRICING_PAYMENTS.intro}
              </p>
            </div>

            <div className="grid divide-y lg:divide-y-0 lg:divide-x divide-slate-100 lg:grid-cols-2">
              <div>
                <div className="bg-slate-50/70 px-5 py-2.5 sm:px-6 text-xs font-semibold text-slate-900">
                  {PROJECT_5_PRICING_PAYMENTS.partA.title}
                </div>
                <ul className="divide-y divide-slate-100">
                  {PROJECT_5_PRICING_PAYMENTS.partA.tasks
                    .filter((t) => matchesTask(t, 'pricing rates trial hourly'))
                    .map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                </ul>
                <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 sm:px-6 text-xs text-slate-600">
                  {PROJECT_5_PRICING_PAYMENTS.partA.note}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 bg-slate-50/70 px-5 py-2.5 sm:px-6">
                  <span className="text-xs font-semibold text-slate-900">
                    {PROJECT_5_PRICING_PAYMENTS.partB.title}
                  </span>
                  <InfoPopover
                    label="Under-18 & banking compliance rules"
                    title="Guardian & Payment Compliance"
                    buttonText="Compliance Rule"
                  >
                    <p className="text-slate-800">{PROJECT_5_PRICING_PAYMENTS.partB.safetyWarning}</p>
                  </InfoPopover>
                </div>
                <ul className="divide-y divide-slate-100">
                  {PROJECT_5_PRICING_PAYMENTS.partB.tasks
                    .filter((t) => matchesTask(t, 'payments india currency fees tax'))
                    .map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Finding your first students */}
          <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                  {PROJECT_5_FINDING_STUDENTS.title}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {PROJECT_5_FINDING_STUDENTS.intro}
                </p>
              </div>
              <InfoPopover
                label="Safety warning on scams & upfront fees"
                title="Tutor Safety & Anti-Scam Rule"
                buttonText="Safety Rule"
              >
                <p className="text-slate-800">{PROJECT_5_FINDING_STUDENTS.safetyNote}</p>
              </InfoPopover>
            </div>
            <ul className="divide-y divide-slate-100">
              {PROJECT_5_FINDING_STUDENTS.tasks
                .filter((t) => matchesTask(t, 'finding first students referrals enquiries'))
                .map((t) => (
                  <TaskItemRow
                    key={t.id}
                    task={t}
                    isDone={Boolean(completedIds[t.id])}
                    onToggleComplete={onToggleComplete}
                  />
                ))}
            </ul>
          </section>

          {/* Section 8: Completion Criteria */}
          <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                {PROJECT_5_COMPLETION_CRITERIA.title}
              </h2>
            </div>

            <div className="grid divide-y lg:divide-y-0 lg:divide-x divide-slate-100 lg:grid-cols-2">
              <div>
                <div className="flex items-center justify-between bg-slate-50/70 px-5 py-2.5 sm:px-6">
                  <span className="text-xs font-semibold text-slate-900">
                    {PROJECT_5_COMPLETION_CRITERIA.initial.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const ids = PROJECT_5_COMPLETION_CRITERIA.initial.tasks.map((t) => t.id);
                      const allDone = ids.every((id) => completedIds[id]);
                      onSetManyComplete(ids, !allDone);
                    }}
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                  >
                    Toggle all
                  </button>
                </div>
                <ul className="divide-y divide-slate-100">
                  {PROJECT_5_COMPLETION_CRITERIA.initial.tasks
                    .filter((t) => matchesTask(t, 'initial milestone ready students'))
                    .map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between bg-slate-50/70 px-5 py-2.5 sm:px-6">
                  <span className="text-xs font-semibold text-slate-900">
                    {PROJECT_5_COMPLETION_CRITERIA.longTerm.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const ids = PROJECT_5_COMPLETION_CRITERIA.longTerm.tasks.map((t) => t.id);
                      const allDone = ids.every((id) => completedIds[id]);
                      onSetManyComplete(ids, !allDone);
                    }}
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                  >
                    Toggle all
                  </button>
                </div>
                <ul className="divide-y divide-slate-100">
                  {PROJECT_5_COMPLETION_CRITERIA.longTerm.tasks
                    .filter((t) => matchesTask(t, 'long-term milestone established'))
                    .map((t) => (
                      <TaskItemRow
                        key={t.id}
                        task={t}
                        isDone={Boolean(completedIds[t.id])}
                        onToggleComplete={onToggleComplete}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
