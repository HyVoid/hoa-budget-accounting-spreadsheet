import React from 'react';
import { Info } from 'lucide-react';

interface InsightBlockProps {
  title?: string;
  children: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const InsightBlock: React.FC<InsightBlockProps> = ({
  title,
  children,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`insight-box text-[13px] my-4 text-[#1A1A2E] rounded-r-[6px] ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          {title && (
            <div className="font-bold mb-1 uppercase text-[11px] tracking-wider text-[#051C2C]">
              {title}
            </div>
          )}
          <div className="text-gray-600 leading-relaxed text-[13px]">{children}</div>
        </div>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1 text-[11px] font-semibold text-[#2251FF] border border-[#2251FF] rounded-[4px] hover:bg-[#2251FF] hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
