import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

import {
  completeUserOnboarding,
  fetchSignupBoards,
  fetchSignupClasses,
  fetchSignupDistricts,
  fetchSignupStates,
  fetchSignupStreams,
} from '../api/auth-api';
import {
  clearPendingOnboardCredentials,
  readPendingOnboardCredentials,
  savePendingLoginEmail,
  savePendingOnboardCredentials,
} from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
} from './auth-ui';
import { PasswordInput } from './PasswordInput';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const labelClass = 'mb-1 block text-xs font-semibold text-slate-800';
const signupInputClass =
  'w-full rounded-xl border-0 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00a897]/15';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
] as const;

const MEDIUM_OPTIONS = [
  { label: 'Hindi', value: 'Hindi' },
  { label: 'English', value: 'English' },
] as const;

const STREAM_LABELS: Record<string, string> = {
  science: 'Science',
  arts: 'Arts',
  commerce: 'Commerce',
  vocational: 'Vocational',
};

const FALLBACK_CLASSES = ['9', '10', '11', '12'];
const FALLBACK_STREAMS = ['science', 'arts', 'commerce', 'vocational'];

function classLabel(value: string) {
  const v = String(value || '').trim();
  if (!v) return '';
  return v.toLowerCase().startsWith('class') ? v : `Class ${v}`;
}

function needsStream(classValue: string) {
  return classValue === '11' || classValue === '12';
}

export function OnboardingPage() {
  const pending = readPendingOnboardCredentials();
  const emailFromQuery = new URLSearchParams(window.location.search).get('email') || '';
  const initialEmail = (pending?.email || emailFromQuery).trim().toLowerCase();

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(pending?.password || '');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [city, setCity] = useState('');

  const [classOptions, setClassOptions] = useState<string[]>(FALLBACK_CLASSES);
  const [streamOptions, setStreamOptions] = useState<string[]>([]);
  const [boardOptions, setBoardOptions] = useState<string[]>([]);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  const [bootLoading, setBootLoading] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const showPasswordField = !pending?.password;
  const isSenior = needsStream(selectedClass);

  const streamSelectOptions = useMemo(
    () =>
      (streamOptions.length ? streamOptions : FALLBACK_STREAMS).map((value) => ({
        value,
        label: STREAM_LABELS[value] || value,
      })),
    [streamOptions],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBootLoading(true);
      try {
        const [classes, boards, states] = await Promise.all([
          fetchSignupClasses().catch(() => FALLBACK_CLASSES),
          fetchSignupBoards().catch(() => ['CBSE', 'BBSE']),
          fetchSignupStates().catch(() => []),
        ]);
        if (cancelled) return;
        setClassOptions(classes.length ? classes : FALLBACK_CLASSES);
        setBoardOptions(boards);
        setStateOptions(states);
        setSelectedBoard((prev) => prev || boards[0] || '');
      } finally {
        if (!cancelled) setBootLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isSenior) {
      setSelectedStream('');
      setStreamOptions([]);
      return;
    }
    let cancelled = false;
    fetchSignupStreams(selectedClass)
      .then((streams) => {
        if (!cancelled) setStreamOptions(streams.length ? streams : FALLBACK_STREAMS);
      })
      .catch(() => {
        if (!cancelled) setStreamOptions(FALLBACK_STREAMS);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedClass, isSenior]);

  useEffect(() => {
    if (!selectedState) {
      setDistrictOptions([]);
      setSelectedDistrict('');
      return;
    }
    let cancelled = false;
    setLoadingDistricts(true);
    setSelectedDistrict('');
    fetchSignupDistricts(selectedState)
      .then((districts) => {
        if (!cancelled) setDistrictOptions(districts);
      })
      .catch(() => {
        if (!cancelled) setDistrictOptions([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingDistricts(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedState]);

  const canSubmit =
    Boolean(termsAccepted && privacyAccepted) && !isSaving && !bootLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedCity = city.trim();

    if (!normalizedEmail || !trimmedPassword) {
      setError('Email and password are required to complete onboarding.');
      return;
    }
    if (!selectedGender) {
      setError('Please select your gender.');
      return;
    }
    if (!selectedMedium) {
      setError('Please choose your study medium (Hindi or English).');
      return;
    }
    if (!selectedClass) {
      setError('Please select your class.');
      return;
    }
    if (isSenior && !selectedStream) {
      setError('Please select a stream for Class 11 / 12.');
      return;
    }
    if (!selectedBoard.trim()) {
      setError('Please select your board.');
      return;
    }
    if (!selectedState.trim()) {
      setError('Please select your state.');
      return;
    }
    if (!selectedDistrict.trim() || selectedDistrict.includes('[object Object]')) {
      setError('Please select your district.');
      return;
    }
    if (trimmedCity.length < 2) {
      setError('Please enter a valid city.');
      return;
    }
    if (!termsAccepted) {
      setError('Please agree to the Terms & Conditions to continue.');
      return;
    }
    if (!privacyAccepted) {
      setError('Please confirm you have read the Privacy Policy to continue.');
      return;
    }

    setIsSaving(true);
    try {
      await completeUserOnboarding({
        email: normalizedEmail,
        password: trimmedPassword,
        gender: selectedGender as 'male' | 'female' | 'other',
        class: selectedClass,
        stream: isSenior ? selectedStream : '',
        board: selectedBoard.trim(),
        state: selectedState.trim(),
        district: selectedDistrict.trim(),
        city: trimmedCity,
        preferred_medium: selectedMedium,
      });

      clearPendingOnboardCredentials();
      savePendingLoginEmail(normalizedEmail);
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onboarding failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="onboarding" />
      <SideNav />

      <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto my-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)]">
            <div className="h-1.5 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
                    <Sparkles className="size-3.5 text-[#00a897]" />
                    Step 2 of 2
                  </div>
                  <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Onboarding
                  </h1>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Tell us your class, board, medium and location to finish setup.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}
                  {bootLoading ? (
                    <p className="text-sm text-slate-500">Loading options…</p>
                  ) : null}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {!pending?.email ? (
                      <div className="sm:col-span-2 xl:col-span-3">
                        <label className={labelClass} htmlFor="onboard_email">
                          Email
                        </label>
                        <input
                          id="onboard_email"
                          type="email"
                          className={signupInputClass}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    ) : (
                      <div className="sm:col-span-2 xl:col-span-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        Account: <span className="font-semibold">{email}</span>
                      </div>
                    )}

                    {showPasswordField ? (
                      <div className="sm:col-span-2 xl:col-span-3">
                        <label className={labelClass} htmlFor="onboard_password">
                          Password
                        </label>
                        <PasswordInput
                          id="onboard_password"
                          value={password}
                          onChange={(value) => {
                            setPassword(value);
                            if (email) {
                              savePendingOnboardCredentials({ email, password: value });
                            }
                          }}
                          placeholder="Account password"
                          autoComplete="current-password"
                          compact
                        />
                      </div>
                    ) : null}

                    <div>
                      <label className={labelClass} htmlFor="gender">
                        Gender
                      </label>
                      <select
                        id="gender"
                        className={signupInputClass}
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                      >
                        <option value="">Select</option>
                        {GENDER_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="medium">
                        Choose Medium
                      </label>
                      <select
                        id="medium"
                        className={signupInputClass}
                        value={selectedMedium}
                        onChange={(e) =>
                          setSelectedMedium(e.target.value as 'Hindi' | 'English' | '')
                        }
                      >
                        <option value="">Select medium</option>
                        {MEDIUM_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="class">
                        Class
                      </label>
                      <select
                        id="class"
                        className={signupInputClass}
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                      >
                        <option value="">Select</option>
                        {classOptions.map((value) => (
                          <option key={value} value={value}>
                            {classLabel(value)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isSenior ? (
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
                          {streamSelectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}

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

                    <div>
                      <label className={labelClass} htmlFor="state">
                        State
                      </label>
                      {stateOptions.length ? (
                        <select
                          id="state"
                          className={signupInputClass}
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                        >
                          <option value="">Select</option>
                          {stateOptions.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id="state"
                          className={signupInputClass}
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          placeholder="Bihar"
                          autoComplete="address-level1"
                        />
                      )}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="district">
                        District
                      </label>
                      {districtOptions.length || loadingDistricts ? (
                        <select
                          id="district"
                          className={signupInputClass}
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          disabled={loadingDistricts || !selectedState}
                        >
                          <option value="">
                            {loadingDistricts ? 'Loading…' : 'Select'}
                          </option>
                          {districtOptions.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id="district"
                          className={signupInputClass}
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          placeholder="Patna"
                          disabled={!selectedState}
                        />
                      )}
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
                  </div>

                  <div className="flex flex-col items-center gap-2.5 px-3 py-3">
                    <div className="flex items-center justify-center gap-2.5 text-sm text-slate-700">
                      <input
                        id="terms_accept"
                        type="checkbox"
                        className="size-4 shrink-0 accent-[#00a897]"
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          setError('');
                        }}
                      />
                      <p className="leading-relaxed text-center">
                        <label htmlFor="terms_accept" className="cursor-pointer">
                          I agree to the{' '}
                        </label>
                        <a
                          href="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-600 underline decoration-blue-600/40 underline-offset-2 transition hover:text-blue-700"
                        >
                          Terms & Conditions
                        </a>
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 text-sm text-slate-700">
                      <input
                        id="privacy_accept"
                        type="checkbox"
                        className="size-4 shrink-0 accent-[#00a897]"
                        checked={privacyAccepted}
                        onChange={(e) => {
                          setPrivacyAccepted(e.target.checked);
                          setError('');
                        }}
                      />
                      <p className="leading-relaxed text-center">
                        <label htmlFor="privacy_accept" className="cursor-pointer">
                          I have read the{' '}
                        </label>
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-600 underline decoration-blue-600/40 underline-offset-2 transition hover:text-blue-700"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>

                  <AuthPrimaryButton
                    loading={isSaving}
                    loadingText="Saving…"
                    disabled={!canSubmit}
                  >
                    Complete onboarding
                  </AuthPrimaryButton>

                  <AuthFooterLink
                    text="Already finished?"
                    linkText="Go to login"
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
