import React from 'react';

interface StatusBadgeProps {
  label: string;
  variant?: 'neutral' | 'accent' | 'negative' | 'positive';
  icon?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  icon,
}) => {
  let styleClasses = 'bg-[#F0F0EE] text-[#051C2C]';

  if (variant === 'accent') {
    styleClasses = 'bg-[rgba(34,81,255,0.08)] text-[#2251FF]';
  } else if (variant === 'negative') {
    styleClasses = 'pill-red';
  } else if (variant === 'positive') {
    styleClasses = 'pill-green';
  }

  return (
    <span
      className={`pill inline-flex items-center gap-1.5 uppercase tracking-wider whitespace-nowrap ${styleClasses}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
};
