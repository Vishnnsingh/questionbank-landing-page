import {
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Gift,
  Link2,
  Loader2,
  Share2,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import {
  fetchShareReferralMe,
  getApiShareErrorMessage,
  type ShareReferralMe,
} from '../api/share-referral-api';
import { ensureValidAccessToken, hasPaymentAuthSession } from '../lib/auth-session';
import { readPaymentUserContext } from '../lib/signup-context';
import { AuthPageBackground } from './auth-ui';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const STEPS = [
  {
    icon: Share2,
    title: 'Share your link',
    body: 'Send your personal Prepmagic link to friends via WhatsApp or social media.',
  },
  {
    icon: UserPlus,
    title: 'They install & sign up',
    body: 'Friends download the app and register using your referral code.',
  },
  {
    icon: CreditCard,
    title: 'Yearly plan purchase',
    body: 'Each friend who buys the yearly plan counts toward your reward.',
  },
  {
    icon: Gift,
    title: 'Claim your reward',
    body: 'Complete the target to become eligible for your one-time gift.',
  },
] as const;

async function shareOnWeb(message: string, url: string) {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    await navigator.share({
      title: 'Prepmagic',
      text: message,
      url: url || undefined,
    });
    return;
  }

  const text = url ? `${message}\n\n${url}` : message;
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    window.alert('Share message copied. Paste it on WhatsApp or any app.');
    return;
  }

  window.prompt('Copy and share this message:', text);
}

export function ShareApplicationPage() {
  const [paymentUser, setPaymentUser] = useState(readPaymentUserContext);
  const [sessionReady, setSessionReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [copyingLink, setCopyingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ShareReferralMe | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = await ensureValidAccessToken();
      if (!accessToken) {
        window.location.href = '/login';
        return;
      }
      const payload = await fetchShareReferralMe(accessToken);
      setData(payload);
    } catch (err) {
      setError(getApiShareErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasPaymentAuthSession()) {
      window.location.href = '/login';
      return;
    }
    setPaymentUser(readPaymentUserContext());
    setSessionReady(true);
    void load();
  }, [load]);

  const handleCopyLink = async () => {
    const link = String(data?.share_url || '').trim();
    if (!link) return;

    setCopyingLink(true);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        window.prompt('Copy this link:', link);
      }
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setError('Could not copy link. Please copy it manually.');
    } finally {
      setCopyingLink(false);
    }
  };

  const handleShare = async () => {
    const canShare = data?.can_share_link ?? data?.enabled;
    if (!data?.share_message || !canShare) return;
    setSharing(true);
    try {
      await shareOnWeb(String(data.share_message), String(data.share_url || '').trim());
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (!/abort|cancel/i.test(msg)) {
        setError('Could not share. Try copying your referral code instead.');
      }
    } finally {
      setSharing(false);
    }
  };

  if (!sessionReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="size-8 animate-spin text-[#00a897]" />
      </div>
    );
  }

  const required = data?.required_referrals ?? 10;
  const paid = data?.yearly_paid_referrals_count ?? 0;
  const registered = data?.registered_referrals_count ?? 0;
  const progressPct = required > 0 ? Math.min(100, Math.round((paid / required) * 100)) : 0;
  const firstName = paymentUser?.fullName?.split(' ')[0] || 'Student';
  const canShareLink = data?.can_share_link ?? data?.enabled;
  const giftGifted = Boolean(data?.gift_gifted);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <SEO page="home" />
      <AuthPageBackground />
      <SideNav />

      <main className="relative w-full px-4 pb-12 pt-6 sm:px-6 sm:pb-14 lg:px-8 lg:pt-8">
        <div className="mx-auto w-full max-w-7xl">
          <header className="border-b border-slate-200 pb-6 sm:pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-800">
              <Share2 className="size-3.5 text-[#00a897]" />
              Share Application
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Welcome, {firstName}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Refer friends to Prepmagic. When they install and subscribe to the yearly plan, you
              progress toward your reward.
            </p>
          </header>

          {error ? (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="size-8 animate-spin text-[#00a897]" />
            </div>
          ) : (
            <div className="mt-8 space-y-6 lg:space-y-8">
              {(data?.progress_complete || giftGifted) && data?.congratulations_message ? (
                <div
                  className={`flex w-full gap-4 rounded-2xl border p-5 sm:p-6 ${
                    giftGifted
                      ? 'border-indigo-200 bg-indigo-50/60'
                      : 'border-emerald-200 bg-emerald-50/60'
                  }`}
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                      giftGifted ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <Trophy className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">Congratulations</h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {data.congratulations_message}
                    </p>
                    {giftGifted ? (
                      <p className="mt-2 text-xs text-slate-500">
                        You can continue sharing your referral link at any time.
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="grid w-full gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8">
                <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 lg:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-teal-50">
                    <Gift className="size-6 text-[#00a897]" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-950 sm:text-2xl">
                    {data?.share_headline || 'Share Prepmagic & win rewards'}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Refer {required} users who install Prepmagic and purchase the yearly plan to
                    unlock:
                  </p>
                  <p className="mt-3 text-lg font-bold text-[#00a897]">
                    {data?.gift_title || 'Reward'}
                  </p>
                  {data?.gift_description ? (
                    <p className="mt-2 text-sm text-slate-500">{data.gift_description}</p>
                  ) : null}
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 lg:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Your progress
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
                      {paid}
                      <span className="text-lg font-semibold text-slate-400"> / {required}</span>
                    </p>
                    <span className="text-sm font-bold text-[#00a897]">{progressPct}%</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#00a897] transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Users className="size-4 text-slate-400" />
                      {registered} registered via your link
                    </p>
                    <p className="text-slate-500">
                      {paid} yearly paid referral{paid === 1 ? '' : 's'}
                    </p>
                  </div>

                  {data?.gift_eligible ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800">
                      <CheckCircle2 className="size-3.5" />
                      Eligible for gift
                    </span>
                  ) : giftGifted ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-800">
                      <CheckCircle2 className="size-3.5" />
                      Gift received
                    </span>
                  ) : !data?.referrer_has_yearly_plan ? (
                    <p className="mt-4 text-xs text-amber-700">
                      Active yearly plan required to unlock your gift.
                    </p>
                  ) : null}
                </article>
              </div>

              <article className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 lg:p-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                  Share your referral
                </h2>

                <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Referral link
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="relative min-w-0 flex-1">
                        <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          readOnly
                          value={data?.share_url || ''}
                          placeholder="Loading link…"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={!data?.share_url || copyingLink}
                        onClick={() => void handleCopyLink()}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-[#00a897] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {copyingLink ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : linkCopied ? (
                          <Check className="size-4 text-[#00a897]" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                        {linkCopied ? 'Copied' : 'Copy link'}
                      </button>
                    </div>
                  </div>

                  {data?.referral_code ? (
                    <div className="rounded-xl border border-dashed border-teal-200 bg-teal-50/50 px-5 py-4 lg:min-w-[220px]">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Referral code
                      </p>
                      <p className="mt-1 font-mono text-xl font-bold tracking-wider text-[#00a897]">
                        {data.referral_code}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    disabled={sharing || !canShareLink}
                    onClick={() => void handleShare()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a897] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[220px]"
                  >
                    {sharing ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Share2 className="size-4" />
                    )}
                    Share app link
                  </button>
                  <p className="text-xs text-slate-500">
                    {giftGifted
                      ? 'Your one-time gift has been claimed. You may continue sharing your link.'
                      : 'Share via WhatsApp, email, or any messaging app.'}
                  </p>
                </div>

                {!data?.enabled ? (
                  <p className="mt-3 text-xs font-medium text-amber-700">
                    Share rewards are currently paused by admin.
                  </p>
                ) : null}
              </article>

              <article className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 lg:p-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[#00a897]" />
                  <h2 className="text-base font-bold text-slate-950">How it works</h2>
                </div>
                <ol className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <li
                        key={step.title}
                        className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200/80">
                          <Icon className="size-4 text-[#00a897]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400">Step {idx + 1}</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-900">
                            {step.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </article>

              {Array.isArray(data?.referrals) && data.referrals.length > 0 ? (
                <article className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-100 px-6 py-4 sm:px-8">
                    <h2 className="text-base font-bold text-slate-950">Referred users</h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      People who signed up using your referral
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          <th className="px-6 py-3 sm:px-8">Name</th>
                          <th className="px-6 py-3 sm:px-8">User ID</th>
                          <th className="px-6 py-3 sm:px-8">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.referrals.map((row, idx) => (
                          <tr key={`${row.user_id || row.full_name}-${idx}`}>
                            <td className="px-6 py-3.5 font-medium text-slate-900 sm:px-8">
                              {row.full_name}
                            </td>
                            <td className="px-6 py-3.5 font-mono text-xs text-slate-500 sm:px-8">
                              {row.user_id || '—'}
                            </td>
                            <td className="px-6 py-3.5 sm:px-8">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  row.status === 'yearly_paid'
                                    ? 'bg-teal-50 text-[#00a897]'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {row.status === 'yearly_paid' ? 'Yearly paid' : 'Registered'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ) : null}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
