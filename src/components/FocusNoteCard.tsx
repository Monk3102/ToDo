import { useEffect, useState } from 'react';
import { Lightbulb, RefreshCw, X } from 'lucide-react';
import { FOCUS_NOTES_BY_PROJECT } from '../data/focusNotesData';

type ProjectId = keyof typeof FOCUS_NOTES_BY_PROJECT;

const STORAGE_HIDDEN_NOTES_KEY = 'research_todo_hidden_notes_v1';

function getHiddenMap(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_HIDDEN_NOTES_KEY);
    if (raw) return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    // Ignore storage errors
  }
  return {};
}

interface FocusNoteCardProps {
  projectId: ProjectId;
  forceShow?: boolean;
  onOpenKnowledgeBase?: () => void;
}

export function FocusNoteCard({
  projectId,
  forceShow = false,
  onOpenKnowledgeBase,
}: FocusNoteCardProps) {
  const notes = FOCUS_NOTES_BY_PROJECT[projectId] ?? [];
  const [index, setIndex] = useState(0);
  const [hiddenMap, setHiddenMap] = useState<Record<string, boolean>>(getHiddenMap);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_HIDDEN_NOTES_KEY, JSON.stringify(hiddenMap));
    } catch {
      // Ignore storage errors
    }
  }, [hiddenMap]);

  if (notes.length === 0) return null;

  const isHidden = Boolean(hiddenMap[projectId]) && !forceShow;
  const activeNote = notes[index % notes.length];

  if (isHidden) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span>Focus notes hidden for this project.</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHiddenMap((prev) => ({ ...prev, [projectId]: false }))}
            className="font-semibold text-blue-700 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1"
          >
            Show note
          </button>
          {onOpenKnowledgeBase && (
            <button
              type="button"
              onClick={onOpenKnowledgeBase}
              className="font-semibold text-slate-700 hover:text-slate-950 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1"
            >
              Knowledge Base
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="Focus note"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-700">
          <Lightbulb className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 text-xs sm:text-sm leading-relaxed text-slate-700">
          <span className="font-semibold text-slate-900">Focus Note · {activeNote.label}: </span>
          <span>{activeNote.text}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        {notes.length > 1 && (
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % notes.length)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <RefreshCw className="h-3 w-3" />
            <span>
              Next ({(index % notes.length) + 1}/{notes.length})
            </span>
          </button>
        )}

        {onOpenKnowledgeBase && (
          <button
            type="button"
            onClick={onOpenKnowledgeBase}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Deep-Dive Guide
          </button>
        )}

        {!forceShow && (
          <button
            type="button"
            onClick={() => setHiddenMap((prev) => ({ ...prev, [projectId]: true }))}
            aria-label="Hide focus notes"
            title="Hide focus notes"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
}
