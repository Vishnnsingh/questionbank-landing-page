import { useEffect, useState } from 'react';
import { fetchAppSupportAccountDeletion } from '../api/app-support-api';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

/** Home brand tokens — match Policy / legal pages */
const F = {
  cta: '#0F8F84',
  heading: '#1B2A4A',
  body: '#444444',
  label: '#4B5A78',
  heroGray: '#F0F0F0',
} as const;

const fontBody = "'DM Sans', system-ui, sans-serif";
const fontDisplay = "'Playfair Display', Georgia, serif";
const fontCta = "'Inter', system-ui, sans-serif";

/**
 * /delete-account — content from Admin App Support (account_deletion slug).
 * No hardcoded policy body — edit in admin panel.
 */
export function DeleteAccountPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('Delete Your PrepMagic Account');
  const [body, setBody] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    fetchAppSupportAccountDeletion()
      .then((payload) => {
        if (cancelled) return;
        const nextTitle =
          String(payload?.title || '').trim() || 'Delete Your PrepMagic Account';
        const nextBody = String(payload?.body || '').trim();
        setTitle(nextTitle);
        setBody(nextBody);
        if (!nextBody && payload?.is_published === false) {
          setError('This policy is not published yet.');
        } else if (!nextBody) {
          setError('Content is not available yet. Please try again later.');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : 'Could not load account deletion policy.',
        );
        setTitle('Delete Your PrepMagic Account');
        setBody('');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: F.heroGray }}>
      <SEO page="deleteAccount" />
      <SideNav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: F.cta, fontFamily: fontCta }}
          >
            Account
          </p>
          <h1
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: fontDisplay, color: F.heading }}
          >
            {title}
          </h1>
          {loading ? (
            <p className="mt-3 text-sm" style={{ color: F.label, fontFamily: fontBody }}>
              Loading from server…
            </p>
          ) : error && !body ? (
            <p className="mt-3 text-sm text-amber-700">{error}</p>
          ) : null}
        </header>

        {loading ? (
          <p style={{ color: F.label, fontFamily: fontBody }}>
            Fetching account deletion policy…
          </p>
        ) : body ? (
          <div
            className="text-[15px] leading-relaxed whitespace-pre-wrap sm:text-base"
            style={{ fontFamily: fontBody, color: F.body }}
          >
            {body}
          </div>
        ) : (
          <p style={{ color: F.label, fontFamily: fontBody }}>
            {error || 'No content available.'}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
