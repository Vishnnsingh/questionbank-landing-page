import { Download, Smartphone } from 'lucide-react';
import { ParallaxLayer } from './scroll-fx';

const GOOGLE_PLAY_URL = 'https://play.google.com/store';

export function DownloadCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-teal-600 py-14 sm:py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <ParallaxLayer speed={0.3} className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
      </ParallaxLayer>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
            <Smartphone className="size-10 text-white" />
          </div>

          <h2 className="mb-6 text-3xl text-white sm:text-4xl lg:text-5xl">
            Start Your Smart Preparation Today
          </h2>

          <p className="mb-8 text-base text-teal-50 sm:mb-10 sm:text-xl">
            Download the app now and join thousands of successful board exam students
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-[200px] items-center justify-center overflow-hidden rounded-xl transition-transform hover:scale-105 sm:h-16 sm:w-[220px]"
              aria-label="Get it on Google Play"
            >
              <img
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                className="h-full w-full object-contain object-center"
                width={646}
                height={250}
              />
            </a>

            <button
              type="button"
              className="inline-flex h-14 w-[200px] items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:h-16 sm:w-[220px]"
            >
              <Download className="size-5 shrink-0 sm:size-6" />
              <div className="text-left leading-tight">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-teal-100 sm:text-xs">
                  Direct
                </div>
                <div className="text-sm font-semibold sm:text-base">Download APK</div>
              </div>
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-teal-50 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span>Free to Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span>No Ads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span>Offline Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
