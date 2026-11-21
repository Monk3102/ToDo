import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Search,
  X,
} from 'lucide-react';
import {
  PHASES,
  SECTION_1_DEFINITION,
  SECTION_2_TWO_AI_SYSTEM,
  SECTION_5_STUDY_SYSTEM,
  SECTION_6_RESOURCES,
  SECTION_7_ROADMAP,
  SECTION_8_PROMPT_01,
  SECTION_9_WORKING_TOGETHER,
} from '../data/projectData';
import {
  PROJECT_2_CONNECTIONS,
  PROJECT_2_IMPORTANT_RULE,
  PROJECT_2_ORDER_OF_EXECUTION,
  PROJECT_2_SUBJECTS,
  PROJECT_2_TRACKS,
  PROJECT_2_WEEKLY_SCHEDULE,
} from '../data/project2Data';
import {
  PROJECT_3_DELIVERABLES,
  PROJECT_3_HEADER,
  PROJECT_3_STARTING_CHECKLIST,
} from '../data/project3Data';
import {
  PROJECT_4_ADMISSIONS_AUDIT,
  PROJECT_4_DECISIONS,
  PROJECT_4_EFFORT_REALITY,
  PROJECT_4_FOLDER_STRUCTURE,
  PROJECT_4_HEADER,
  PROJECT_4_PRIORITY_AUDIT,
  PROJECT_4_STRUCTURE_SUMMARY,
  PROJECT_4_WEEKLY_RHYTHM,
  PROJECT_4_WORKLOAD_AUDIT,
  PROJECT_4_WORKSTREAMS,
} from '../data/project4Data';
import {
  PROJECT_5_FIRST_MONTH_PLAN,
  PROJECT_5_HEADER,
  PROJECT_5_RECOMMENDATION,
  PROJECT_5_SERVICE_SCOPE,
  PROJECT_5_WEEKLY_BUDGET,
} from '../data/project5Data';
import { MathFormula } from './MathFormula';

export type KnowledgeCategory =
  | 'workflows'
  | 'schedules'
  | 'schemas'
  | 'resources'
  | 'audits';

export type KnowledgeProjectFilter =
  | 'all'
  | 'project-1'
  | 'project-2'
  | 'project-3'
  | 'project-4'
  | 'project-5';

interface KnowledgeBaseViewProps {
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  initialCategory?: KnowledgeCategory;
  initialProjectFilter?: KnowledgeProjectFilter;
  onBackToTasks: () => void;
}

const STORAGE_DECISIONS_KEY = 'phd_open_decisions_v1';
const STORAGE_CONFIDENT_TOPICS_KEY = 'job_confident_topics_v1';

function getStoredMap(key: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as Record<string, string>;
  } catch {
    // Ignore
  }
  return {};
}

function getStoredBoolMap(key: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    // Ignore
  }
  return {};
}

const LEARNING_QUEUE_MARKDOWN = `# Learning_Queue.md Entry
Concept: [What you need to understand]
Importance: [Why this concept is required now]
Mathematics: [Equations and derivations to study]
Lecture: [Specific lecture and timestamp]
Book: [Specific chapter or section]
Paper: [Relevant research paper]
Documentation: [Specific library documentation]
Practical exercise: [Small exercise to test understanding]
Completion test: [Questions you must be able to answer]`;

const EMAIL_SKELETON_TEXT = `Subject: PhD Inquiry — [Specific Research Topic / Supervoids & LSS]

Dear Professor [Last Name],

1. Introduction:
I am [Your Name], currently [your academic position / MSc Physics background].

2. Research Connection:
I recently read your paper "[Paper Title]" on [specific topic/method] and was particularly interested in [specific result or methodology].

3. Background:
My MSc dissertation focuses on [topic], where I use Python, Astropy, and statistical analysis to [brief personal contribution].

4. Interest:
I am aiming to pursue a PhD starting in [2027/2028] on [research direction connecting to their group].

5. Question:
Could you let me know if you expect PhD openings in your group, or recommend whether I should apply through [University/Programme Name]?

Best regards,
[Your Name]`;

export function KnowledgeBaseView({
  completedIds,
  onToggleComplete,
  initialCategory = 'workflows',
  initialProjectFilter = 'all',
  onBackToTasks,
}: KnowledgeBaseViewProps) {
  const [category, setCategory] = useState<KnowledgeCategory>(initialCategory);
  const [projectFilter, setProjectFilter] =
    useState<KnowledgeProjectFilter>(initialProjectFilter);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Steppers & Selectors
  const [cycleStepIdx, setCycleStepIdx] = useState(0);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [p2StageIdx, setP2StageIdx] = useState(0);
  const [p2ScheduleDay, setP2ScheduleDay] = useState(0);
  const [p4RhythmDay, setP4RhythmDay] = useState(0);
  const [p5WeekIdx, setP5WeekIdx] = useState(0);
  const [admissionsView, setAdmissionsView] = useState<'all' | 'closed' | 'open'>('all');
  const [p5SubjectTab, setP5SubjectTab] = useState('all');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, string>>(() =>
    getStoredMap(STORAGE_DECISIONS_KEY)
  );
  const [confidentTopics, setConfidentTopics] = useState<Record<string, boolean>>(() =>
    getStoredBoolMap(STORAGE_CONFIDENT_TOPICS_KEY)
  );

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setProjectFilter(initialProjectFilter);
  }, [initialProjectFilter]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DECISIONS_KEY, JSON.stringify(decisions));
    } catch {
      // Ignore
    }
  }, [decisions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CONFIDENT_TOPICS_KEY, JSON.stringify(confidentTopics));
    } catch {
      // Ignore
    }
  }, [confidentTopics]);

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Ignore
    }
  };

  const q = searchQuery.trim().toLowerCase();
  const showProject = (proj: KnowledgeProjectFilter) =>
    projectFilter === 'all' || projectFilter === proj;

  const matchesSearch = (...chunks: (string | undefined)[]) => {
    if (!q) return true;
    return chunks.some((c) => (c ?? '').toLowerCase().includes(q));
  };

  // Extract schemas from Project 4 & Project 1
  const p00FolderTree = PHASES[0]?.detailBlocks.find((b) => b.folderTree)?.folderTree ?? '';
  const p00ProtocolBlock = PHASES[0]?.detailBlocks.find((b) => b.id === 'p00-d');
  const p02LitMatrix = PHASES[2]?.detailBlocks.find((b) => b.id === 'p02-c');
  const p09Manuscript = PHASES[9]?.detailBlocks.find((b) => b.id === 'p09-b');

  const wsB = PROJECT_4_WORKSTREAMS.find((w) => w.id === 'p4-ws-b');
  const wsC = PROJECT_4_WORKSTREAMS.find((w) => w.id === 'p4-ws-c');
  const wsD = PROJECT_4_WORKSTREAMS.find((w) => w.id === 'p4-ws-d');

  const p4SubB1 = wsB?.subsections.find((s) => s.id === 'p4-ws-b1');
  const p4SubB2 = wsB?.subsections.find((s) => s.id === 'p4-ws-b2');
  const p4SubB3 = wsB?.subsections.find((s) => s.id === 'p4-ws-b3');
  const p4SubB4 = wsB?.subsections.find((s) => s.id === 'p4-ws-b4');
  const p4SubC1 = wsC?.subsections.find((s) => s.id === 'p4-ws-c1');
  const p4SubC2 = wsC?.subsections.find((s) => s.id === 'p4-ws-c2');
  const p4SubD1 = wsD?.subsections.find((s) => s.id === 'p4-ws-d1');
  const p4SubD2 = wsD?.subsections.find((s) => s.id === 'p4-ws-d2');
  const p4SubD4 = wsD?.subsections.find((s) => s.id === 'p4-ws-d4');

  const p2WeekDays = [
    { day: 'Monday', alt: 'Cosmic Voids (1 hr)' },
    { day: 'Tuesday', alt: 'Multimessenger Astronomy (1 hr)' },
    { day: 'Wednesday', alt: 'Cosmic Voids (1 hr)' },
    { day: 'Thursday', alt: 'Multimessenger Astronomy (1 hr)' },
    { day: 'Friday', alt: 'Cosmic Voids (1 hr)' },
    { day: 'Saturday', alt: 'Multimessenger Astronomy (1 hr)' },
    { day: 'Sunday', alt: 'Revision, unfinished exercises & research-paper reading' },
  ];

  const categories: { id: KnowledgeCategory; label: string }[] = [
    { id: 'workflows', label: 'AI Workflow & Study System' },
    { id: 'schedules', label: 'Roadmaps & Schedules' },
    { id: 'schemas', label: 'Templates, Folders & Schemas' },
    { id: 'resources', label: 'Subjects & Resources' },
    { id: 'audits', label: 'Campaign Audits & Decisions' },
  ];

  const projectFilters: { id: KnowledgeProjectFilter; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'project-1', label: 'Projects' },
    { id: 'project-2', label: 'Learn' },
    { id: 'project-3', label: 'Research' },
    { id: 'project-4', label: 'PhD' },
    { id: 'project-5', label: 'Job' },
  ];

  return (
    <div className="space-y-6">
      {/* Knowledge Base Header */}
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 sm:px-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-slate-500">
              Deep-Dive Reference · Guides, Schedules, Schemas & Audits
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Knowledge Base
            </h1>
          </div>

          <button
            type="button"
            onClick={onBackToTasks}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to To-Do List</span>
          </button>
        </div>

        {/* Utility Categories + Project Scope Filter + Search */}
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-3">
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  category === cat.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1">
              {projectFilters.map((pf) => (
                <button
                  key={pf.id}
                  type="button"
                  onClick={() => setProjectFilter(pf.id)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    projectFilter === pf.id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {pf.label}
                </button>
              ))}
            </div>

            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference material..."
                aria-label="Search Knowledge Base"
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
          </div>
        </div>
      </div>

      {/* TAB 1: AI WORKFLOW & STUDY SYSTEM */}
      {category === 'workflows' && (
        <div className="space-y-6">
          {showProject('project-1') &&
            matchesSearch(
              'Two-AI working system Research Architect Implementation Engineer working cycle',
              SECTION_2_TWO_AI_SYSTEM.importantRule
            ) && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Projects · Void–CMB Research
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Two-AI Working System & 10-Step Interactive Cycle
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{SECTION_2_TWO_AI_SYSTEM.intro}</p>
                </div>

                {/* Role Switcher */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5 rounded-lg bg-slate-100 p-1 w-fit">
                    {SECTION_2_TWO_AI_SYSTEM.roles.map((role, idx) => (
                      <button
                        key={role.title}
                        type="button"
                        onClick={() => setActiveRoleIdx(idx)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                          activeRoleIdx === idx
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {role.title.split('—')[0].trim()}
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const role = SECTION_2_TWO_AI_SYSTEM.roles[activeRoleIdx];
                    return (
                      <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">{role.title}</h3>
                          <span className="text-xs font-medium text-slate-500">
                            {role.subtitle} · {role.summary}
                          </span>
                        </div>
                        <ul className="grid gap-1.5 sm:grid-cols-2 text-xs sm:text-sm text-slate-700">
                          {role.responsibilities.map((r) => (
                            <li key={r} className="flex items-start gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>

                {/* Interactive 10-Step Cycle Stepper */}
                <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Interactive 10-Step Working Cycle
                      </h3>
                      <p className="text-xs text-slate-500">
                        Step through one research task at a time and check off completed steps.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCycleStepIdx((i) => Math.max(0, i - 1))}
                        disabled={cycleStepIdx === 0}
                        className="rounded-md border border-slate-200 p-1.5 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                        aria-label="Previous cycle step"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-xs font-semibold text-slate-900 px-2 tabular-nums">
                        Step {cycleStepIdx + 1}/{SECTION_2_TWO_AI_SYSTEM.workingCycle.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setCycleStepIdx((i) =>
                            Math.min(SECTION_2_TWO_AI_SYSTEM.workingCycle.length - 1, i + 1)
                          )
                        }
                        disabled={cycleStepIdx === SECTION_2_TWO_AI_SYSTEM.workingCycle.length - 1}
                        className="rounded-md border border-slate-200 p-1.5 text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                        aria-label="Next cycle step"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Active Step Highlight */}
                  {(() => {
                    const stepId = `cycle-${cycleStepIdx + 1}`;
                    const done = Boolean(completedIds[stepId]);
                    return (
                      <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50/60 px-4 py-3">
                        <div className="text-sm text-slate-900">
                          <span className="font-mono font-bold text-blue-700 mr-2">
                            {String(cycleStepIdx + 1).padStart(2, '0')}
                          </span>
                          <span>{SECTION_2_TWO_AI_SYSTEM.workingCycle[cycleStepIdx]}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleComplete(stepId)}
                          className={`rounded-md border px-3 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap ${
                            done
                              ? 'border-emerald-300 bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {done ? 'Completed' : 'Mark step done'}
                        </button>
                      </div>
                    );
                  })()}

                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {SECTION_2_TWO_AI_SYSTEM.workingCycle.map((step, i) => {
                      const stepId = `cycle-${i + 1}`;
                      const done = Boolean(completedIds[stepId]);
                      const active = cycleStepIdx === i;
                      return (
                        <button
                          key={step}
                          type="button"
                          onClick={() => setCycleStepIdx(i)}
                          className={`flex items-start gap-2.5 rounded-md border px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                            active
                              ? 'border-blue-400 bg-blue-50/40 text-slate-900 font-medium'
                              : done
                                ? 'border-slate-200 bg-slate-50 text-slate-500 line-through'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-mono text-slate-400 shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{step}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50/75 px-4 py-3 text-xs sm:text-sm text-slate-800">
                  {SECTION_2_TWO_AI_SYSTEM.importantRule}
                </div>
              </section>
            )}

          {showProject('project-1') &&
            matchesSearch('Learning_Queue.md HEALPix Study-along-the-way nside npix') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      Projects · Study-Along-The-Way System
                    </div>
                    <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                      Learning_Queue.md Template & HEALPix Worked Example
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy('lq-tpl', LEARNING_QUEUE_MARKDOWN)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    {copiedKey === 'lq-tpl' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Template copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Learning_Queue template</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  {SECTION_5_STUDY_SYSTEM.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <tr>
                          <th className="px-3.5 py-2 font-semibold">Field</th>
                          <th className="px-3.5 py-2 font-semibold">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {SECTION_5_STUDY_SYSTEM.formatTable.map((row) => (
                          <tr key={row.field}>
                            <td className="px-3.5 py-2 font-semibold text-slate-900 whitespace-nowrap">
                              {row.field}
                            </td>
                            <td className="px-3.5 py-2 text-slate-600">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                    <div className="text-xs font-semibold text-slate-900">
                      {SECTION_5_STUDY_SYSTEM.exampleTitle}
                    </div>
                    <p className="text-xs text-slate-600">{SECTION_5_STUDY_SYSTEM.exampleIntro}</p>
                    <p className="text-xs font-semibold text-blue-800">
                      Concept: {SECTION_5_STUDY_SYSTEM.exampleConcept}
                    </p>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {SECTION_5_STUDY_SYSTEM.exampleItems.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <MathFormula id="healpix-npix" />
                    <p className="text-xs text-slate-700 font-medium">
                      {SECTION_5_STUDY_SYSTEM.exampleCompletionTest}
                    </p>
                  </div>
                </div>
              </section>
            )}

          {showProject('project-1') &&
            matchesSearch('Prompt 01 Research architecture How we work together', SECTION_8_PROMPT_01.promptText) && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      Projects · Initial AI Setup & Governance
                    </div>
                    <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                      {SECTION_8_PROMPT_01.title} & Working Protocol
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {SECTION_8_PROMPT_01.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy('prompt-01', SECTION_8_PROMPT_01.promptText)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    {copiedKey === 'prompt-01' ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Prompt copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Prompt 01</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                  {SECTION_8_PROMPT_01.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
                  {SECTION_8_PROMPT_01.promptText}
                </pre>

                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-900">
                    How We Work Together (Per-Phase Deliverables):
                  </div>
                  <p className="text-xs text-slate-600">{SECTION_9_WORKING_TOGETHER.distinction}</p>
                  <div className="grid gap-1.5 sm:grid-cols-3 text-xs text-slate-700">
                    {SECTION_9_WORKING_TOGETHER.perPhaseItems.map((item) => (
                      <div key={item} className="rounded border border-slate-200 bg-white px-2.5 py-1.5">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    {SECTION_9_WORKING_TOGETHER.reviewNote}{' '}
                    <span className="font-semibold text-slate-900">
                      {SECTION_9_WORKING_TOGETHER.finalScientificPoint}
                    </span>
                  </p>
                </div>
              </section>
            )}

          {showProject('project-2') &&
            matchesSearch('AI-assisted learning system Theory Computation Observation curriculum planner') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Learn · Curriculum Operating Rule
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    AI-Assisted Learning Contract & Three Pillars
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{PROJECT_2_IMPORTANT_RULE.intro}</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-900">
                      {PROJECT_2_IMPORTANT_RULE.ai1Intro}
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-slate-700">
                      {PROJECT_2_IMPORTANT_RULE.ai1Items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        {PROJECT_2_IMPORTANT_RULE.pillarsIntro}
                      </div>
                      <div className="space-y-2">
                        {PROJECT_2_IMPORTANT_RULE.pillars.map((pil) => (
                          <div key={pil.label} className="text-xs sm:text-sm text-slate-700">
                            <span className="font-semibold text-slate-900">{pil.label} </span>
                            <span>{pil.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50/75 p-3.5 text-xs text-slate-800 space-y-1">
                      <p>{PROJECT_2_IMPORTANT_RULE.ai2Note}</p>
                      <p className="font-semibold">{PROJECT_2_IMPORTANT_RULE.boldRule}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
        </div>
      )}

      {/* TAB 2: ROADMAPS & SCHEDULES */}
      {category === 'schedules' && (
        <div className="space-y-6">
          {showProject('project-1') &&
            matchesSearch('16-week roadmap deliverables Master_Todo Research_Log Experiment_Log') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Projects · Void–CMB Timeline & Documents
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    16-Week Roadmap, 5 Core Documents & 9 Deliverables
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">{SECTION_7_ROADMAP.intro}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {SECTION_7_ROADMAP.weeks.map((w) => (
                    <div
                      key={w.period}
                      className="rounded-lg border border-slate-200 bg-slate-50/60 p-3"
                    >
                      <div className="font-mono text-xs font-semibold text-blue-700">{w.period}</div>
                      <div className="mt-1 text-xs sm:text-sm text-slate-800">{w.focus}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-slate-900">
                      Five Core Project Documents (Check when created)
                    </h3>
                    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                      {SECTION_7_ROADMAP.fiveDocuments.map((doc) => {
                        const id = `doc-${doc.file}`;
                        const done = Boolean(completedIds[id]);
                        return (
                          <li key={doc.file} className="flex items-start gap-2.5 px-3.5 py-2.5 bg-white">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={done}
                              onClick={() => onToggleComplete(id)}
                              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border cursor-pointer ${
                                done
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onToggleComplete(id)}
                              className="text-left text-xs cursor-pointer"
                            >
                              <span className={`font-mono font-semibold ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {doc.file}
                              </span>
                              <span className="text-slate-600"> — {doc.purpose}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-slate-900">
                      Nine Project Deliverables
                    </h3>
                    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                      {SECTION_1_DEFINITION.deliverables.map((del, idx) => {
                        const id = `deliverable-${idx + 1}`;
                        const done = Boolean(completedIds[id]);
                        return (
                          <li key={del} className="flex items-start gap-2.5 px-3.5 py-2 bg-white">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={done}
                              onClick={() => onToggleComplete(id)}
                              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border cursor-pointer ${
                                done
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onToggleComplete(id)}
                              className={`text-left text-xs cursor-pointer ${done ? 'line-through text-slate-400' : 'text-slate-700'}`}
                            >
                              {del}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50/75 px-4 py-2.5 text-xs text-slate-800">
                  {SECTION_7_ROADMAP.additionalRule}
                </div>
              </section>
            )}

          {showProject('project-2') &&
            matchesSearch('Order of Execution Stage 1 2 3 4 6-hour daily schedule weekly alternation') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Learn · Progression & Daily Time Split
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    16-Step Execution Order & 6-Hour Daily Schedule
                  </h2>
                </div>

                {/* Interactive 4-Stage Stepper */}
                <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-slate-900">
                      Recommended Order of Execution (4 Stages · 16 Steps)
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setP2StageIdx((i) => Math.max(0, i - 1))}
                        disabled={p2StageIdx === 0}
                        className="rounded border border-slate-200 bg-white p-1 text-slate-700 disabled:opacity-40 cursor-pointer"
                        aria-label="Previous stage"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-xs font-semibold text-slate-700 px-1.5">
                        Stage {p2StageIdx + 1}/4
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setP2StageIdx((i) =>
                            Math.min(PROJECT_2_ORDER_OF_EXECUTION.stages.length - 1, i + 1)
                          )
                        }
                        disabled={p2StageIdx === PROJECT_2_ORDER_OF_EXECUTION.stages.length - 1}
                        className="rounded border border-slate-200 bg-white p-1 text-slate-700 disabled:opacity-40 cursor-pointer"
                        aria-label="Next stage"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {PROJECT_2_ORDER_OF_EXECUTION.stages.map((st, idx) => (
                      <button
                        key={st.title}
                        type="button"
                        onClick={() => setP2StageIdx(idx)}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                          p2StageIdx === idx
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {st.title}
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const activeStage = PROJECT_2_ORDER_OF_EXECUTION.stages[p2StageIdx];
                    return (
                      <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white overflow-hidden">
                        {activeStage.steps.map((step) => {
                          const id = `p2-order-${step.num}`;
                          const done = Boolean(completedIds[id]);
                          return (
                            <li key={id} className="flex items-center gap-3 px-4 py-2.5">
                              <button
                                type="button"
                                role="checkbox"
                                aria-checked={done}
                                onClick={() => onToggleComplete(id)}
                                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border cursor-pointer ${
                                  done
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-slate-300 bg-white text-transparent'
                                }`}
                              >
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onToggleComplete(id)}
                                className={`flex-1 text-left text-xs sm:text-sm cursor-pointer ${
                                  done ? 'text-slate-400 line-through' : 'text-slate-800'
                                }`}
                              >
                                <span className="font-mono text-slate-400 mr-2">
                                  {String(step.num).padStart(2, '0')}
                                </span>
                                {step.text}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })()}
                </div>

                {/* Interactive Day Selector + 6-Hour Daily Breakdown */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-900">
                    Interactive Weekly Day Alternation (6 Hours / Day)
                  </div>
                  <p className="text-xs text-slate-600">{PROJECT_2_WEEKLY_SCHEDULE.intro}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p2WeekDays.map((d, idx) => (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setP2ScheduleDay(idx)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer ${
                          p2ScheduleDay === idx
                            ? 'bg-blue-600 text-white'
                            : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3 text-xs sm:text-sm text-slate-800">
                    <span className="font-semibold text-blue-900">
                      {p2WeekDays[p2ScheduleDay]?.day} focus:{' '}
                    </span>
                    <span>{p2WeekDays[p2ScheduleDay]?.alt}</span>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <tr>
                          <th className="px-4 py-2 font-semibold">Daily Activity</th>
                          <th className="px-4 py-2 font-semibold">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {PROJECT_2_WEEKLY_SCHEDULE.table.map((r) => (
                          <tr key={r.activity} className={r.isTotal ? 'bg-slate-50 font-semibold' : ''}>
                            <td className="px-4 py-2 text-slate-800">{r.activity}</td>
                            <td className="px-4 py-2 font-mono text-slate-900 tabular-nums">{r.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

          {showProject('project-3') &&
            matchesSearch('Supervoid research deliverables Route A Route B stages') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Research · Supervoid Paper
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Routes Overview & 8-Stage Deliverables Matrix
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{PROJECT_3_HEADER.objective}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {PROJECT_3_HEADER.routes.map((r) => (
                    <div key={r.label} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
                      <div className="text-xs font-semibold text-slate-900">{r.label}</div>
                      <p className="mt-1 text-xs text-slate-600">{r.description}</p>
                    </div>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Stage</th>
                        <th className="px-4 py-2 font-semibold">Expected Deliverable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {PROJECT_3_DELIVERABLES.map((d) => (
                        <tr key={d.stage}>
                          <td className="px-4 py-2 font-semibold text-slate-900">{d.stage}</td>
                          <td className="px-4 py-2 text-slate-700">{d.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-500">{PROJECT_3_STARTING_CHECKLIST.closingNote}</p>
              </section>
            )}

          {showProject('project-4') &&
            matchesSearch('PhD weekly working rhythm Monday Tuesday Friday Saturday Sunday') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    PhD · Weekly Operating Cadence
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Weekly Working Rhythm (Backwards from Monday Morning)
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    {PROJECT_4_WEEKLY_RHYTHM.intro}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {PROJECT_4_WEEKLY_RHYTHM.days.map((d, idx) => (
                    <button
                      key={d.day}
                      type="button"
                      onClick={() => setP4RhythmDay(idx)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer ${
                        p4RhythmDay === idx
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                  <div className="text-xs font-semibold text-blue-900">
                    {PROJECT_4_WEEKLY_RHYTHM.days[p4RhythmDay]?.day}
                  </div>
                  <p className="mt-1 text-sm text-slate-800">
                    {PROJECT_4_WEEKLY_RHYTHM.days[p4RhythmDay]?.focus}
                  </p>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-3">
                  {PROJECT_4_WEEKLY_RHYTHM.days.map((d) => (
                    <div key={d.day} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
                      <div className="text-xs font-semibold text-slate-900">{d.day}</div>
                      <p className="mt-1 text-xs text-slate-600">{d.focus}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {showProject('project-5') &&
            matchesSearch('First-month tutoring execution plan weekly time allocation 2.5 hours') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Job · Tutoring Launch Timeline & Cap
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    First-Month Execution Stepper & 2.5-Hour Weekly Budget
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    {PROJECT_5_FIRST_MONTH_PLAN.intro}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {PROJECT_5_FIRST_MONTH_PLAN.rows.map((r, idx) => (
                    <button
                      key={r.period}
                      type="button"
                      onClick={() => setP5WeekIdx(idx)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                        p5WeekIdx === idx
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {r.period}
                    </button>
                  ))}
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                  <div className="text-xs font-semibold text-blue-900">
                    {PROJECT_5_FIRST_MONTH_PLAN.rows[p5WeekIdx]?.period} · Expected output:{' '}
                    {PROJECT_5_FIRST_MONTH_PLAN.rows[p5WeekIdx]?.output}
                  </div>
                  <p className="mt-1 text-sm text-slate-800">
                    {PROJECT_5_FIRST_MONTH_PLAN.rows[p5WeekIdx]?.task}
                  </p>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Activity</th>
                        <th className="px-4 py-2 font-semibold">Weekly Time Cap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {PROJECT_5_WEEKLY_BUDGET.rows.map((r) => (
                        <tr key={r.id}>
                          <td className="px-4 py-2 text-slate-800">{r.activity}</td>
                          <td className="px-4 py-2 font-mono text-slate-900 tabular-nums">{r.label}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-semibold">
                        <td className="px-4 py-2 text-slate-900">Total (max 2–3 hrs/week)</td>
                        <td className="px-4 py-2 font-mono text-slate-900 tabular-nums">
                          {PROJECT_5_WEEKLY_BUDGET.totalLabel}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-slate-600">{PROJECT_5_FIRST_MONTH_PLAN.note}</p>
              </section>
            )}
        </div>
      )}

      {/* TAB 3: TEMPLATES, FOLDERS & SCHEMAS */}
      {category === 'schemas' && (
        <div className="space-y-6">
          {showProject('project-1') &&
            matchesSearch('Void_CMB_Correlation AI_Workflow_Protocol Literature matrix Manuscript structure') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      Projects · Void–CMB Architecture & Tables
                    </div>
                    <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                      Workspace Folder Tree, AI Protocol, Literature Matrix & Manuscript Outline
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy('p1-tree', p00FolderTree)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    {copiedKey === 'p1-tree' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Folder tree copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Void_CMB tree</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
                    {p00FolderTree}
                  </pre>

                  {p00ProtocolBlock && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        AI_Workflow_Protocol.md (9 Required Assignment Fields)
                      </div>
                      <ol className="space-y-1 text-xs text-slate-700">
                        {(p00ProtocolBlock.items ?? []).map((it) => (
                          <li key={it.id} className="flex items-start gap-2">
                            <span className="font-mono text-slate-400">{it.numbered}.</span>
                            <span>{it.text}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {p02LitMatrix?.table && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-slate-900">
                        Literature Matrix Columns (Phase 02)
                      </h3>
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                            <tr>
                              {p02LitMatrix.table.columns.map((c) => (
                                <th key={c} className="px-3 py-2 font-semibold">{c}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {p02LitMatrix.table.rows.map((r) => (
                              <tr key={r[0]}>
                                <td className="px-3 py-1.5 font-semibold text-slate-900">{r[0]}</td>
                                <td className="px-3 py-1.5 text-slate-600">{r[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {p09Manuscript?.table && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-slate-900">
                        Manuscript Structure (Phase 09)
                      </h3>
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                            <tr>
                              {p09Manuscript.table.columns.map((c) => (
                                <th key={c} className="px-3 py-2 font-semibold">{c}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {p09Manuscript.table.rows.map((r) => (
                              <tr key={r[0]}>
                                <td className="px-3 py-1.5 font-semibold text-slate-900">{r[0]}</td>
                                <td className="px-3 py-1.5 text-slate-600">{r[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

          {showProject('project-4') &&
            matchesSearch(
              'PhD_Applications_2027 Professor_Database Programme_Database Application_Dashboard Email template countries'
            ) && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      PhD · Campaign Architecture, Databases & Email Templates
                    </div>
                    <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                      PhD_Applications_2027/ Structure, Database Schemas & Outreach Copy
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy('p4-tree', PROJECT_4_FOLDER_STRUCTURE.tree)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    {copiedKey === 'p4-tree' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Folder tree copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy PhD folder tree</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Folder Tree + 3 Spreadsheets */}
                <div className="grid gap-5 lg:grid-cols-2">
                  <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
                    {PROJECT_4_FOLDER_STRUCTURE.tree}
                  </pre>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-900">
                      {PROJECT_4_FOLDER_STRUCTURE.spreadsheetsIntro}
                    </div>
                    {PROJECT_4_FOLDER_STRUCTURE.spreadsheets.map((sp) => (
                      <div key={sp.name} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                        <div className="font-mono text-xs font-semibold text-slate-900">{sp.name}</div>
                        <p className="mt-0.5 text-xs text-slate-600">{sp.desc}</p>
                      </div>
                    ))}
                    <p className="text-xs text-slate-500">{PROJECT_4_FOLDER_STRUCTURE.closingNote}</p>

                    <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        Workstreams A–F Architecture
                      </div>
                      <div className="grid gap-1.5 sm:grid-cols-2 text-xs">
                        {PROJECT_4_STRUCTURE_SUMMARY.streams.map((s) => (
                          <div key={s.letter} className="text-slate-700">
                            <span className="font-mono font-semibold text-blue-700">{s.letter}. </span>
                            <span className="font-semibold text-slate-900">{s.name}:</span> {s.desc}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Programme & Professor DB Schemas */}
                <div className="grid gap-5 lg:grid-cols-2">
                  {p4SubB3?.table && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-slate-900">
                        Programme Database Columns (B3)
                      </h3>
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                            <tr>
                              {p4SubB3.table.columns.map((c) => (
                                <th key={c} className="px-3 py-2 font-semibold">{c}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {p4SubB3.table.rows.map((r) => (
                              <tr key={r[0]}>
                                <td className="px-3 py-1.5 font-semibold text-slate-900">{r[0]}</td>
                                <td className="px-3 py-1.5 text-slate-600">{r[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {p4SubC1?.table && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-slate-900">
                        Professor Database Columns (C1)
                      </h3>
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                            <tr>
                              {p4SubC1.table.columns.map((c) => (
                                <th key={c} className="px-3 py-2 font-semibold">{c}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {p4SubC1.table.rows.map((r) => (
                              <tr key={r[0]}>
                                <td className="px-3 py-1.5 font-semibold text-slate-900">{r[0]}</td>
                                <td className="px-3 py-1.5 text-slate-600">{r[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Skeleton Copy + Templates + Reading Questions + Countries */}
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-semibold text-slate-900">
                        D1. 5-Part Email Skeleton & D2. Three Templates
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCopy('email-skel', EMAIL_SKELETON_TEXT)}
                        className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        {copiedKey === 'email-skel' ? 'Copied' : 'Copy skeleton'}
                      </button>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {(p4SubD1?.secondaryItems ?? []).map((it) => (
                        <li key={it}>· {it}</li>
                      ))}
                    </ul>
                    <div className="grid gap-2 sm:grid-cols-3 pt-1">
                      {(p4SubD2?.templates ?? []).map((tpl) => (
                        <div key={tpl.name} className="rounded border border-slate-200 bg-white p-2.5">
                          <div className="text-xs font-semibold text-slate-900">{tpl.name}</div>
                          <p className="mt-0.5 text-[11px] text-slate-600">{tpl.focus}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">D4 Tracked Fields: </span>
                      {(p4SubD4?.secondaryItems ?? []).join(' · ')}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        C2. 7 Questions Every Professor Research Note Should Answer
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {(p4SubC2?.secondaryItems ?? []).map((qItem) => (
                          <li key={qItem}>· {qItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        B1 Search Areas, B2 17 Target Countries & B4 Classification
                      </div>
                      <p className="text-xs text-slate-700">
                        <span className="font-semibold">Areas: </span>
                        {(p4SubB1?.secondaryItems ?? []).join(' · ')}
                      </p>
                      <p className="text-xs text-slate-700">
                        <span className="font-semibold">Countries: </span>
                        {(p4SubB2?.countries ?? []).join(', ')}
                      </p>
                      <ul className="space-y-0.5 text-xs text-slate-600">
                        {(p4SubB4?.secondaryItems ?? []).map((catItem, i) => (
                          <li key={catItem}>
                            {i + 1}. {catItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )}
        </div>
      )}

      {/* TAB 4: SUBJECTS & RESOURCES */}
      {category === 'resources' && (
        <div className="space-y-6">
          {showProject('project-1') &&
            matchesSearch('Planck SMICA BOSS DESIVAST Wayne Hu David Tong healpy Astropy') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Projects · Void–CMB Physics & Datasets
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Research Question, Technical Approach & Starting Resources
                  </h2>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50/75 px-4 py-3 text-xs sm:text-sm text-slate-800">
                  <span className="font-semibold text-amber-900">Working question: </span>
                  <span>{SECTION_1_DEFINITION.workingQuestion}</span>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <tr>
                          <th className="px-3.5 py-2 font-semibold">Component</th>
                          <th className="px-3.5 py-2 font-semibold">Proposed Choice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {SECTION_1_DEFINITION.approachTable.map((r) => (
                          <tr key={r.component}>
                            <td className="px-3.5 py-2 font-semibold text-slate-900">{r.component}</td>
                            <td className="px-3.5 py-2 text-slate-600">{r.choice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                        <tr>
                          <th className="px-3.5 py-2 font-semibold">Subject</th>
                          <th className="px-3.5 py-2 font-semibold">Primary Resource</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {SECTION_6_RESOURCES.table.map((r) => (
                          <tr key={r.subject}>
                            <td className="px-3.5 py-2 font-semibold text-slate-900">{r.subject}</td>
                            <td className="px-3.5 py-2 text-slate-600">{r.resource}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[...SECTION_1_DEFINITION.links.map((l) => ({ label: l.title, url: l.url })), ...SECTION_6_RESOURCES.officialLinks].map(
                    (lnk) => (
                      <a
                        key={lnk.url}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50"
                      >
                        <span>{lnk.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )
                  )}
                </div>
              </section>
            )}

          {showProject('project-2') &&
            matchesSearch('Astropy IUCAA StatQuest Parkinson Eigenchris CLASS CAMB VIDE LIGO IceCube') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Learn · Five Tracks & Curated Courses
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Track Dependency Map & External Resource Library
                  </h2>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-900">
                    {PROJECT_2_CONNECTIONS.foundation.title} → 4 Core Tracks →{' '}
                    {PROJECT_2_CONNECTIONS.specialisation.title}
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                    {PROJECT_2_TRACKS.map((tr) => (
                      <div key={tr.number} className="rounded border border-slate-200 bg-white p-3">
                        <div className="font-mono text-xs font-semibold text-blue-700">{tr.number}</div>
                        <div className="mt-0.5 text-xs font-semibold text-slate-900">{tr.title}</div>
                        <p className="mt-1 text-[11px] text-slate-600">{tr.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PROJECT_2_SUBJECTS.map((subj) => (
                    <div key={subj.id} className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                      <div className="text-xs font-semibold text-slate-900">
                        {subj.number}. {subj.title}
                      </div>
                      <p className="text-[11px] text-slate-500">{subj.finalCompetency}</p>
                      <ul className="space-y-1.5 pt-1">
                        {subj.resources.map((res) => (
                          <li key={res.label} className="text-xs">
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
                              <span className="text-slate-700">{res.label}</span>
                            )}
                            {res.note && <p className="text-[11px] text-slate-500">{res.note}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {showProject('project-5') &&
            matchesSearch('Physics Mathematics Computational methods Foundation Intermediate Advanced') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-slate-500">
                      Job · Tutoring Service Scope
                    </div>
                    <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                      Interactive Subject Confidence Matrix (26 Topics) & 3 Teaching Levels
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Select only the topics you can teach confidently today before advertising on platforms.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setP5SubjectTab('all')}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                        p5SubjectTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                      }`}
                    >
                      All 3
                    </button>
                    {PROJECT_5_SERVICE_SCOPE.subjects.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setP5SubjectTab(sub.id)}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                          p5SubjectTab === sub.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {PROJECT_5_SERVICE_SCOPE.subjects
                    .filter((s) => p5SubjectTab === 'all' || s.id === p5SubjectTab)
                    .map((sub) => (
                      <div key={sub.id} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                        <div className="text-xs font-semibold text-slate-900">{sub.title}</div>
                        <ul className="space-y-1.5">
                          {sub.topics.map((topic) => {
                            const key = `${sub.id}:${topic}`;
                            const ready = Boolean(confidentTopics[key]);
                            return (
                              <li key={topic}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setConfidentTopics((prev) => ({
                                      ...prev,
                                      [key]: !prev[key],
                                    }))
                                  }
                                  className={`flex w-full items-center gap-2 rounded border px-2.5 py-1.5 text-left text-xs cursor-pointer ${
                                    ready
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900 font-medium'
                                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <span
                                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                                      ready
                                        ? 'border-emerald-600 bg-emerald-600 text-white'
                                        : 'border-slate-300 bg-white text-transparent'
                                    }`}
                                  >
                                    <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                                  </span>
                                  <span>{topic}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Level</th>
                        <th className="px-4 py-2 font-semibold">Intended Students</th>
                        <th className="px-4 py-2 font-semibold">Teaching Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {PROJECT_5_SERVICE_SCOPE.levels.map((lvl) => (
                        <tr key={lvl.level}>
                          <td className="px-4 py-2 font-semibold text-slate-900">{lvl.level}</td>
                          <td className="px-4 py-2 text-slate-700">{lvl.students}</td>
                          <td className="px-4 py-2 text-slate-600">{lvl.scope}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
        </div>
      )}

      {/* TAB 5: CAMPAIGN AUDITS & DECISIONS */}
      {category === 'audits' && (
        <div className="space-y-6">
          {showProject('project-4') &&
            matchesSearch('Workload audit 5 Mondays 70 emails IMPRS Durham Manchester UCL admissions') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    PhD · Campaign Strategy & Timing Audits
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Workload Audit (5 Mondays = 70 Emails) & 2027 vs 2028 Admissions Timing
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">{PROJECT_4_HEADER.overlapNote}</p>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="space-y-3">
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                          <tr>
                            <th className="px-3.5 py-2 font-semibold">Monday</th>
                            <th className="px-3.5 py-2 font-semibold">Date</th>
                            <th className="px-3.5 py-2 font-semibold">Target</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {PROJECT_4_WORKLOAD_AUDIT.table.map((r) => (
                            <tr key={r.monday} className={r.isTotal ? 'bg-slate-50 font-semibold' : ''}>
                              <td className="px-3.5 py-2 font-mono text-slate-900">{r.monday}</td>
                              <td className="px-3.5 py-2 text-slate-700">{r.date || '—'}</td>
                              <td className="px-3.5 py-2 font-mono text-slate-900 tabular-nums">{r.target}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <ol className="space-y-1 text-xs text-slate-700 rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
                      <li className="font-semibold text-slate-900 mb-1">Six Operating Principles:</li>
                      {PROJECT_4_WORKLOAD_AUDIT.principles.map((p, idx) => (
                        <li key={p}>
                          <span className="font-mono text-slate-400 mr-1.5">{idx + 1}.</span>
                          {p}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1 w-fit">
                      {[
                        { id: 'all', label: 'All Admissions' },
                        { id: 'closed', label: 'Closed 2026/27' },
                        { id: 'open', label: 'Open 2027' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setAdmissionsView(t.id as 'all' | 'closed' | 'open')}
                          className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer ${
                            admissionsView === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {(admissionsView === 'all' || admissionsView === 'closed') && (
                      <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 space-y-1.5 text-xs text-slate-700">
                        <div className="font-semibold text-slate-900">Closed 2026/27 examples:</div>
                        {PROJECT_4_ADMISSIONS_AUDIT.closedExamples.map((ex) => (
                          <p key={ex}>· {ex}</p>
                        ))}
                      </div>
                    )}

                    {(admissionsView === 'all' || admissionsView === 'open') && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-1.5 text-xs text-slate-700">
                        <div className="font-semibold text-emerald-900">Open 2027 opportunities:</div>
                        {PROJECT_4_ADMISSIONS_AUDIT.openExamples.map((ex) => (
                          <p key={ex}>· {ex}</p>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-slate-600">
                      {PROJECT_4_ADMISSIONS_AUDIT.recommendations.join(' + ')}.{' '}
                      {PROJECT_4_ADMISSIONS_AUDIT.closingNote}
                    </p>
                  </div>
                </div>
              </section>
            )}

          {showProject('project-4') &&
            matchesSearch('Tiered effort 52-105 hours Critical path non-blockers Open decisions') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    PhD · Effort Matrix, Critical Path & Decision Log
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    Tiered Effort Reality, Critical Path Audit & 3 Open Decisions
                  </h2>
                </div>

                {/* Tiered Effort */}
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Professor Category</th>
                        <th className="px-4 py-2 font-semibold">Research Effort</th>
                        <th className="px-4 py-2 font-semibold">Email Approach</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {PROJECT_4_EFFORT_REALITY.table.map((row) => (
                        <tr key={row.category}>
                          <td className="px-4 py-2 font-medium text-slate-900">{row.category}</td>
                          <td className="px-4 py-2 font-mono text-slate-700">{row.effort}</td>
                          <td className="px-4 py-2 text-slate-600">{row.approach}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Critical Path + Non-Blockers */}
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-slate-900">
                      7 Critical Path Checkpoints
                    </h3>
                    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                      {PROJECT_4_PRIORITY_AUDIT.criticalPath.map((cp) => {
                        const done = Boolean(completedIds[cp.id]);
                        return (
                          <li key={cp.id} className="flex items-start gap-2.5 px-3.5 py-2.5 bg-white">
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={done}
                              onClick={() => onToggleComplete(cp.id)}
                              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border cursor-pointer ${
                                done
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-slate-300 bg-white text-transparent'
                              }`}
                            >
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onToggleComplete(cp.id)}
                              className="text-left text-xs cursor-pointer"
                            >
                              <div className={`font-semibold ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {cp.title}
                                {cp.immediate && <span className="text-amber-800 ml-1">· Do immediately</span>}
                              </div>
                              <div className="text-slate-600">{cp.detail}</div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span>{PROJECT_4_PRIORITY_AUDIT.nonBlockersTitle}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {PROJECT_4_PRIORITY_AUDIT.nonBlockers.map((nb) => (
                        <li key={nb}>· {nb}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3 Interactive Decisions */}
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <div className="text-xs font-semibold text-slate-900">
                    Three Open Decisions (Interactive Preferences)
                  </div>
                  <div className="grid gap-3 lg:grid-cols-3">
                    {PROJECT_4_DECISIONS.questions.map((qItem) => {
                      const chosen = decisions[qItem.id];
                      return (
                        <div key={qItem.id} className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 space-y-2">
                          <div className="text-xs font-semibold text-slate-900">{qItem.label}</div>
                          <p className="text-xs text-slate-600">{qItem.question}</p>
                          <div className="flex flex-col gap-1.5">
                            {qItem.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setDecisions((prev) => ({ ...prev, [qItem.id]: opt }))
                                }
                                className={`rounded border px-2.5 py-1.5 text-left text-xs font-medium cursor-pointer ${
                                  chosen === opt
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    {PROJECT_4_DECISIONS.recommendation}
                  </p>
                </div>
              </section>
            )}

          {showProject('project-5') &&
            matchesSearch('Tutoring final recommendation Physics Mathematics Computational Methods') && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    Job · Strategic Recommendation
                  </div>
                  <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                    {PROJECT_5_RECOMMENDATION.title} & Core Distinction
                  </h2>
                </div>
                <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                  {PROJECT_5_RECOMMENDATION.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50/75 px-4 py-3 text-xs sm:text-sm text-slate-800">
                  {PROJECT_5_HEADER.distinctionNote}
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-900">
                  {PROJECT_5_RECOMMENDATION.closingGoal}
                </p>
              </section>
            )}
        </div>
      )}
    </div>
  );
}
