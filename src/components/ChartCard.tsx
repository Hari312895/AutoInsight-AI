import React from 'react';

interface ChartCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  id,
  title,
  subtitle,
  badge,
  actions,
  children,
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`p-5 rounded-xl border border-slate-800/90 bg-[#0f172a]/70 hover:border-slate-700/80 transition-all flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold tracking-tight text-white">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="w-full flex-1 min-h-[260px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
