import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { authCompactInputClass } from './auth-ui';

export type AuthSelectOption = {
  label: string;
  value: string;
};

type AuthSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: AuthSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Custom select for onboarding/auth — brand hover (not OS blue square), chevron on the right.
 */
export function AuthSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Select',
  disabled = false,
  className = '',
}: AuthSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);
  const display = selected?.label || placeholder;

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (!disabled) setOpen((v) => !v);
        }}
        className={`${authCompactInputClass} flex items-center justify-between gap-2 pr-3 text-left ${
          open ? 'border-[#00a897] bg-white ring-2 ring-[#00a897]/15' : ''
        } ${!selected ? 'text-slate-400' : 'text-slate-900'}`}
      >
        <span className="min-w-0 flex-1 truncate">{display}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#00a897]' : ''
          }`}
          aria-hidden
        />
      </button>

      {open && !disabled ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-40 mt-1.5 max-h-52 overflow-auto rounded-xl border border-slate-200/90 bg-white p-1 shadow-[0_12px_28px_-10px_rgba(15,23,42,0.22)]"
        >
          {options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate-400">No options</li>
          ) : (
            options.map((opt) => {
              const active = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      active
                        ? 'bg-[#00a897] font-medium text-white'
                        : 'text-slate-800 hover:bg-teal-50 hover:text-teal-900'
                    }`}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
