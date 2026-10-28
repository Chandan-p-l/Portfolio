import { Link } from 'react-router-dom';
import { sound } from '../utils/sound';
import { FitText } from './FitText';

export function Breadcrumbs({ crumbs }: { crumbs: [string, string][] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-tech text-[10px] sm:text-xs uppercase tracking-widest text-[#8A8A84]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" onClick={() => sound.playClick()} className="hover:text-[#FF2B2B] transition-colors">HOME</Link>
        </li>
        {crumbs.map(([name, to], i) => (
          <li key={to} className="flex items-center gap-2 min-w-0">
            <span className="text-[#FF2B2B]">//</span>
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-white line-clamp-1">{name}</span>
            ) : (
              <Link to={to} onClick={() => sound.playClick()} className="hover:text-[#FF2B2B] transition-colors">{name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Matches the editorial page heroes used across Work, Lab and Contact.
export function PageHeader({
  index,
  label,
  status,
  title,
  accent,
  intro,
  crumbs,
  children,
}: {
  index: string;
  label: string;
  status?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  intro?: string;
  crumbs?: [string, string][];
  children?: React.ReactNode;
}) {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-8 md:px-12 border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 font-tech text-xs text-[#8A8A84] border-b border-white/10 pb-4 mb-12">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[#FF2B2B] font-bold shrink-0">{index} //</span>
            {crumbs ? <Breadcrumbs crumbs={crumbs} /> : <span className="text-white">{label}</span>}
          </div>
          {status && <span className="text-emerald-400 font-bold shrink-0 hidden sm:inline">{status}</span>}
        </div>

        <FitText as="h1" text={`${typeof title === 'string' ? title : ''} ${typeof accent === 'string' ? accent : ''}`} max={8} className="font-display font-black uppercase tracking-tight leading-none text-white mb-6">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-[#FF2B2B]">{accent}</span>
            </>
          )}
        </FitText>

        {intro && <p className="font-sans text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
