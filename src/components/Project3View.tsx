import { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  PROJECT_3_HEADER,
  PROJECT_3_STAGES,
  PROJECT_3_STARTING_CHECKLIST,
  type Project3Task,
} from '../data/project3Data';
import { FocusNoteCard } from './FocusNoteCard';
import { InfoPopover } from './InfoPopover';
import type { KnowledgeCategory, KnowledgeProjectFilter } from './KnowledgeBaseView';

type FilterMode = 'all' | 'remaining' | 'completed';
type RouteFilter = 'all' | 'route-a' | 'route-b';

interface Project3ViewProps {
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  onResetProject3: () => void;
  onOpenKnowledgeBase: (cat: KnowledgeCategory, proj: KnowledgeProjectFilter) => void;
}

function TaskRow({
  task,
  isDone,
  onToggleComplete,
}: {
  task: Project3Task;
  isDone: boolean;
  onToggleComplete: (id: string) => void;
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
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
          isDone
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-slate-300 bg-white text-transparent hover:border-blue-500'
        }`}
        aria-label={`Mark "${task.text}" as ${isDone ? 'incomplete' : 'complete'}`}
      >
        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
      </button>

      <button
        type="button"
        onClick={() => onToggleComplete(task.id)}
        className={`flex-1 text-left text-[15px] leading-relaxed transition-colors cursor-pointer focus-visible:outline-none ${
          isDone ? 'text-slate-400 line-through' : 'text-slate-800'
        }`}
      >
        {task.text}
      </button>
    </li>
  );
}

export function Project3View({
  completedIds,
  onToggleComplete,
  onSetManyComplete,
  onResetProject3,
  onOpenKnowledgeBase,
}: Project3ViewProps) {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [routeFilter, setRouteFilter] = useState<RouteFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const stats = useMemo(() => {
    const startTotal = PROJECT_3_STARTING_CHECKLIST.tasks.length;
    const startDone = PROJECT_3_STARTING_CHECKLIST.tasks.filter((t) => completedIds[t.id]).length;

    let stageTotal = 0;
    let stageDone = 0;

    for (const stage of PROJECT_3_STAGES) {
      for (const t of stage.tasks) {
        stageTotal += 1;
        if (completedIds[t.id]) stageDone += 1;
      }
      for (const t of stage.subGroupTasks ?? []) {
        stageTotal += 1;
        if (completedIds[t.id]) stageDone += 1;
      }
    }

    const percent = stageTotal > 0 ? Math.round((stageDone / stageTotal) * 100) : 0;

    return {
      startTotal,
      startDone,
      stageTotal,
      stageDone,
      stageRemaining: stageTotal - stageDone,
      percent,
    };
  }, [completedIds]);

  const hasAnyCompleted = useMemo(() => {
    if (PROJECT_3_STARTING_CHECKLIST.tasks.some((t) => completedIds[t.id])) return true;
    return PROJECT_3_STAGES.some(
      (s) =>
        s.tasks.some((t) => completedIds[t.id]) ||
        (s.subGroupTasks ?? []).some((t) => completedIds[t.id])
    );
  }, [completedIds]);

  const q = searchQuery.trim().toLowerCase();

  const matchesStageRoute = (stageId: string) => {
    if (routeFilter === 'route-a' && stageId === 'p3-stage-3') return false;
    if (routeFilter === 'route-b' && stageId === 'p3-stage-2') return false;
    return true;
  };

  const matchesTask = (task: Project3Task, stageTitle: string) => {
    const isDone = Boolean(completedIds[task.id]);

    if (filterMode === 'remaining' && isDone) return false;
    if (filterMode === 'completed' && !isDone) return false;

    if (q) {
      return task.text.toLowerCase().includes(q) || stageTitle.toLowerCase().includes(q);
    }
    return true;
  };

  const hasVisibleStageTasks = useMemo(() => {
    return PROJECT_3_STAGES.some((stage) => {
      if (!matchesStageRoute(stage.id)) return false;
      const stageLabel = `${stage.number}. ${stage.title}`;
      return (
        stage.tasks.some((t) => matchesTask(t, stageLabel)) ||
        (stage.subGroupTasks ?? []).some((t) => matchesTask(t, stageLabel))
      );
    });
  }, [completedIds, filterMode, routeFilter, searchQuery]);

  return (
    <div>
      {/* Compact Top Bar for To-Do First View */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span>Research</span>
              <span aria-hidden="true">·</span>
              <span>Research Paper on Supervoids</span>
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Research To-Do List
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                {stats.percent}%
              </span>
              <span className="font-mono text-xs text-slate-600 tabular-nums">
                {stats.stageDone}/{stats.stageTotal} tasks
              </span>
            </div>

            <InfoPopover
              label="Project 3 overview & objective"
              title={PROJECT_3_HEADER.title}
              buttonText="Project info"
            >
              <div className="text-[11px] font-medium text-slate-500">
                {PROJECT_3_HEADER.meta.join(' · ')}
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-800">
                <span className="font-semibold text-slate-900">Objective: </span>
                <span>{PROJECT_3_HEADER.objective}</span>
              </div>
              <div className="space-y-1.5 text-slate-700">
                {PROJECT_3_HEADER.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenKnowledgeBase('schedules', 'project-3')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Open Stage Deliverables table in Knowledge Base →
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
          <a
            href="#p3-starting-checklist"
            className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <span>Starting checklist</span>
            <span className="font-mono tabular-nums text-blue-700">
              {stats.startDone}/{stats.startTotal}
            </span>
          </a>

          <div className="mt-4 text-xs font-semibold text-slate-900 px-2">Workflow Stages (1–8)</div>
          <nav aria-label="Research stage navigation" className="mt-2 space-y-0.5">
            {PROJECT_3_STAGES.map((stage) => {
              const allTasks = [...stage.tasks, ...(stage.subGroupTasks ?? [])];
              const total = allTasks.length;
              const done = allTasks.filter((t) => completedIds[t.id]).length;
              const isComplete = total > 0 && done === total;

              return (
                <a
                  key={stage.id}
                  href={`#${stage.id}`}
                  className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-slate-50 transition-colors group"
                >
                  <span className="truncate text-slate-700 group-hover:text-slate-950 font-medium">
                    <span className="font-mono text-slate-400 mr-1.5">0{stage.number}</span>
                    {stage.title}
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
          <button
            type="button"
            onClick={() => onOpenKnowledgeBase('schedules', 'project-3')}
            className="mt-1.5 w-full text-left block rounded-lg px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-700 cursor-pointer"
          >
            9. Project deliverables →
          </button>
        </aside>

        <main className="min-w-0 space-y-6">
          <FocusNoteCard
            projectId="project-3"
            onOpenKnowledgeBase={() => onOpenKnowledgeBase('schedules', 'project-3')}
          />

          {/* Section 10: Immediate Next Actions */}
          <section
            id="p3-starting-checklist"
            className="rounded-xl border border-slate-200 bg-white overflow-hidden"
          >
            <div className="px-5 pt-4 pb-3.5 sm:px-6 border-b border-slate-100">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-blue-700">Active Starting Checklist</div>
                  <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900">
                    10. Immediate next actions
                  </h2>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                    {stats.startDone}/{stats.startTotal}
                  </div>
                  <InfoPopover
                    label="Starting checklist recommendation & note"
                    title="Immediate Actions Recommendation"
                  >
                    <p className="text-slate-600">{PROJECT_3_STARTING_CHECKLIST.intro}</p>
                    <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-2.5 text-slate-900 font-medium">
                      {PROJECT_3_STARTING_CHECKLIST.recommendation}
                    </div>
                    <p className="text-slate-600">{PROJECT_3_STARTING_CHECKLIST.closingNote}</p>
                  </InfoPopover>
                </div>
              </div>
              <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-blue-600 transition-all duration-200"
                  style={{
                    width: `${stats.startTotal > 0 ? (stats.startDone / stats.startTotal) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <ul className="divide-y divide-slate-100" role="list">
              {PROJECT_3_STARTING_CHECKLIST.tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  isDone={Boolean(completedIds[task.id])}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </ul>
          </section>

          {/* Full 8-Stage Research Workflow To-Do List */}
          <div className="space-y-4">
            {/* Interactive Controls: Status Filter + Route Filter + Search */}
            <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setFilterMode('all')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      filterMode === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({stats.stageTotal})
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
                    Remaining ({stats.stageRemaining})
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
                    Done ({stats.stageDone})
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-1 sm:justify-end">
                  <div className="relative flex-1 sm:max-w-xs">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter workflow tasks..."
                      aria-label="Filter workflow tasks"
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
                      title="Reset checklist"
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
                          onResetProject3();
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

              {/* Interactive Route Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-500 mr-1">Route view:</span>
                  {(
                    [
                      ['all', 'Both Routes (Stages 1–8)'],
                      ['route-a', 'Route A · Professor Supervision'],
                      ['route-b', 'Route B · Independent Exploration'],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRouteFilter(val)}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        routeFilter === val
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                  <InfoPopover
                    label="Compare Route A and Route B"
                    title="Choosing Between Route A & Route B"
                    align="left"
                  >
                    <div className="space-y-2">
                      {PROJECT_3_HEADER.routes.map((r) => (
                        <div key={r.label} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                          <div className="font-semibold text-slate-900">{r.label}</div>
                          <div className="text-slate-700 mt-0.5">{r.description}</div>
                        </div>
                      ))}
                      <p className="text-slate-700 font-medium">
                        {PROJECT_3_STARTING_CHECKLIST.recommendation}
                      </p>
                    </div>
                  </InfoPopover>
                </div>
              </div>
            </div>

            {hasVisibleStageTasks ? (
              <div className="space-y-4">
                {PROJECT_3_STAGES.map((stage) => {
                  if (!matchesStageRoute(stage.id)) return null;
                  const stageLabel = `${stage.number}. ${stage.title}`;
                  const visiblePrimary = stage.tasks.filter((t) => matchesTask(t, stageLabel));
                  const visibleSub = (stage.subGroupTasks ?? []).filter((t) => matchesTask(t, stageLabel));

                  if (visiblePrimary.length === 0 && visibleSub.length === 0) {
                    return null;
                  }

                  const allTasks = [...stage.tasks, ...(stage.subGroupTasks ?? [])];
                  const allIds = allTasks.map((t) => t.id);
                  const total = allTasks.length;
                  const done = allTasks.filter((t) => completedIds[t.id]).length;
                  const allDone = total > 0 && done === total;

                  return (
                    <section
                      key={stage.id}
                      id={stage.id}
                      className={`rounded-xl border transition-colors ${
                        allDone ? 'border-emerald-200 bg-white' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="px-5 pt-4 pb-3.5 sm:px-6 border-b border-slate-100">
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                              <span className="font-mono text-slate-700">Stage {stage.number}</span>
                              {stage.routeNote && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-semibold text-blue-700">{stage.routeNote}</span>
                                </>
                              )}
                            </div>
                            <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900">
                              {stage.number}. {stage.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              type="button"
                              onClick={() => onSetManyComplete(allIds, !allDone)}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                            >
                              {allDone ? 'Uncheck stage' : 'Check stage'}
                            </button>
                            <div className="text-right">
                              <span
                                className={`font-mono text-sm font-semibold tabular-nums ${
                                  allDone ? 'text-emerald-700' : 'text-slate-900'
                                }`}
                              >
                                {done}/{total}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full transition-all duration-200 ${
                              allDone ? 'bg-emerald-600' : 'bg-blue-600'
                            }`}
                            style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {visiblePrimary.length > 0 && (
                        <ul className="divide-y divide-slate-100" role="list">
                          {visiblePrimary.map((task) => (
                            <TaskRow
                              key={task.id}
                              task={task}
                              isDone={Boolean(completedIds[task.id])}
                              onToggleComplete={onToggleComplete}
                            />
                          ))}
                        </ul>
                      )}

                      {stage.subGroupHeading && visibleSub.length > 0 && (
                        <div className="border-t border-slate-200/80">
                          <div className="bg-slate-50 px-5 py-2.5 sm:px-6 text-xs font-semibold text-slate-700">
                            {stage.subGroupHeading}
                          </div>
                          <ul className="divide-y divide-slate-100" role="list">
                            {visibleSub.map((task) => (
                              <TaskRow
                                key={task.id}
                                task={task}
                                isDone={Boolean(completedIds[task.id])}
                                onToggleComplete={onToggleComplete}
                              />
                            ))}
                          </ul>
                        </div>
                      )}

                      {stage.deliverable && (
                        <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 sm:px-6 text-xs sm:text-sm text-slate-900 rounded-b-xl">
                          <span className="font-semibold text-slate-900">Deliverable: </span>
                          <span>{stage.deliverable}</span>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
                  <p className="text-sm font-medium text-slate-900">No tasks match the current filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterMode('all');
                      setRouteFilter('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    Show all {stats.stageTotal} tasks
                  </button>
                </div>
                <FocusNoteCard
                  projectId="project-3"
                  forceShow
                  onOpenKnowledgeBase={() => onOpenKnowledgeBase('schedules', 'project-3')}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
