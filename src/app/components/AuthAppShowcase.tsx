import studyImage from '../../images/im4.jpg';

type ShowcaseSize = 'default' | 'compact' | 'login';

function showcaseHeights(size: ShowcaseSize) {
  if (size === 'login') return 'h-[300px] lg:h-[340px]';
  if (size === 'compact') return 'h-[420px]';
  return 'h-[480px] sm:h-[560px]';
}

export function AuthAppShowcase({
  compact = false,
  size,
}: {
  compact?: boolean;
  size?: ShowcaseSize;
}) {
  const resolvedSize: ShowcaseSize = size || (compact ? 'compact' : 'default');
  const isLogin = resolvedSize === 'login';

  return (
    <div
      className={`relative mx-auto shrink-0 ${
        isLogin ? 'w-[220px] lg:w-[240px]' : compact ? 'max-w-[280px]' : 'max-w-[320px] lg:max-w-[350px]'
      }`}
    >
      <div
        className={`relative bg-slate-900 shadow-2xl ring-4 ring-white/10 ${
          isLogin
            ? 'rounded-[1.75rem] p-1.5'
            : compact
              ? 'w-full rounded-[2rem] p-2'
              : 'w-full rounded-[2rem] p-2 sm:rounded-[3rem] sm:p-3 sm:ring-8'
        }`}
      >
        <div className={`relative overflow-hidden rounded-[1.35rem] ${!isLogin && !compact ? 'sm:rounded-[2.5rem]' : ''}`}>
          <img
            src={studyImage}
            alt="Student preparing with Prepmagic app"
            className={`w-full object-cover ${showcaseHeights(resolvedSize)}`}
          />
        </div>
      </div>

      <div className="absolute -right-2 -top-2 rounded-lg bg-white px-2.5 py-1.5 shadow-lg sm:-right-3 sm:-top-3 sm:px-3 sm:py-2">
        <div className="text-[10px] text-slate-600 sm:text-xs">Live Students</div>
        <div className="text-base font-bold text-blue-600 sm:text-xl">2,450+</div>
      </div>

      <div className="absolute -bottom-2 -left-2 rounded-lg bg-white px-2.5 py-1.5 shadow-lg sm:-bottom-3 sm:-left-3 sm:px-3 sm:py-2">
        <div className="text-[10px] text-slate-600 sm:text-xs">Questions</div>
        <div className="text-base font-bold text-[#00a897] sm:text-xl">20,000+</div>
      </div>
    </div>
  );
}

export function AuthLoginVisualPanel({ embedded = false }: { embedded?: boolean }) {
  if (embedded) {
    return (
      <div className="relative flex h-full flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-[#00a897] px-6 py-8 text-white lg:px-10 lg:py-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="pointer-events-none absolute -left-16 top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-6 h-44 w-44 rounded-full bg-teal-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="space-y-2 text-center lg:max-w-sm lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-100">
              Prepmagic Smart Prep
            </p>
            <h2 className="text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl">
              CBSE &amp; Bihar Board Question Bank
            </h2>
            <p className="text-sm leading-relaxed text-white/90">
              20,000+ questions, mock tests &amp; analytics in one app.
            </p>
          </div>
          <AuthAppShowcase size="login" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[360px] flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-teal-500 to-[#00a897] px-5 py-8 text-white sm:px-6 sm:py-10 lg:min-h-[640px] lg:px-10 lg:py-12">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-md space-y-8">
        <div className="space-y-3 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100 sm:text-sm">
            Prepmagic Smart Prep
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            CBSE &amp; Bihar Board Question Bank
          </h2>
          <p className="hidden text-sm leading-relaxed text-white/90 sm:block sm:text-base">
            Practice 20,000+ previous year questions, mock tests, and analytics — all in one app.
          </p>
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="lg:hidden">
            <AuthAppShowcase compact />
          </div>
          <div className="hidden lg:block">
            <AuthAppShowcase />
          </div>
        </div>
      </div>
    </div>
  );
}
