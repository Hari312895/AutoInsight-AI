import React from 'react';

interface InsightCardProps {
  id?: string;
  icon: React.ElementType;
  category: string;
  title: string;
  description: string;
  metricLabel?: string;
  metricValue?: string;
  accent?: 'cyan' | 'emerald' | 'blue' | 'amber';
}

const accentConfig = {
  cyan: {
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    tag: 'text-cyan-300 bg-cyan-950/60 border-cyan-500/40',
  },
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    tag: 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40',
  },
  blue: {
    border: 'border-blue-500/30 hover:border-blue-500/60',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    tag: 'text-blue-300 bg-blue-950/60 border-blue-500/40',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-500/60',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    tag: 'text-amber-300 bg-amber-950/60 border-amber-500/40',
  },
};

export const InsightCard: React.FC<InsightCardProps> = ({
  id,
  icon: Icon,
  category,
  title,
  description,
  metricLabel,
  metricValue,
  accent = 'cyan',
}) => {
  const styles = accentConfig[accent];

  return (
    <div
      id={id}
      className={`p-5 rounded-xl border ${styles.border} bg-[#0f172a]/70 hover:bg-[#111a33]/80 transition-all flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${styles.tag}`}
          >
            {category}
          </span>
          <div className={`p-1.5 rounded-lg border ${styles.iconBg}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>

        <h4 className="text-sm font-bold tracking-tight text-white mb-1.5">
          {title}
        </h4>
        <p className="text-xs leading-relaxed text-slate-400">
          {description}
        </p>
      </div>

      {metricLabel && metricValue && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-xs">
          <span className="text-slate-500">{metricLabel}</span>
          <span className="font-mono font-bold text-slate-200">{metricValue}</span>
        </div>
      )}
    </div>
  );
};
