import { Loader2, LogOut, Menu, UserCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { hasPaymentAuthSession, performPaymentLogout } from '../lib/auth-session';
import { readPaymentUserContext } from '../lib/signup-context';

const headerLogoSrc = '/Logo.png';
const headerLogoClass = 'h-full w-full object-contain object-left';

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
];

const navDropdowns: NavDropdown[] = [boardDropdown, classDropdown];

const headerActionClass =
  'inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm';
const headerActionStyle = { backgroundColor: '#0A121D' } as const;

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
    <div className="group relative shrink-0">
      <div
        className={`inline-flex max-h-9 cursor-default items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors xl:px-3 xl:py-1.5 xl:text-sm ${
          isActive
            ? 'bg-white text-teal-700 ring-1 ring-teal-100'
            : 'text-slate-600 group-hover:bg-white group-hover:text-slate-950'
        }`}
      >
        <span>{dropdown.label}</span>
      </div>
      <div className="pointer-events-none invisible absolute left-0 top-[calc(100%+0.125rem)] z-[120] min-w-[180px] opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
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
      ? `inline-flex max-h-9 items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors xl:px-3 xl:py-1.5 xl:text-sm ${
          isActive
            ? 'bg-white text-teal-700 ring-1 ring-teal-100'
            : 'text-slate-600 hover:bg-white hover:text-slate-950'
        }`
      : `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-teal-50 text-teal-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`;

  return (
    <nav className={variant === 'desktop' ? 'flex max-h-10 items-center gap-0.5 xl:gap-1' : 'space-y-2'}>
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

function HeaderProfileMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = readPaymentUserContext();
  const firstName = user?.fullName?.split(' ')[0] || 'Account';

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    onNavigate?.();
    await performPaymentLogout();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 sm:size-10"
      >
        <UserCircle className="size-5 sm:size-[1.35rem]" />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[130] min-w-[200px] overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-lg">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-950">{firstName}</p>
            {user?.email ? (
              <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
            ) : null}
          </div>
          <button
            type="button"
            disabled={loggingOut}
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-70"
          >
            {loggingOut ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

function HeaderActions({
  loggedIn,
  onNavigate,
  className = '',
  stacked = false,
  showProfile = false,
}: {
  loggedIn: boolean;
  onNavigate?: () => void;
  className?: string;
  stacked?: boolean;
  showProfile?: boolean;
}) {
  const actionClass = stacked
    ? `${headerActionClass} w-full text-center`
    : headerActionClass;

  if (loggedIn) {
    return (
      <div className={`flex items-center gap-2 ${stacked ? 'flex-col' : ''} ${className}`}>
        <a href="/share-application" onClick={onNavigate} className={actionClass} style={headerActionStyle}>
          Share Application
        </a>
        <a href="/choose-plan" onClick={onNavigate} className={actionClass} style={headerActionStyle}>
          Choose Plan
        </a>
        {showProfile ? <HeaderProfileMenu onNavigate={onNavigate} /> : null}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${stacked ? 'flex-col' : ''} ${className}`}>
      <a href="/signup" onClick={onNavigate} className={actionClass} style={headerActionStyle}>
        Register
      </a>
      <a href="/#pricing" onClick={onNavigate} className={actionClass} style={headerActionStyle}>
        Get App
      </a>
    </div>
  );
}

export function SideNav() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(hasPaymentAuthSession());
  }, []);

  const headerBar = (
    <header className="site-header fixed inset-x-0 top-0 z-[100] overflow-visible border-b border-slate-200 bg-white">
      <div className="site-header-inner mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3">
        <a href="/" className="flex h-full min-w-0 shrink-0 items-center py-1.5">
          <span className="flex h-11 w-auto max-w-[220px] items-center sm:h-12 sm:max-w-[260px]">
            <img src={headerLogoSrc} alt="Prepmagic" className={headerLogoClass} />
          </span>
        </a>
        <div className="hidden min-w-0 shrink-0 overflow-visible lg:block">
          <div className="rounded-full border border-slate-200 bg-slate-50/90 p-0.5">
            <NavLinks variant="desktop" />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <HeaderActions loggedIn={loggedIn} showProfile className="hidden lg:flex" />
          {loggedIn ? (
            <div className="lg:hidden">
              <HeaderProfileMenu />
            </div>
          ) : null}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );

  const mobileDrawer = open ? (
    <div className="fixed inset-0 z-[110] lg:hidden">
      <button
        type="button"
        aria-label="Close navigation overlay"
        className="absolute inset-0 bg-slate-950/50"
        onClick={() => setOpen(false)}
      />
      <aside className="relative flex h-full w-[min(86vw,320px)] flex-col overflow-y-auto bg-white px-4 py-5 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <span className="flex h-12 w-auto max-w-[200px] items-center">
              <img src={headerLogoSrc} alt="Prepmagic" className={headerLogoClass} />
            </span>
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
        <div className="flex-1">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
        <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-6">
          <HeaderActions
            loggedIn={loggedIn}
            onNavigate={() => setOpen(false)}
            stacked
            className="gap-2"
          />
          {loggedIn ? (
            <button
              type="button"
              onClick={() => void performPaymentLogout()}
              className={`${headerActionClass} w-full text-center`}
              style={headerActionStyle}
            >
              Logout
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <>
      {typeof document !== 'undefined' ? createPortal(headerBar, document.body) : headerBar}
      <div aria-hidden="true" className="site-header-spacer" />
      {typeof document !== 'undefined' && mobileDrawer
        ? createPortal(mobileDrawer, document.body)
        : mobileDrawer}
    </>
  );
}
