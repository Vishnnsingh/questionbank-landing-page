import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { authInputClass } from './auth-ui';

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  compact?: boolean;
};

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  compact = false,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        className={`${authInputClass} pr-11 ${compact ? 'py-2.5' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[#00a897]"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
