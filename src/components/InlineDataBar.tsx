import React from 'react';

interface InlineDataBarProps {
  value: number; // 0 to 1 ratio or percentage
  maxValue?: number;
  label?: string;
  color?: string;
  showPercent?: boolean;
}

export const InlineDataBar: React.FC<InlineDataBarProps> = ({
  value,
  maxValue = 1,
  label,
  color = 'var(--color-accent)',
  showPercent = false,
}) => {
  const ratio = Math.max(0, Math.min(1, maxValue > 0 ? value / maxValue : 0));
  const percentText = `${(ratio * 100).toFixed(1)}%`;

  return (
    <div className="flex items-center gap-3 w-full min-w-[80px]">
      <div className="data-bar-bg flex-1">
        <div
          className="data-bar-fill transition-all duration-300"
          style={{
            width: `${ratio * 100}%`,
            backgroundColor: color !== 'var(--color-accent)' ? color : undefined,
          }}
        />
      </div>
      {showPercent && (
        <span className="text-[11px] font-bold text-[#051C2C] tabular-nums w-12 text-right">
          {percentText}
        </span>
      )}
      {label && !showPercent && (
        <span className="text-[11px] font-bold text-[#051C2C] tabular-nums">{label}</span>
      )}
    </div>
  );
};
