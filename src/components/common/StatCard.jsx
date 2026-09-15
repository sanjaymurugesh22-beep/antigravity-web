import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  colorScheme = 'emerald', // 'emerald' | 'amber' | 'blue' | 'rose' | 'purple' | 'slate'
  onClick
}) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-700 text-white',
      trendBg: 'bg-emerald-50 text-emerald-700',
      border: 'hover:border-emerald-300'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      iconBg: 'bg-amber-600 text-white',
      trendBg: 'bg-amber-50 text-amber-700',
      border: 'hover:border-amber-300'
    },
    blue: {
      bg: 'bg-blue-50 text-blue-700 border-blue-100',
      iconBg: 'bg-blue-700 text-white',
      trendBg: 'bg-blue-50 text-blue-700',
      border: 'hover:border-blue-300'
    },
    rose: {
      bg: 'bg-rose-50 text-rose-700 border-rose-100',
      iconBg: 'bg-rose-600 text-white',
      trendBg: 'bg-rose-50 text-rose-700',
      border: 'hover:border-rose-300'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-700 border-purple-100',
      iconBg: 'bg-purple-700 text-white',
      trendBg: 'bg-purple-50 text-purple-700',
      border: 'hover:border-purple-300'
    },
    slate: {
      bg: 'bg-slate-50 text-slate-700 border-slate-100',
      iconBg: 'bg-slate-700 text-white',
      trendBg: 'bg-slate-50 text-slate-700',
      border: 'hover:border-slate-300'
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.emerald;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-elevation transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${scheme.border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="mt-1.5 text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </div>
        </div>
        <div className={`p-3 rounded-xl shadow-sm ${scheme.iconBg}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
        {trend && (
          <div className="flex items-center gap-1">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded font-semibold ${
                trendType === 'positive'
                  ? 'text-emerald-700 bg-emerald-50'
                  : trendType === 'negative'
                  ? 'text-rose-700 bg-rose-50'
                  : 'text-slate-600 bg-slate-100'
              }`}
            >
              {trendType === 'positive' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
              {trendType === 'negative' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend}
            </span>
            <span className="text-slate-400">vs last month</span>
          </div>
        )}
        {subtitle && !trend && (
          <span className="text-slate-500 font-medium">{subtitle}</span>
        )}
      </div>
    </div>
  );
};
