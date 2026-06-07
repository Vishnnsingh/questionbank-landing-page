import { BookOpen, Home, Info, LifeBuoy, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../../images/logo.png';

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

function NavLinks({ onNavigate, variant = 'drawer' }: { onNavigate?: () => void; variant?: 'drawer' | 'desktop' }) {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  return (
    <nav className={variant === 'desktop' ? 'flex items-center gap-1' : 'space-y-2'}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const itemPath = item.href.replace(/\/$/, '') || '/';
        const isActive = currentPath === itemPath;

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={
              variant === 'desktop'
                ? `inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-teal-700 shadow-sm ring-1 ring-teal-100'
                      : 'text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm'
                  }`
                : `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`
            }
          >
            <Icon className={variant === 'desktop' ? 'size-4' : 'size-5'} />
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
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex min-w-0 items-center gap-3 text-slate-950">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden">
              <img src={logoImage} alt="Honhaar logo" className="h-[220%] w-[220%] max-w-none object-contain" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-normal">Honhaar</span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 sm:block">
                Smart Prep
              </span>
            </span>
          </a>
          <div className="hidden rounded-full border border-slate-200 bg-slate-50/90 p-1 shadow-inner lg:block">
            <NavLinks variant="desktop" />
          </div>
          <a
            href="/#pricing"
            className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all hover:-translate-y-0.5 hover:bg-teal-700 xl:inline-flex"
          >
            Get App
          </a>
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

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
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden">
                  <img src={logoImage} alt="Honhaar logo" className="h-[220%] w-[220%] max-w-none object-contain" />
                </span>
                <span className="text-lg font-semibold">Smart Prep</span>
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
