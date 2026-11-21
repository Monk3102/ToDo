import { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SECTION_8_PROMPT_01, type PhaseData } from '../data/projectData';
import { InfoPopover } from './InfoPopover';
import type { KnowledgeCategory, KnowledgeProjectFilter } from './KnowledgeBaseView';
import { MathFormula } from './MathFormula';

interface PhaseCardProps {
  phase: PhaseData;
  completedIds: Record<string, boolean>;
  onToggleComplete: (id: string) => void;
  onSetManyComplete: (ids: string[], value: boolean) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  filterMode: 'all' | 'remaining' | 'completed';
  searchQuery: string;
  onOpenKnowledgeBase?: (cat: KnowledgeCategory, proj: KnowledgeProjectFilter) => void;
}

export function PhaseCard({
  phase,
  completedIds,
  onToggleComplete,
  onSetManyComplete,
  isExpanded,
  onToggleExpand,
  filterMode,
  searchQuery,
  onOpenKnowledgeBase,
}: PhaseCardProps) {
  const [copiedTreeId, setCopiedTreeId] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeSubBlockId, setActiveSubBlockId] = useState<string>('all');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const totalMaster = phase.masterTasks.length;
  const doneMaster = phase.masterTasks.filter((t) => Boolean(completedIds[t.id])).length;
  const allMasterDone = totalMaster > 0 && doneMaster === totalMaster;

  const allSubItemIds = phase.detailBlocks.flatMap((block) => [
    ...(block.items ?? []).map((i) => i.id),
    ...(block.orderedItems ?? []).map((i) => i.id),
  ]);
  const totalSubItems = allSubItemIds.length;
  const doneSubItems = allSubItemIds.filter((id) => Boolean(completedIds[id])).length;

  const phaseEquations = phase.detailBlocks.filter((b) => Boolean(b.equation));

  const visibleMasterTasks = phase.masterTasks.filter((task) => {
    const isDone = Boolean(completedIds[task.id]);

    if (filterMode === 'remaining' && isDone) return false;
    if (filterMode === 'completed' && !isDone) return false;

    if (normalizedQuery) {
      const inTask = task.text.toLowerCase().includes(normalizedQuery);
      const inPhaseTitle =
        phase.title.toLowerCase().includes(normalizedQuery) ||
        phase.number.toLowerCase().includes(normalizedQuery);
      const inDetails = phase.detailBlocks.some(
        (b) =>
          b.heading.toLowerCase().includes(normalizedQuery) ||
          b.items?.some((i) => i.text.toLowerCase().includes(normalizedQuery)) ||
          b.orderedItems?.some((i) => i.text.toLowerCase().includes(normalizedQuery))
      );
      if (!inTask && !inPhaseTitle && !inDetails) return false;
    }

    return true;
  });

  if (visibleMasterTasks.length === 0) {
    return null;
  }

  const handleCopyFolderTree = async (blockId: string, tree: string) => {
    try {
      await navigator.clipboard.writeText(tree);
      setCopiedTreeId(blockId);
      setTimeout(() => setCopiedTreeId(null), 1800);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const handleCopyPrompt01 = async () => {
    try {
      await navigator.clipboard.writeText(SECTION_8_PROMPT_01.promptText);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 1800);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const visibleDetailBlocks =
    activeSubBlockId === 'all'
      ? phase.detailBlocks
      : phase.detailBlocks.filter((b) => b.id === activeSubBlockId);

  return (
    <section
      id={phase.id}
      aria-labelledby={`${phase.id}-heading`}
      className={`rounded-xl border transition-colors ${
        allMasterDone ? 'border-emerald-200 bg-white' : 'border-slate-200 bg-white'
      }`}
    >
      {/* Phase Header */}
      <div className="px-5 pt-4 pb-3.5 sm:px-6 border-b border-slate-100">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
              <span className="font-mono text-slate-700">{phase.number}</span>
              <span aria-hidden="true">·</span>
              <span>{phase.duration}</span>
              {phase.isStartHere && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-blue-700">Start here</span>
                </>
              )}
              {phase.isCoreMilestone && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-blue-700">Core computational milestone</span>
                </>
              )}
            </div>
            <h3
              id={`${phase.id}-heading`}
              className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900"
            >
              {phase.title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="text-right">
              <span
                className={`font-mono text-sm font-semibold tabular-nums ${
                  allMasterDone ? 'text-emerald-700' : 'text-slate-900'
                }`}
              >
                {doneMaster}/{totalMaster}
              </span>
              <span className="ml-1.5 text-xs text-slate-500">tasks</span>
            </div>

            <InfoPopover
              label={`${phase.number} guide & completion condition`}
              title={`${phase.number} · ${phase.title}`}
            >
              {phase.detailIntro && (
                <p className="text-slate-800 font-medium">{phase.detailIntro}</p>
              )}

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5 text-emerald-950">
                <div className="font-semibold">Completion condition</div>
                <p className="mt-1">{phase.completionCondition}</p>
                {phase.completionChain && (
                  <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px] font-medium text-emerald-900">
                    {phase.completionChain.map((step, i) => (
                      <span key={step} className="inline-flex items-center gap-1">
                        <span>{step}</span>
                        {i < phase.completionChain!.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-emerald-700 shrink-0" />
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {phaseEquations.map((b) =>
                b.equation ? (
                  <div key={b.id}>
                    <MathFormula id={b.equation.id} caption={b.equation.caption} />
                  </div>
                ) : null
              )}

              {phase.detailReferences && phase.detailReferences.length > 0 && (
                <div className="space-y-1.5">
                  <div className="font-semibold text-slate-900">Catalogues & Maps</div>
                  {phase.detailReferences.map((ref) => (
                    <div
                      key={ref.label}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-2"
                    >
                      <div className="font-semibold text-slate-900">{ref.label}</div>
                      <div className="text-[11px] text-slate-600">{ref.title}</div>
                      {ref.note && <div className="mt-1 text-slate-700">{ref.note}</div>}
                    </div>
                  ))}
                </div>
              )}

              {phase.id === 'phase-00' && (
                <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-2.5 space-y-2">
                  <div className="font-semibold text-amber-950">Start with Prompt 01</div>
                  <p className="text-slate-700">
                    Before downloading datasets or writing Python, paste Prompt 01 into AI 1 to establish the scientific plan.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyPrompt01}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    <span>{copiedPrompt ? 'Copied Prompt 01' : 'Copy Prompt 01'}</span>
                  </button>
                </div>
              )}

              {onOpenKnowledgeBase && (
                <div className="pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenKnowledgeBase(
                        phase.id === 'phase-00' || phase.id === 'phase-09' ? 'schemas' : 'workflows',
                        'project-1'
                      )
                    }
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                  >
                    Open full Project 1 guides in Knowledge Base →
                  </button>
                </div>
              )}
            </InfoPopover>
          </div>
        </div>

        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full transition-all duration-200 ${
              allMasterDone ? 'bg-emerald-600' : 'bg-blue-600'
            }`}
            style={{ width: `${totalMaster > 0 ? (doneMaster / totalMaster) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Master Tasks List */}
      <ul className="divide-y divide-slate-100" role="list">
        {visibleMasterTasks.map((task) => {
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
        })}
      </ul>

      {/* Expandable Detailed Execution Instructions (Section 4) */}
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
            <span>{isExpanded ? 'Hide detailed execution guide' : 'Show detailed execution guide'}</span>
            <span className="font-mono font-normal text-slate-500 tabular-nums">
              · {doneSubItems}/{totalSubItems} sub-steps
            </span>
          </button>

          {allMasterDone && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Phase complete
            </span>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-5 border-t border-slate-200/70 pt-4 text-sm text-slate-700">
            {/* Interactive Sub-section Switcher + Bulk Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveSubBlockId('all')}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeSubBlockId === 'all'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({phase.detailBlocks.length})
                </button>
                {phase.detailBlocks.map((b) => {
                  const shortLabel = b.heading.split(' ')[0].replace('.', '');
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveSubBlockId(b.id)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        activeSubBlockId === b.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Part {shortLabel}
                    </button>
                  );
                })}
              </div>

              {totalSubItems > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onSetManyComplete(allSubItemIds, doneSubItems < totalSubItems)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {doneSubItems < totalSubItems ? 'Check all sub-steps' : 'Uncheck all sub-steps'}
                  </button>
                </div>
              )}
            </div>

            {phase.detailIntro && (
              <p className="text-sm font-medium text-slate-800 bg-slate-100/80 border border-slate-200 rounded-lg px-3.5 py-2.5">
                {phase.detailIntro}
              </p>
            )}

            {phase.detailReferences && phase.detailReferences.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {phase.detailReferences.map((ref) => (
                  <div key={ref.label} className="rounded-lg border border-slate-200 bg-white p-3.5">
                    <div className="text-xs font-semibold text-slate-900">{ref.label}</div>
                    <div className="mt-1 text-xs text-slate-500">{ref.title}</div>
                    {ref.note && <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">{ref.note}</p>}
                  </div>
                ))}
              </div>
            )}

            {visibleDetailBlocks.map((block) => (
              <div key={block.id} className="space-y-2.5 rounded-lg border border-slate-200/80 bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">{block.heading}</h4>

                {block.intro && <p className="text-xs text-slate-600">{block.intro}</p>}

                {block.items && block.items.length > 0 && (
                  <ul className="space-y-1.5" role="list">
                    {block.items.map((item) => {
                      const subDone = Boolean(completedIds[item.id]);
                      return (
                        <li key={item.id} className="flex items-start gap-2.5">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={subDone}
                            onClick={() => onToggleComplete(item.id)}
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
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
                            {item.numbered !== undefined && (
                              <span className="font-mono text-xs text-slate-500 mr-1.5">{item.numbered}.</span>
                            )}
                            {item.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {block.folderTree && (
                  <div className="rounded-lg border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-800 px-3.5 py-2 text-xs text-slate-400">
                      <span className="font-mono">Directory structure</span>
                      <button
                        type="button"
                        onClick={() => handleCopyFolderTree(block.id, block.folderTree!)}
                        className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>{copiedTreeId === block.id ? 'Copied' : 'Copy tree'}</span>
                      </button>
                    </div>
                    <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed text-slate-200">
                      {block.folderTree}
                    </pre>
                  </div>
                )}

                {block.orderedItems && block.orderedItems.length > 0 && (
                  <ul className="space-y-1.5" role="list">
                    {block.orderedItems.map((item) => {
                      const subDone = Boolean(completedIds[item.id]);
                      return (
                        <li key={item.id} className="flex items-start gap-2.5">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={subDone}
                            onClick={() => onToggleComplete(item.id)}
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
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

                {block.equation && <MathFormula id={block.equation.id} caption={block.equation.caption} />}

                {block.table && (
                  <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                        <tr>
                          {block.table.columns.map((col) => (
                            <th key={col} className="px-3.5 py-2 font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {block.table.rows.map((row, idx) => (
                          <tr key={idx}>
                            <td className="px-3.5 py-2 font-medium text-slate-900 whitespace-nowrap">{row[0]}</td>
                            <td className="px-3.5 py-2 text-slate-700">{row[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {block.note && (
                  <p className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-600 italic">
                    {block.note}
                  </p>
                )}

                {block.expectedOutcome && (
                  <p className="rounded-lg border border-blue-200/80 bg-blue-50/60 px-3.5 py-2 text-xs text-slate-800">
                    <span className="font-semibold text-blue-900">Expected outcome: </span>
                    {block.expectedOutcome}
                  </p>
                )}
              </div>
            ))}

            {/* Completion condition */}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-xs sm:text-sm text-emerald-950">
              <span className="font-semibold">Completion condition: </span>
              <span>{phase.completionCondition}</span>
              {phase.completionChain && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-emerald-900">
                  {phase.completionChain.map((step, i) => (
                    <span key={step} className="inline-flex items-center gap-1.5">
                      <span>{step}</span>
                      {i < phase.completionChain!.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
