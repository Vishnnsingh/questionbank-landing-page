import { FormEvent, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

import { fetchSignupBoards, registerUser } from '../api/auth-api';
import { savePendingLoginEmail } from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authInputClass,
} from './auth-ui';
import { PasswordInput } from './PasswordInput';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const CLASS_OPTIONS = [
  { label: 'Class 10', value: '10' },
  { label: 'Class 12', value: '12' },
];

const STREAM_OPTIONS = [
  { label: 'Science', value: 'science' },
  { label: 'Arts', value: 'arts' },
  { label: 'Commerce', value: 'commerce' },
  { label: 'Vocational', value: 'vocational' },
];

const labelClass = 'mb-1 block text-xs font-semibold text-slate-800';
const signupInputClass = `${authInputClass} py-2.5`;

function formatIndianMobileInput(text: string) {
  let digits = String(text || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length > 10) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [boardOptions, setBoardOptions] = useState<string[]>([]);
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const isSeniorClass = selectedClass === '12';

  useEffect(() => {
    let cancelled = false;
    fetchSignupBoards()
      .then((boards) => {
        if (cancelled || !boards.length) return;
        setBoardOptions(boards);
        setSelectedBoard((prev) => prev || boards[0] || '');
      })
      .catch(() => {
        if (!cancelled) {
          setBoardOptions(['CBSE', 'BBSE']);
          setSelectedBoard((prev) => prev || 'CBSE');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setError('');

    const trimmedName = fullName.trim();
    const trimmedMobile = mobileNumber.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedState = stateName.trim();
    const trimmedCity = city.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedName || !trimmedMobile || !normalizedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError('Please complete all required fields.');
      return;
    }
    if (trimmedName.length < 2 || trimmedName.length > 120) {
      setError('Full name must be between 2 and 120 characters.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!selectedClass) {
      setError('Please select your class.');
      return;
    }
    if (isSeniorClass && !selectedStream) {
      setError('Please select a stream for Class 12.');
      return;
    }
    if (!selectedBoard.trim()) {
      setError('Please select your board.');
      return;
    }
    if (trimmedState.length < 2 || trimmedCity.length < 2) {
      setError('Please enter valid state and city.');
      return;
    }
    if (trimmedPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setIsSaving(true);
    try {
      await registerUser({
        full_name: trimmedName,
        mobile_number: trimmedMobile,
        email: normalizedEmail,
        class: selectedClass,
        board: selectedBoard.trim(),
        stream: isSeniorClass ? selectedStream : '',
        state: trimmedState,
        city: trimmedCity,
        password: trimmedPassword,
        confirm_password: trimmedConfirmPassword,
        role: 'student',
      });

      savePendingLoginEmail(normalizedEmail);
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="signup" />
      <SideNav />

      <main className="relative px-4 pb-10 sm:px-6 sm:pb-12 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)]">
            <div className="h-1.5 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
                    <Sparkles className="size-3.5 text-[#00a897]" />
                    Sign up
                  </div>
                  <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Create account
                  </h1>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Register once and continue on the Honhaar app on Play Store.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="sm:col-span-2 xl:col-span-3">
                      <label className={labelClass} htmlFor="full_name">
                        Full name
                      </label>
                      <input
                        id="full_name"
                        className={signupInputClass}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="mobile_number">
                        Mobile
                      </label>
                      <div className="flex overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/60 focus-within:border-[#00a897] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00a897]/15">
                        <span className="flex items-center border-r border-slate-200/90 px-2.5 text-xs font-medium text-slate-600">
                          +91
                        </span>
                        <input
                          id="mobile_number"
                          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(formatIndianMobileInput(e.target.value))}
                          placeholder="9876543210"
                          inputMode="numeric"
                          maxLength={10}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={signupInputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="class">
                        Class
                      </label>
                      <select
                        id="class"
                        className={signupInputClass}
                        value={selectedClass}
                        onChange={(e) => {
                          setSelectedClass(e.target.value);
                          if (e.target.value !== '12') setSelectedStream('');
                        }}
                      >
                        <option value="">Select</option>
                        {CLASS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="board">
                        Board
                      </label>
                      <select
                        id="board"
                        className={signupInputClass}
                        value={selectedBoard}
                        onChange={(e) => setSelectedBoard(e.target.value)}
                      >
                        <option value="">Select</option>
                        {boardOptions.map((board) => (
                          <option key={board} value={board}>
                            {board}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isSeniorClass ? (
                      <div>
                        <label className={labelClass} htmlFor="stream">
                          Stream
                        </label>
                        <select
                          id="stream"
                          className={signupInputClass}
                          value={selectedStream}
                          onChange={(e) => setSelectedStream(e.target.value)}
                        >
                          <option value="">Select</option>
                          {STREAM_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}

                    <div>
                      <label className={labelClass} htmlFor="state">
                        State
                      </label>
                      <input
                        id="state"
                        className={signupInputClass}
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="Bihar"
                        autoComplete="address-level1"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="city">
                        City
                      </label>
                      <input
                        id="city"
                        className={signupInputClass}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Patna"
                        autoComplete="address-level2"
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="password">
                        Password
                      </label>
                      <PasswordInput
                        id="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Min 8 characters"
                        autoComplete="new-password"
                        compact
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="confirm_password">
                        Confirm password
                      </label>
                      <PasswordInput
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        compact
                      />
                    </div>
                  </div>

                  <AuthPrimaryButton loading={isSaving} loadingText="Creating account…">
                    Create account
                  </AuthPrimaryButton>

                  <AuthFooterLink
                    text="Already have an account?"
                    linkText="Login for payment"
                    href="/login"
                  />
                </form>
              </div>

              <div className="hidden lg:block">
                <AuthLoginVisualPanel embedded />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
