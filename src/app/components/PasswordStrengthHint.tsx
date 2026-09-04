import { Info } from 'lucide-react';

import {
  assessPasswordStrength,
  PASSWORD_MAX_LENGTH,
  PASSWORD_RULES,
  type PasswordStrength,
} from '../lib/password-policy';

const strengthStyles: Record<
  PasswordStrength,
  { label: string; text: string; dot: string }
> = {
  weak: { label: 'Weak', text: 'text-red-600', dot: 'bg-red-500' },
  medium: { label: 'Medium', text: 'text-amber-600', dot: 'bg-amber-500' },
  strong: { label: 'Strong', text: 'text-emerald-600', dot: 'bg-emerald-500' },
};

type PasswordStrengthHintProps = {
  password: string;
  showRulesIcon?: boolean;
};

export function PasswordStrengthHint({
  password,
  showRulesIcon = true,
}: PasswordStrengthHintProps) {
  if (!password) return null;

  const { strength } = assessPasswordStrength(password);
  const style = strengthStyles[strength];

  return (
    <div className="mt-1.5 flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
        {style.label} password
      </span>

      {showRulesIcon ? (
        <div className="group relative">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Password requirements"
            className="rounded p-0.5 text-slate-400 transition hover:text-[#00a897] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a897]/40"
          >
            <Info className="size-3.5" />
          </button>
          <div
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-[11px] leading-relaxed text-slate-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <p className="mb-1 font-semibold text-slate-800">Password requirement</p>
            <ul className="list-disc space-y-0.5 pl-4">
              {PASSWORD_RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { PASSWORD_MAX_LENGTH };
