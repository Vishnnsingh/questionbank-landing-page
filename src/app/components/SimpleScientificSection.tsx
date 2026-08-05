/**
 * PrepMagic-UI — Simple. Scientific. Successful.
 * Figma: banner 98:105 / overlay 98:106 / copy 86:681–86:705
 * Card: ~1312×436 · r64 · photo bg + rgba(0,0,0,0.3) blur
 * (No Register CTA — not in Figma)
 */

const F = {
  overlay: 'rgba(0, 0, 0, 0.3)',
} as const;

/** Students studying / mobile learning — Figma 98:105 */
const BG = '/image/students-learning.png';

const STEPS = [
  {
    n: '01',
    title: 'Select Board & Class',
    body: 'Tell us your goal. We customize the entire platform to your specific curriculum, from CBSE to Bihar State Board.',
  },
  {
    n: '02',
    title: 'Strategic Practice',
    body: "Focus on the 'Repeated Hits' first. Solve curated questions that have historical weight and high AI scores.",
  },
  {
    n: '03',
    title: 'Deep Insights',
    body: "Review AI-generated feedback. Understand not just 'what' you got wrong, but 'why' you might miss it in the final exam.",
  },
] as const;

export function SimpleScientificSection() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="simple-scientific-heading"
    >
      <div className="mx-auto w-full max-w-[1312px]">
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: 64 }}
          data-node-id="98:105"
        >
          {/* Relevant photo — students learning on mobile (Figma) */}
          <img
            src={BG}
            alt="Students studying together with mobile learning"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ background: F.overlay }}
            data-node-id="98:106"
          />

          <div
            className="relative z-[1] flex min-h-[360px] flex-col justify-between gap-10 px-6 py-10 sm:min-h-[400px] sm:px-10 sm:py-12 lg:min-h-[436px] lg:px-14 lg:py-14"
            data-node-id="86:681"
          >
            <h2
              id="simple-scientific-heading"
              className="max-w-[720px] text-[28px] font-normal leading-tight tracking-[-0.96px] text-white sm:text-[40px] sm:leading-[52px] lg:text-[48px] lg:leading-[56px]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
              data-node-id="86:683"
            >
              Simple. Scientific. Successful.
            </h2>

            <div
              className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10"
              data-node-id="86:684"
            >
              {STEPS.map((step) => (
                <div key={step.n} className="relative min-w-0">
                  <p
                    className="text-[40px] font-bold leading-[56px] tracking-[-0.96px] text-white opacity-20 sm:text-[48px]"
                    style={{
                      fontFamily:
                        "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                    }}
                    aria-hidden
                  >
                    {step.n}
                  </p>
                  <h3
                    className="-mt-2 text-[15px] font-normal leading-6 text-white sm:text-[16px]"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 max-w-[320px] text-[13px] leading-5 tracking-[0.14px] text-white sm:text-[14px] sm:leading-[20px]"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
