import React from 'react';

interface KPICardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'cyan' | 'emerald' | 'blue' | 'purple' | 'amber';
  icon: React.ElementType;
  trendText?: string;
  isPositive?: boolean;
}

const colorStyles = {
  cyan: {
    iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    badge: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    badge: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
  },
  blue: {
    iconBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    badge: 'bg-blue-950/60 border-blue-500/40 text-blue-300',
  },
  purple: {
    iconBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    badge: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
  },
  amber: {
    iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    badge: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
  },
};

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  subtitle,
  badge,
  badgeColor = 'cyan',
  icon: Icon,
  trendText,
  isPositive = true,
}) => {
  const styles = colorStyles[badgeColor];

  return (
    <div
      id={id}
      className="p-5 rounded-xl border border-slate-800/90 bg-[#0f172a]/70 hover:bg-[#111c35]/80 hover:border-slate-700/80 transition-all duration-200 group relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-full pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {value}
            </h3>
          </div>
        </div>

        <div className={`p-2.5 rounded-lg border ${styles.iconBg} transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Footer Info / Badge */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/60 text-xs">
        {subtitle && (
          <span className="text-slate-400 font-normal truncate max-w-[150px]">
            {subtitle}
          </span>
        )}
        
        {badge && (
          <span
            className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase rounded border ${styles.badge}`}
          >
            {badge}
          </span>
        )}

        {trendText && (
          <span
            className={`font-mono text-[11px] font-medium flex items-center gap-1 ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            <span>{isPositive ? '↑' : '↓'}</span>
            <span>{trendText}</span>
          </span>
        )}
      </div>
    </div>
  );
};
