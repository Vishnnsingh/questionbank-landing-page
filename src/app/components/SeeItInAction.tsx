/**
 * PrepMagic-UI — SEE IT IN ACTION (video demo)
 * Figma: 46:464–46:473, Video Placeholder 46:468
 */

const F = {
  label: '#A63426',
  slate: '#0F172A',
  heading: '#0F172A',
  body: '#424750',
  play: '#0F8F84',
  white: '#FFFFFF',
  muted: 'rgba(255, 255, 255, 0.6)',
} as const;

export function SeeItInAction() {
  return (
    <section
      id="demo"
      className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="see-it-in-action-heading"
    >
      <div className="mx-auto w-full max-w-[1312px]">
        <p
          className="text-center text-[14px] font-semibold uppercase tracking-[2px] sm:text-[16px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.label,
          }}
          data-node-id="46:464"
        >
          SEE IT IN ACTION
        </p>

        <h2
          id="see-it-in-action-heading"
          className="mx-auto mt-2 max-w-[682px] text-center text-[28px] font-medium leading-tight tracking-[-0.48px] sm:mt-3 sm:text-[42px] sm:leading-[56px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: F.heading,
          }}
          data-node-id="46:465"
        >
          Watch how the question bank works
        </h2>

        <p
          className="mx-auto mt-3 max-w-[560px] text-center text-[15px] leading-relaxed sm:mt-4 sm:text-[16px] sm:leading-[22px]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            color: F.body,
          }}
          data-node-id="46:466"
        >
          A 60-second look at picking a board, choosing a chapter, and practicing
          real previous year questions.
        </p>

        {/* Video Placeholder — Figma 46:468 · 1312×621 · r14 · #0F172A */}
        <div
          className="relative mx-auto mt-8 flex aspect-[1312/621] w-full max-w-[1312px] items-center justify-center overflow-hidden sm:mt-10"
          style={{
            background: F.slate,
            borderRadius: 14,
          }}
          data-node-id="46:468"
          data-name="Video Placeholder"
          role="img"
          aria-label="App demo video placeholder"
        >
          <div className="flex flex-col items-center px-4 text-center">
            <button
              type="button"
              className="flex size-16 items-center justify-center rounded-full text-white transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              style={{ background: F.play }}
              aria-label="Play app demo video"
            >
              <span
                className="ml-1 text-[20px] font-bold leading-none"
                aria-hidden
              >
                ▶
              </span>
            </button>
            <p
              className="mt-4 text-[18px] text-white"
              style={{ fontFamily: "'Archivo Black', 'Inter', system-ui, sans-serif" }}
              data-node-id="46:472"
            >
              App demo video
            </p>
            <p
              className="mt-1 max-w-[452px] text-[13px]"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                color: F.muted,
              }}
              data-node-id="46:473"
            >
              Placeholder — replace with your Prepmagic walkthrough (MP4 or embed)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
