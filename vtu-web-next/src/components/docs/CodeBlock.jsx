'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CodeBlock = ({ title, badge, children, lang = 'JSON' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Ensure children is a string before copying
      const textToCopy = typeof children === 'string' ? children : String(children);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg my-4">
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-400">{title}</span>
        <div className="flex items-center gap-3">
          {badge && <span className={`text-[10px] font-mono ${badge === 'JSON' ? 'text-emerald-400' : 'text-slate-500'}`}>{badge}</span>}
          <button
            onClick={handleCopy}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
            title="Copy code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <pre className="p-4 font-mono text-[11px] text-slate-300 overflow-x-auto leading-5 whitespace-pre">
        {children}
      </pre>
    </div>
  );
};
