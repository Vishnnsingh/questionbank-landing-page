import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

import {
  completeUserOnboarding,
  fetchAuthMe,
  fetchSignupBoards,
  fetchSignupClasses,
  fetchSignupDistricts,
  fetchSignupMedia,
  fetchSignupStates,
  fetchSignupStreams,
  loginUser,
} from '../api/auth-api';
import { redirectAfterAuthenticatedLogin } from '../lib/auth-post-login';
import {
  clearPendingOnboardCredentials,
  readPendingOnboardCredentials,
  savePendingLoginEmail,
  savePendingLoginMobileVerify,
  savePendingOnboardCredentials,
} from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import { AuthSelect } from './AuthSelect';
import {
  AuthAlert,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authCompactInputClass,
  authFieldLabelClass,
} from './auth-ui';
import { PasswordInput } from './PasswordInput';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const labelClass = authFieldLabelClass;
const signupInputClass = authCompactInputClass;
const sectionTitleClass =
  'col-span-full -mb-1 mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 first:mt-0';
const fieldsGridClass = 'grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
] as const;

const STREAM_LABELS: Record<string, string> = {
  science: 'Science',
  arts: 'Arts',
  commerce: 'Commerce',
  vocational: 'Vocational',
};

function classLabel(value: string) {
  const v = String(value || '').trim();
  if (!v) return '';
  return v.toLowerCase().startsWith('class') ? v : `Class ${v}`;
}

function needsStream(classValue: string) {
  return classValue === '11' || classValue === '12';
}

function normalizeMediumValue(raw: string) {
  const s = String(raw || '').trim();
  if (!s) return '';
  const lower = s.toLowerCase();
  if (lower === 'hindi' || lower === 'hi') return 'Hindi';
  if (lower === 'english' || lower === 'en') return 'English';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function mediumOptionsFromList(media: string[]) {
  const seen = new Set<string>();
  const out: { label: string; value: string }[] = [];
  for (const item of media) {
    const value = normalizeMediumValue(item);
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ label: value, value });
  }
  return out;
}

function pickDefaultMedium(media: string[], current: string) {
  const opts = mediumOptionsFromList(media);
  if (!opts.length) return '';
  const cur = normalizeMediumValue(current);
  if (cur) {
    const hit = opts.find((o) => o.value.toLowerCase() === cur.toLowerCase());
    if (hit) return hit.value;
  }
  const hi = opts.find((o) => o.value.toLowerCase() === 'hindi');
  if (hi) return hi.value;
  const en = opts.find((o) => o.value.toLowerCase() === 'english');
  if (en) return en.value;
  return opts[0].value;
}

export function OnboardingPage() {
  const pending = readPendingOnboardCredentials();
  const emailFromQuery = new URLSearchParams(window.location.search).get('email') || '';
  const initialEmail = (pending?.email || emailFromQuery).trim().toLowerCase();

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(pending?.password || '');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');
  const [mediumOptions, setMediumOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [city, setCity] = useState('');

  const [classOptions, setClassOptions] = useState<string[]>([]);
  const [streamOptions, setStreamOptions] = useState<string[]>([]);
  const [boardOptions, setBoardOptions] = useState<string[]>([]);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

  const [bootLoading, setBootLoading] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const showPasswordField = !pending?.password;
  const isSenior = needsStream(selectedClass);

  const streamSelectOptions = useMemo(
    () =>
      streamOptions.map((value) => ({
        value,
        label: STREAM_LABELS[value] || value,
      })),
    [streamOptions],
  );

  // Boot: boards + states only (classes/medium depend on board — same as app)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setBootLoading(true);
      try {
        const [boards, states] = await Promise.all([
          fetchSignupBoards().catch(() => []),
          fetchSignupStates().catch(() => []),
        ]);
        if (cancelled) return;
        setBoardOptions(boards);
        setStateOptions(states);
        // Do not auto-pick board — user chooses; classes load after selection
      } finally {
        if (!cancelled) setBootLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Classes for selected board (API)
  useEffect(() => {
    let cancelled = false;
    if (!selectedBoard) {
      setClassOptions([]);
      setSelectedClass('');
      setSelectedStream('');
      setStreamOptions([]);
      setLoadingClasses(false);
      return undefined;
    }
    (async () => {
      setLoadingClasses(true);
      try {
        const classes = await fetchSignupClasses(selectedBoard);
        if (cancelled) return;
        const next = [...new Set(
          (classes || [])
            .map((c) => String(c || '').replace(/\D/g, '') || String(c || '').trim())
            .filter(Boolean),
        )];
        setClassOptions(next);
        setSelectedClass((prev) => (next.includes(prev) ? prev : ''));
        setSelectedStream('');
      } catch {
        if (!cancelled) {
          setClassOptions([]);
          setSelectedClass('');
          setSelectedStream('');
        }
      } finally {
        if (!cancelled) setLoadingClasses(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedBoard]);

  // Medium for selected board (API)
  useEffect(() => {
    let cancelled = false;
    if (!selectedBoard) {
      setMediumOptions([]);
      setSelectedMedium('');
      setLoadingMedia(false);
      return undefined;
    }
    (async () => {
      setLoadingMedia(true);
      try {
        const media = await fetchSignupMedia(selectedBoard);
        if (cancelled) return;
        const opts = mediumOptionsFromList(media);
        if (opts.length) {
          setMediumOptions(opts);
          setSelectedMedium((prev) => pickDefaultMedium(media, prev));
        } else {
          setMediumOptions([]);
          setSelectedMedium('');
        }
      } catch {
        if (!cancelled) {
          setMediumOptions([]);
        }
      } finally {
        if (!cancelled) setLoadingMedia(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedBoard]);

  useEffect(() => {
    if (!isSenior) {
      setSelectedStream('');
      setStreamOptions([]);
      return;
    }
    let cancelled = false;
    fetchSignupStreams(selectedClass)
      .then((streams) => {
        if (!cancelled) setStreamOptions(streams);
      })
      .catch(() => {
        if (!cancelled) setStreamOptions([]);
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
    if (!selectedBoard.trim()) {
      setError('Please select your board first.');
      return;
    }
    if (!selectedClass) {
      setError(
        classOptions.length
          ? 'Please select your class.'
          : 'No class available for this board yet. Choose another board or try later.',
      );
      return;
    }
    if (isSenior && !selectedStream) {
      setError('Please select a stream for Class 11 / 12.');
      return;
    }
    if (!selectedMedium) {
      setError(
        mediumOptions.length
          ? `Please choose your study medium (${mediumOptions.map((o) => o.label).join(' / ')}).`
          : 'No medium available for this board yet.',
      );
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
      const onboardSession = await completeUserOnboarding({
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

      // Prefer session from onboard; fallback to login for older backends.
      try {
        let login = onboardSession;
        const hasSession =
          typeof login?.accessToken === 'string' && login.accessToken.length > 0;

        if (!hasSession) {
          login = await loginUser(normalizedEmail, trimmedPassword);
        }

        if (login.needs_mobile_verify) {
          const mobile = String(login.mobile_number || '').replace(/\D/g, '').slice(0, 10);
          const token = String(login.login_pending_token || '').trim();
          if (token && /^[6-9]\d{9}$/.test(mobile)) {
            savePendingLoginMobileVerify({
              loginPendingToken: token,
              mobileNumber: mobile,
              email: normalizedEmail,
              password: trimmedPassword,
            });
            const params = new URLSearchParams({ mode: 'login', mobile });
            window.location.href = `/verify-mobile?${params.toString()}`;
            return;
          }
          savePendingLoginEmail(normalizedEmail);
          window.location.href = '/login';
          return;
        }

        const profile = await fetchAuthMe(login.accessToken);
        redirectAfterAuthenticatedLogin(login, profile, {
          email: normalizedEmail,
          password: trimmedPassword,
        });
      } catch {
        savePendingLoginEmail(normalizedEmail);
        window.location.href = '/login';
      }
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

                  <div className={fieldsGridClass}>
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
                      <div className="sm:col-span-2 xl:col-span-3 rounded-xl border border-slate-200/90 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700">
                        Account: <span className="font-semibold text-slate-900">{email}</span>
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

                    {/* Row group 1 — Academic: Board → Class → Medium */}
                    <p className={sectionTitleClass}>Academic</p>

                    <div>
                      <label className={labelClass} htmlFor="board">
                        Board
                      </label>
                      <AuthSelect
                        id="board"
                        value={selectedBoard}
                        onChange={setSelectedBoard}
                        disabled={bootLoading || boardOptions.length === 0}
                        placeholder={
                          bootLoading ? 'Loading boards…' : 'Select board'
                        }
                        options={boardOptions.map((board) => ({
                          label: board,
                          value: board,
                        }))}
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="class">
                        Class
                      </label>
                      <AuthSelect
                        id="class"
                        value={selectedClass}
                        onChange={setSelectedClass}
                        disabled={!selectedBoard || loadingClasses || classOptions.length === 0}
                        placeholder={
                          !selectedBoard
                            ? 'Select board first'
                            : loadingClasses
                              ? 'Loading classes…'
                              : classOptions.length
                                ? 'Select'
                                : 'No class for this board'
                        }
                        options={classOptions.map((value) => ({
                          label: classLabel(value),
                          value,
                        }))}
                      />
                    </div>

                    {isSenior ? (
                      <div>
                        <label className={labelClass} htmlFor="stream">
                          Stream
                        </label>
                        <AuthSelect
                          id="stream"
                          value={selectedStream}
                          onChange={setSelectedStream}
                          placeholder="Select"
                          options={streamSelectOptions}
                        />
                      </div>
                    ) : null}

                    <div>
                      <label className={labelClass} htmlFor="medium">
                        Choose Medium
                      </label>
                      <AuthSelect
                        id="medium"
                        value={selectedMedium}
                        onChange={setSelectedMedium}
                        disabled={!selectedBoard || loadingMedia || mediumOptions.length === 0}
                        placeholder={
                          !selectedBoard
                            ? 'Select board first'
                            : loadingMedia
                              ? 'Loading mediums…'
                              : mediumOptions.length
                                ? 'Select medium'
                                : 'No medium for this board'
                        }
                        options={mediumOptions}
                      />
                    </div>

                    {/* Row group 2 — Area: State → District → City */}
                    <p className={sectionTitleClass}>Area</p>

                    <div>
                      <label className={labelClass} htmlFor="state">
                        State
                      </label>
                      {stateOptions.length ? (
                        <AuthSelect
                          id="state"
                          value={selectedState}
                          onChange={setSelectedState}
                          placeholder="Select"
                          options={stateOptions.map((state) => ({
                            label: state,
                            value: state,
                          }))}
                        />
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
                        <AuthSelect
                          id="district"
                          value={selectedDistrict}
                          onChange={setSelectedDistrict}
                          disabled={loadingDistricts || !selectedState}
                          placeholder={loadingDistricts ? 'Loading…' : 'Select'}
                          options={districtOptions.map((district) => ({
                            label: district,
                            value: district,
                          }))}
                        />
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

                    {/* Row group 3 — Personal: Gender */}
                    <p className={sectionTitleClass}>Personal</p>

                    <div>
                      <label className={labelClass} htmlFor="gender">
                        Gender
                      </label>
                      <AuthSelect
                        id="gender"
                        value={selectedGender}
                        onChange={setSelectedGender}
                        placeholder="Select"
                        options={GENDER_OPTIONS.map((option) => ({
                          label: option.label,
                          value: option.value,
                        }))}
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
