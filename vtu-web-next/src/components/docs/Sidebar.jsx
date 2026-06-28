'use client';

import { useEffect, useState } from 'react';

const SideLink = ({ href, children, isNew, activeId }) => {
  const id = href.replace('#', '');
  const isActive = activeId === id;
  
  return (
    <a 
      href={href} 
      className={`group flex items-center gap-2 py-1.5 text-sm transition-all ${
        isActive 
          ? 'text-blue-400 font-medium translate-x-1' 
          : 'text-slate-400 hover:text-blue-400 hover:translate-x-1'
      }`}
    >
      <span>{children}</span>
      {isNew && <span className="text-[9px] font-bold bg-violet-500/15 text-violet-400 px-1.5 py-0.5 rounded-full">New</span>}
    </a>
  );
};

export const Sidebar = ({ sections }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const elements = document.querySelectorAll('section[id]');
    elements.forEach((elem) => observer.observe(elem));

    // Also check initial hash
    if (window.location.hash) {
      setActiveId(window.location.hash.substring(1));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block space-y-8 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-4 scrollbar-hide">
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            {section.title}
          </h3>
          <div className="space-y-1 border-l-2 border-slate-800/60 pl-3">
            {section.links.map((link, linkIndex) => (
              <SideLink 
                key={linkIndex} 
                href={link.href} 
                isNew={link.isNew} 
                activeId={activeId}
              >
                {link.label}
              </SideLink>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};
