import type { EquationId } from '../data/projectData';

interface MathFormulaProps {
  id: EquationId;
  caption?: string;
}

export function MathFormula({ id, caption }: MathFormulaProps) {
  return (
    <div className="my-3 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
      <div className="flex items-center justify-center overflow-x-auto py-1 font-serif text-base sm:text-lg text-slate-900">
        {id === 'density-contrast' && (
          <div className="inline-flex items-center gap-2 whitespace-nowrap">
            <span>
              <span className="italic">δ</span>(<span className="font-semibold not-italic">x</span>)
            </span>
            <span>=</span>
            <div className="inline-flex flex-col items-center text-center leading-tight">
              <span className="border-b border-slate-700 px-2 pb-1">
                <span className="italic">ρ</span>(<span className="font-semibold not-italic">x</span>) −{' '}
                <span className="inline-block border-t border-slate-800 leading-none pt-0.5 italic">ρ</span>
              </span>
              <span className="pt-1">
                <span className="inline-block border-t border-slate-800 leading-none pt-0.5 italic">ρ</span>
              </span>
            </div>
          </div>
        )}

        {id === 'effective-radius' && (
          <div className="inline-flex items-center gap-2 whitespace-nowrap">
            <span>
              <span className="italic">R</span>
              <sub className="text-xs not-italic">eff</sub>
            </span>
            <span>=</span>
            <span className="inline-flex items-center">
              <span className="text-2xl font-light text-slate-700">(</span>
              <span className="inline-flex flex-col items-center text-center leading-tight mx-1">
                <span className="border-b border-slate-700 px-1.5 pb-0.5">
                  3<span className="italic">V</span>
                </span>
                <span className="pt-0.5">
                  4<span className="italic">π</span>
                </span>
              </span>
              <span className="text-2xl font-light text-slate-700">)</span>
              <sup className="text-xs -mt-4 ml-0.5">1/3</sup>
            </span>
          </div>
        )}

        {id === 'isw-effect' && (
          <div className="inline-flex items-center gap-2 whitespace-nowrap">
            <div className="inline-flex flex-col items-center text-center leading-tight">
              <span className="border-b border-slate-700 px-1.5 pb-0.5">
                Δ<span className="italic">T</span>
              </span>
              <span className="pt-0.5 italic">T</span>
            </div>
            <span>=</span>
            <div className="inline-flex flex-col items-center text-center leading-tight">
              <span className="border-b border-slate-700 px-1.5 pb-0.5">2</span>
              <span className="pt-0.5">
                <span className="italic">c</span>
                <sup className="text-xs">2</sup>
              </span>
            </div>
            <span className="text-2xl font-light text-slate-700 mx-0.5">∫</span>
            <div className="inline-flex flex-col items-center text-center leading-tight">
              <span className="border-b border-slate-700 px-1.5 pb-0.5">
                ∂<span className="italic">Φ</span>
              </span>
              <span className="pt-0.5">
                ∂<span className="italic">t</span>
              </span>
            </div>
            <span className="italic ml-1">dt</span>
          </div>
        )}

        {id === 'healpix-npix' && (
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span>
              <span className="italic">N</span>
              <sub className="text-xs not-italic">pix</sub>
            </span>
            <span>=</span>
            <span className="inline-flex items-center">
              <span>12</span>
              <span className="italic ml-1">N</span>
              <span className="inline-flex flex-col leading-none ml-0.5 text-left">
                <sup className="text-[11px] leading-none">2</sup>
                <sub className="text-[10px] not-italic leading-none mt-0.5">side</sub>
              </span>
            </span>
          </div>
        )}
      </div>
      {caption && <p className="mt-1.5 text-center text-xs text-slate-600">{caption}</p>}
    </div>
  );
}
