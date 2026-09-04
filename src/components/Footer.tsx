import React from 'react';
import { ShieldCheck, HardDrive } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pb-12 pt-6 border-t border-[#E5E5E1] text-[11px] text-[#888888]">
      <div className="max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2251FF]" />
          <span>
            AssetLogic Pro • HOA Cost Allocation & Budget Engine
          </span>
        </div>
        <div className="footer-text py-0 text-center md:text-right">
          Privacy Note: All storage for this tool is managed via localStorage. No user data is retained on the server. Deployment powered by GitHub Actions.
        </div>
      </div>
    </footer>
  );
};
