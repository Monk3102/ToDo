import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  PHASES,
  PROJECT_HEADER,
  SECTION_1_DEFINITION,
  SECTION_3_META,
} from './data/projectData';
import {
  PROJECT_2_ORDER_OF_EXECUTION,
  PROJECT_2_SUBJECTS,
} from './data/project2Data';
import {
  PROJECT_3_STAGES,
  PROJECT_3_STARTING_CHECKLIST,
} from './data/project3Data';
import {
  PROJECT_4_IMMEDIATE_CHECKLIST,
  PROJECT_4_PRIORITY_AUDIT,
  PROJECT_4_WEEKS,
  PROJECT_4_WORKSTREAMS,
} from './data/project4Data';
import { getAllProject5TaskIds } from './data/project5Data';
import { FocusNoteCard } from './components/FocusNoteCard';
import { InfoPopover } from './components/InfoPopover';
import {
  KnowledgeBaseView,
  type KnowledgeCategory,
  type KnowledgeProjectFilter,
} from './components/KnowledgeBaseView';
import { PhaseCard } from './components/PhaseCard';
import { Project2View } from './components/Project2View';
import { Project3View } from './components/Project3View';
import { Project4View } from './components/Project4View';
import { Project5View } from './components/Project5View';

const STORAGE_COMPLETED_KEY = 'void_cmb_todo_completed_v1';
const STORAGE_ACTIVE_TAB_KEY = 'research_todo_active_tab_v1';

type ProjectTab = 'project-1' | 'project-2' | 'project-3' | 'project-4' | 'project-5';
type FilterMode = 'all' | 'remaining' | 'completed';

function getInitialCompleted(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(STORAGE_COMPLETED_KEY);
    if (saved) {
      return JSON.parse(saved) as Record<string, boolean>;
    }
  } catch {
    // Ignore storage errors
  }
  return {};
}

function getInitialTab(): ProjectTab {
  try {
    const saved = localStorage.getItem(STORAGE_ACTIVE_TAB_KEY);
    if (
      saved === 'project-1' ||
      saved === 'project-2' ||
      saved === 'project-3' ||
      saved === 'project-4' ||
      saved === 'project-5'
    ) {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'project-1';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ProjectTab>(getInitialTab);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [kbCategory, setKbCategory] = useState<KnowledgeCategory>('workflows');
  const [kbProjectFilter, setKbProjectFilter] = useState<KnowledgeProjectFilter>('all');
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>(getInitialCompleted);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(completedIds));
    } catch {
      // Ignore storage errors
    }
  }, [completedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACTIVE_TAB_KEY, activeTab);
    } catch {
      // Ignore storage errors
    }
  }, [activeTab]);

  // Project 1 (Projects) stats
  const p1Stats = useMemo(() => {
    let totalMaster = 0;
    let doneMaster = 0;
    let totalSub = 0;
    let doneSub = 0;

    for (const phase of PHASES) {
      for (const task of phase.masterTasks) {
        totalMaster += 1;
        if (completedIds[task.id]) doneMaster += 1;
      }
      for (const block of phase.detailBlocks) {
        for (const item of block.items ?? []) {
          totalSub += 1;
          if (completedIds[item.id]) doneSub += 1;
        }
        for (const item of block.orderedItems ?? []) {
          totalSub += 1;
          if (completedIds[item.id]) doneSub += 1;
        }
      }
    }

    const percent = totalMaster > 0 ? Math.round((doneMaster / totalMaster) * 100) : 0;
    return {
      totalMaster,
      doneMaster,
      remainingMaster: totalMaster - doneMaster,
      totalSub,
      doneSub,
      percent,
    };
  }, [completedIds]);

  // Project 2 (Learn) summary percent
  const p2Percent = useMemo(() => {
    let total = 0;
    let done = 0;
    for (const subj of PROJECT_2_SUBJECTS) {
      for (const m of subj.milestones) {
        total += 1;
        if (completedIds[m.id]) done += 1;
      }
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [completedIds]);

  // Project 3 (Research) summary percent
  const p3Percent = useMemo(() => {
    let total = 0;
    let done = 0;
    for (const stage of PROJECT_3_STAGES) {
      for (const t of stage.tasks) {
        total += 1;
        if (completedIds[t.id]) done += 1;
      }
      for (const t of stage.subGroupTasks ?? []) {
        total += 1;
        if (completedIds[t.id]) done += 1;
      }
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [completedIds]);

  // Project 4 (PhD) summary percent
  const p4Percent = useMemo(() => {
    let total = 0;
    let done = 0;
    for (const t of PROJECT_4_IMMEDIATE_CHECKLIST.tasks) {
      total += 1;
      if (completedIds[t.id]) done += 1;
    }
    for (const w of PROJECT_4_WEEKS) {
      for (const t of w.tasks) {
        total += 1;
        if (completedIds[t.id]) done += 1;
      }
    }
    for (const ws of PROJECT_4_WORKSTREAMS) {
      for (const sub of ws.subsections) {
        for (const t of sub.tasks ?? []) {
          total += 1;
          if (completedIds[t.id]) done += 1;
        }
      }
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [completedIds]);

  // Project 5 (Job) summary percent
  const p5Percent = useMemo(() => {
    const allIds = getAllProject5TaskIds();
    const done = allIds.filter((id) => completedIds[id]).length;
    return allIds.length > 0 ? Math.round((done / allIds.length) * 100) : 0;
  }, [completedIds]);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSetManyComplete = (ids: string[], value: boolean) => {
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const id of ids) {
        if (value) {
          next[id] = true;
        } else {
          delete next[id];
        }
      }
      return next;
    });
  };

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const toggleSubjectExpand = (subjectId: string) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  const handleResetProject1 = () => {
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const phase of PHASES) {
        for (const t of phase.masterTasks) delete next[t.id];
        for (const b of phase.detailBlocks) {
          for (const i of b.items ?? []) delete next[i.id];
          for (const i of b.orderedItems ?? []) delete next[i.id];
        }
      }
      for (let i = 1; i <= SECTION_1_DEFINITION.deliverables.length; i += 1) {
        delete next[`deliverable-${i}`];
      }
      for (const key of Object.keys(next)) {
        if (key.startsWith('doc-') || key.startsWith('cycle-')) delete next[key];
      }
      return next;
    });
    setConfirmReset(false);
  };

  const handleResetProject2 = () => {
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const subj of PROJECT_2_SUBJECTS) {
        for (const m of subj.milestones) delete next[m.id];
        for (const g of subj.detailGroups) {
          for (const i of g.items ?? []) delete next[i.id];
          for (const pkg of g.packageTable ?? []) {
            for (const t of pkg.tasks) delete next[t.id];
          }
        }
        for (const ex of subj.practicalExercises) delete next[ex.id];
      }
      for (const st of PROJECT_2_ORDER_OF_EXECUTION.stages) {
        for (const s of st.steps) delete next[`p2-order-${s.num}`];
      }
      return next;
    });
  };

  const handleResetProject3 = () => {
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const t of PROJECT_3_STARTING_CHECKLIST.tasks) delete next[t.id];
      for (const stage of PROJECT_3_STAGES) {
        for (const t of stage.tasks) delete next[t.id];
        for (const t of stage.subGroupTasks ?? []) delete next[t.id];
      }
      return next;
    });
  };

  const handleResetProject4 = () => {
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const t of PROJECT_4_IMMEDIATE_CHECKLIST.tasks) delete next[t.id];
      for (const w of PROJECT_4_WEEKS) {
        for (const t of w.tasks) delete next[t.id];
      }
      for (const ws of PROJECT_4_WORKSTREAMS) {
        for (const sub of ws.subsections) {
          for (const t of sub.tasks ?? []) delete next[t.id];
        }
      }
      for (const cp of PROJECT_4_PRIORITY_AUDIT.criticalPath) delete next[cp.id];
      return next;
    });
  };

  const handleResetProject5 = () => {
    const allIds = getAllProject5TaskIds();
    setCompletedIds((prev) => {
      const next = { ...prev };
      for (const id of allIds) delete next[id];
      return next;
    });
  };

  const hasP1Completed = useMemo(() => {
    for (const phase of PHASES) {
      if (phase.masterTasks.some((t) => completedIds[t.id])) return true;
      for (const b of phase.detailBlocks) {
        if (b.items?.some((i) => completedIds[i.id])) return true;
        if (b.orderedItems?.some((i) => completedIds[i.id])) return true;
      }
    }
    for (let i = 1; i <= SECTION_1_DEFINITION.deliverables.length; i += 1) {
      if (completedIds[`deliverable-${i}`]) return true;
    }
    return Object.keys(completedIds).some(
      (k) => (k.startsWith('doc-') || k.startsWith('cycle-')) && completedIds[k]
    );
  }, [completedIds]);

  const hasVisibleP1Tasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PHASES.some((phase) =>
      phase.masterTasks.some((task) => {
        const isDone = Boolean(completedIds[task.id]);
        if (filterMode === 'remaining' && isDone) return false;
        if (filterMode === 'completed' && !isDone) return false;
        if (q) {
          const inTask = task.text.toLowerCase().includes(q);
          const inTitle =
            phase.title.toLowerCase().includes(q) || phase.number.toLowerCase().includes(q);
          const inDetails = phase.detailBlocks.some(
            (b) =>
              b.heading.toLowerCase().includes(q) ||
              b.items?.some((i) => i.text.toLowerCase().includes(q)) ||
              b.orderedItems?.some((i) => i.text.toLowerCase().includes(q))
          );
          return inTask || inTitle || inDetails;
        }
        return true;
      })
    );
  }, [completedIds, filterMode, searchQuery]);

  const switchTab = (tab: ProjectTab) => {
    setActiveTab(tab);
    setShowKnowledgeBase(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openKnowledgeBase = (
    cat: KnowledgeCategory = 'workflows',
    proj: KnowledgeProjectFilter = activeTab
  ) => {
    setKbCategory(cat);
    setKbProjectFilter(proj);
    setShowKnowledgeBase(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Persistent Sticky Top Bar: All 5 Project buttons + Knowledge Base toggle */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2 sm:gap-4 px-3 py-2.5 sm:px-6">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setShowKnowledgeBase(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden md:block text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Research To-Do
          </a>

          {/* Project Buttons: Always visible on all viewports and while scrolling */}
          <nav
            role="tablist"
            aria-label="Projects"
            className="flex flex-1 md:flex-initial flex-wrap sm:flex-nowrap items-center justify-center gap-1 rounded-lg bg-slate-100 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!showKnowledgeBase && activeTab === 'project-1'}
              onClick={() => switchTab('project-1')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                !showKnowledgeBase && activeTab === 'project-1'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Projects</span>
              <span className="font-mono text-[11px] font-medium text-slate-500 tabular-nums">
                {p1Stats.percent}%
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!showKnowledgeBase && activeTab === 'project-2'}
              onClick={() => switchTab('project-2')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                !showKnowledgeBase && activeTab === 'project-2'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Learn</span>
              <span className="font-mono text-[11px] font-medium text-slate-500 tabular-nums">
                {p2Percent}%
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!showKnowledgeBase && activeTab === 'project-3'}
              onClick={() => switchTab('project-3')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                !showKnowledgeBase && activeTab === 'project-3'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Research</span>
              <span className="font-mono text-[11px] font-medium text-slate-500 tabular-nums">
                {p3Percent}%
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!showKnowledgeBase && activeTab === 'project-4'}
              onClick={() => switchTab('project-4')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                !showKnowledgeBase && activeTab === 'project-4'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>PhD</span>
              <span className="font-mono text-[11px] font-medium text-slate-500 tabular-nums">
                {p4Percent}%
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={!showKnowledgeBase && activeTab === 'project-5'}
              onClick={() => switchTab('project-5')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                !showKnowledgeBase && activeTab === 'project-5'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Job</span>
              <span className="font-mono text-[11px] font-medium text-slate-500 tabular-nums">
                {p5Percent}%
              </span>
            </button>
          </nav>

          {/* Zone 3: Knowledge Base Toggle (Accessible across mobile & desktop) */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                if (showKnowledgeBase) {
                  setShowKnowledgeBase(false);
                } else {
                  openKnowledgeBase('workflows', activeTab);
                }
              }}
              aria-pressed={showKnowledgeBase}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                showKnowledgeBase
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {showKnowledgeBase ? (
                <>
                  <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
                  <span>Back to To-Do</span>
                </>
              ) : (
                <>
                  <BookOpen className="h-3.5 w-3.5 shrink-0 text-blue-700" />
                  <span className="hidden sm:inline">Knowledge Base</span>
                  <span className="sm:hidden">Guides</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:py-8">
        {showKnowledgeBase ? (
          <KnowledgeBaseView
            completedIds={completedIds}
            onToggleComplete={toggleComplete}
            initialCategory={kbCategory}
            initialProjectFilter={kbProjectFilter}
            onBackToTasks={() => setShowKnowledgeBase(false)}
          />
        ) : (
          <>
            {activeTab === 'project-1' && (
              <>
                {/* Compact To-Do Header Strip */}
                <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                        <span>Projects</span>
                        <span aria-hidden="true">·</span>
                        <span>Cosmic Voids and CMB Temperature Cross-Correlation</span>
                      </div>
                      <h1 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                        Master To-Do List
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                          {p1Stats.percent}%
                        </span>
                        <span className="font-mono text-xs text-slate-600 tabular-nums">
                          {p1Stats.doneMaster}/{p1Stats.totalMaster} tasks
                        </span>
                      </div>

                      <InfoPopover
                        label="Project 1 overview and core question"
                        title={PROJECT_HEADER.title}
                        buttonText="Project info"
                      >
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] font-medium text-slate-500">
                          {PROJECT_HEADER.meta.map((item, idx) => (
                            <span key={item} className="inline-flex items-center gap-1.5">
                              {idx > 0 && <span aria-hidden="true">·</span>}
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                        {PROJECT_HEADER.intro.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-slate-800">
                          <span className="font-semibold text-amber-900">Core question: </span>
                          <span>{SECTION_1_DEFINITION.workingQuestion}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {SECTION_3_META.intro} {SECTION_3_META.durationNote}
                        </p>
                        <button
                          type="button"
                          onClick={() => openKnowledgeBase('workflows', 'project-1')}
                          className="font-semibold text-blue-700 hover:underline cursor-pointer"
                        >
                          Open Project 1 Guides &amp; Prompt 01 in Knowledge Base →
                        </button>
                      </InfoPopover>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-blue-600 transition-all duration-200"
                      style={{ width: `${p1Stats.percent}%` }}
                    />
                  </div>
                </div>

                {/* Main Workspace: Sticky Sidebar + Master To-Do List */}
                <div className="grid gap-8 lg:grid-cols-[248px_1fr] lg:items-start">
                  {/* Left Sticky Phase Navigation */}
                  <aside className="hidden lg:block sticky top-20 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-semibold text-slate-900 px-2">Phases (00–09)</div>
                    <nav aria-label="Phase quick navigation" className="mt-2 space-y-0.5">
                      {PHASES.map((phase) => {
                        const total = phase.masterTasks.length;
                        const done = phase.masterTasks.filter((t) => completedIds[t.id]).length;
                        const isComplete = total > 0 && done === total;

                        return (
                          <a
                            key={phase.id}
                            href={`#${phase.id}`}
                            className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-slate-50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                          >
                            <span className="truncate text-slate-700 group-hover:text-slate-950 font-medium">
                              <span className="font-mono text-slate-400 mr-1.5">
                                {phase.number.replace('Phase ', '')}
                              </span>
                              {phase.title}
                            </span>
                            <span
                              className={`font-mono tabular-nums shrink-0 ${
                                isComplete ? 'text-emerald-700 font-semibold' : 'text-slate-500'
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
                    <nav aria-label="Project 1 Knowledge Base shortcuts" className="mt-2 space-y-0.5 text-xs text-slate-600">
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('workflows', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        1. Project definition
                      </button>
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('workflows', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        2. Two-AI working system
                      </button>
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('workflows', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        5. Study-along-the-way
                      </button>
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('resources', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        6. Learning resources
                      </button>
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('schedules', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        7. 16-week roadmap &amp; logs
                      </button>
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('schemas', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 font-medium text-amber-800 hover:bg-amber-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        8. Prompt 01 (Start here)
                      </button>
                      <button
                        type="button"
                        onClick={() => openKnowledgeBase('workflows', 'project-1')}
                        className="w-full text-left block rounded-lg px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-950 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        9. How we work together
                      </button>
                    </nav>
                  </aside>

                  {/* Main Column */}
                  <main className="min-w-0 space-y-6">
                    <FocusNoteCard
                      projectId="project-1"
                      onOpenKnowledgeBase={() => openKnowledgeBase('workflows', 'project-1')}
                    />

                    {/* Section 3: Master To-Do List */}
                    <div id="master-todo" className="space-y-4">
                      {/* Filter & Search Toolbar */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-3">
                        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                          <button
                            type="button"
                            onClick={() => setFilterMode('all')}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                              filterMode === 'all'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            All ({p1Stats.totalMaster})
                          </button>
                          <button
                            type="button"
                            onClick={() => setFilterMode('remaining')}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                              filterMode === 'remaining'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Remaining ({p1Stats.remainingMaster})
                          </button>
                          <button
                            type="button"
                            onClick={() => setFilterMode('completed')}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                              filterMode === 'completed'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Done ({p1Stats.doneMaster})
                          </button>
                        </div>

                        <div className="flex items-center gap-2 flex-1 sm:justify-end">
                          <div className="relative flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Filter tasks or sub-steps..."
                              aria-label="Filter tasks or sub-steps"
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-8 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                            />
                            {searchQuery && (
                              <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 cursor-pointer"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>

                          {!confirmReset ? (
                            <button
                              type="button"
                              onClick={() => setConfirmReset(true)}
                              disabled={!hasP1Completed}
                              title="Reset checklist"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Reset</span>
                            </button>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs shrink-0">
                              <button
                                type="button"
                                onClick={handleResetProject1}
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

                      {/* Phase Cards */}
                      {hasVisibleP1Tasks ? (
                        <div className="space-y-4">
                          {PHASES.map((phase) => (
                            <PhaseCard
                              key={phase.id}
                              phase={phase}
                              completedIds={completedIds}
                              onToggleComplete={toggleComplete}
                              onSetManyComplete={handleSetManyComplete}
                              isExpanded={Boolean(expandedPhases[phase.id])}
                              onToggleExpand={() => togglePhaseExpand(phase.id)}
                              filterMode={filterMode}
                              searchQuery={searchQuery}
                              onOpenKnowledgeBase={openKnowledgeBase}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
                            <p className="text-sm font-medium text-slate-900">
                              No tasks match the current filter.
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              Try clearing your search query or switching back to all tasks.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setFilterMode('all');
                                setSearchQuery('');
                              }}
                              className="mt-4 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                            >
                              Show all {p1Stats.totalMaster} tasks
                            </button>
                          </div>
                          <FocusNoteCard
                            projectId="project-1"
                            forceShow
                            onOpenKnowledgeBase={() => openKnowledgeBase('workflows', 'project-1')}
                          />
                        </div>
                      )}
                    </div>
                  </main>
                </div>
              </>
            )}

            {activeTab === 'project-2' && (
              <Project2View
                completedIds={completedIds}
                expandedSubjects={expandedSubjects}
                onToggleComplete={toggleComplete}
                onSetManyComplete={handleSetManyComplete}
                onToggleExpandSubject={toggleSubjectExpand}
                onResetProject2={handleResetProject2}
                onOpenKnowledgeBase={openKnowledgeBase}
              />
            )}

            {activeTab === 'project-3' && (
              <Project3View
                completedIds={completedIds}
                onToggleComplete={toggleComplete}
                onSetManyComplete={handleSetManyComplete}
                onResetProject3={handleResetProject3}
                onOpenKnowledgeBase={openKnowledgeBase}
              />
            )}

            {activeTab === 'project-4' && (
              <Project4View
                completedIds={completedIds}
                onToggleComplete={toggleComplete}
                onSetManyComplete={handleSetManyComplete}
                onResetProject4={handleResetProject4}
                onOpenKnowledgeBase={openKnowledgeBase}
              />
            )}

            {activeTab === 'project-5' && (
              <Project5View
                completedIds={completedIds}
                onToggleComplete={toggleComplete}
                onSetManyComplete={handleSetManyComplete}
                onResetProject5={handleResetProject5}
                onOpenKnowledgeBase={openKnowledgeBase}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
