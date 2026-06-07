import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../../images/logo.png';

type NavLink = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
};

type NavDropdown = {
  label: string;
  items: NavLink[];
};

const primaryNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

const boardDropdown: NavDropdown = {
  label: 'Board',
  items: [
    { label: 'CBSE', href: '/cbse-question-bank' },
    { label: 'Bihar Board', href: '/bihar-board-question-bank' },
  ],
};

const classDropdown: NavDropdown = {
  label: 'Class',
  items: [
    { label: 'Class 10', href: '/class-10-question-bank' },
    { label: 'Class 12', href: '/class-12-question-bank' },
  ],
};

const trailingNavItems: NavItem[] = [
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Support', href: '/support' },
];

const navDropdowns: NavDropdown[] = [boardDropdown, classDropdown];

const headerActionClass =
  'rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all hover:-translate-y-0.5 hover:bg-teal-700';

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

function isDropdownActive(dropdown: NavDropdown, currentPath: string) {
  return dropdown.items.some(
    (item) => normalizePath(item.href) === currentPath,
  );
}

function NavDropdownMenu({
  dropdown,
  variant,
  currentPath,
  openKey,
  onToggle,
  onNavigate,
}: {
  dropdown: NavDropdown;
  variant: 'drawer' | 'desktop';
  currentPath: string;
  openKey: string | null;
  onToggle: (key: string) => void;
  onNavigate?: () => void;
}) {
  const isOpen = openKey === dropdown.label;
  const isActive = isDropdownActive(dropdown, currentPath);

  if (variant === 'drawer') {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => onToggle(dropdown.label)}
          className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
            isActive
              ? 'bg-teal-50 text-teal-700'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
          }`}
        >
          {dropdown.label}
        </button>
        {isOpen ? (
          <div className="ml-4 space-y-1 border-l border-slate-200 pl-3">
            {dropdown.items.map((item) => {
              const itemPath = normalizePath(item.href);
              const itemActive = currentPath === itemPath;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    itemActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="group relative">
      <div
        className={`inline-flex cursor-default items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-all ${
          isActive
            ? 'bg-white text-teal-700 shadow-sm ring-1 ring-teal-100'
            : 'text-slate-600 group-hover:bg-white group-hover:text-slate-950 group-hover:shadow-sm'
        }`}
      >
        <span>{dropdown.label}</span>
      </div>
      <div className="invisible absolute left-0 top-full z-50 min-w-[180px] pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-lg">
          {dropdown.items.map((item) => {
            const itemPath = normalizePath(item.href);
            const itemActive = currentPath === itemPath;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                  itemActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NavLinks({
  onNavigate,
  variant = 'drawer',
}: {
  onNavigate?: () => void;
  variant?: 'drawer' | 'desktop';
}) {
  const currentPath = normalizePath(window.location.pathname);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const linkClass = (isActive: boolean) =>
    variant === 'desktop'
      ? `inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold transition-all ${
          isActive
            ? 'bg-white text-teal-700 shadow-sm ring-1 ring-teal-100'
            : 'text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm'
        }`
      : `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-teal-50 text-teal-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`;

  return (
    <nav className={variant === 'desktop' ? 'flex items-center gap-1' : 'space-y-2'}>
      {primaryNavItems.map((item) => {
        const itemPath = normalizePath(item.href);
        const isActive = currentPath === itemPath;

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={linkClass(isActive)}
          >
            {item.label}
          </a>
        );
      })}

      {navDropdowns.map((dropdown) => (
        <NavDropdownMenu
          key={dropdown.label}
          dropdown={dropdown}
          variant={variant}
          currentPath={currentPath}
          openKey={variant === 'drawer' ? openDropdown : null}
          onToggle={toggleDropdown}
          onNavigate={() => {
            setOpenDropdown(null);
            onNavigate?.();
          }}
        />
      ))}

      {trailingNavItems.map((item) => {
        const itemPath = normalizePath(item.href);
        const isActive = currentPath === itemPath;

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={linkClass(isActive)}
          >
            {item.label}
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
          <div className="hidden items-center gap-2 xl:flex">
            <a href="/signup" className={headerActionClass}>
              Register
            </a>
            <a href="/#pricing" className={headerActionClass}>
              Get App
            </a>
          </div>
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
