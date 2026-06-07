import { BookOpen, Home, Info, LifeBuoy, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'CBSE', href: '/cbse-question-bank', icon: BookOpen },
  { label: 'Bihar Board', href: '/bihar-board-question-bank', icon: BookOpen },
  { label: 'Class 10', href: '/class-10-question-bank', icon: BookOpen },
  { label: 'Class 12', href: '/class-12-question-bank', icon: BookOpen },
  { label: 'Contact Us', href: '/contact-us', icon: Mail },
  { label: 'Support', href: '/support', icon: LifeBuoy },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const itemPath = item.href.replace(/\/$/, '') || '/';
        const isActive = currentPath === itemPath;

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-teal-50 text-teal-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function SideNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-slate-950">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white">
              <BookOpen className="size-5" />
            </span>
            <span className="text-base font-semibold">Honhaar</span>
          </a>
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 shadow-sm lg:block">
        <a href="/" className="mb-10 flex items-center gap-3 px-2 text-slate-950">
          <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white">
            <BookOpen className="size-6" />
          </span>
          <span className="text-lg font-semibold leading-tight">Honhaar</span>
        </a>
        <NavLinks />
      </aside>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-[min(86vw,320px)] bg-white px-4 py-5 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 text-slate-950">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                  <BookOpen className="size-5" />
                </span>
                <span className="text-base font-semibold">Smart Prep</span>
              </a>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
