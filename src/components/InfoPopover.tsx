import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Info, X } from 'lucide-react';

interface InfoPopoverProps {
  label: string;
  title?: string;
  children: ReactNode;
  align?: 'left' | 'right';
  buttonText?: string;
}

export function InfoPopover({
  label,
  title,
  children,
  align = 'right',
  buttonText,
}: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={label}
        title={label}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ${
          open
            ? 'border-blue-300 bg-blue-50 text-blue-800'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Info className="h-3.5 w-3.5 shrink-0" />
        {buttonText && <span>{buttonText}</span>}
      </button>

      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-label={title ?? label}
          className={`absolute z-40 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-lg text-left ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
            <div className="text-xs font-semibold text-slate-900">{title ?? label}</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close contextual guide"
              className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-3 max-h-80 overflow-y-auto pr-1 text-xs leading-relaxed text-slate-700 space-y-2.5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
