import { Barlow_Condensed, Inter } from "next/font/google";

const heroTitleFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"]
});

const heroBodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"]
});

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.62) 32%, rgba(0,0,0,0.34) 62%, rgba(0,0,0,0.46) 100%), url('/hero-jogging.png')"
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(232,80,2,0.14),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/65 to-transparent" />

        <div className="relative z-10 flex min-h-screen items-start">
          <div className="mx-auto w-full max-w-7xl px-5 pt-12 pb-10 md:px-8 md:pt-14 md:pb-14 xl:px-10">
            <div className="max-w-[760px] space-y-4 md:space-y-5">
              <div className="flex items-center pl-1">
                <img
                  src="/logo.png"
                  alt="Ideal logo"
                  className="h-24 w-auto object-contain md:h-32 xl:h-40"
                />
              </div>

              <div className="space-y-3">
                <h1
                  className={`${heroTitleFont.className} max-w-[700px] pl-1 text-[52px] font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-white md:text-[72px] xl:text-[84px]`}
                >
                  Discover the Best
                  <br />
                  Version of Yourself
                  <br />
                  with Ideal
                </h1>

                <p className="max-w-[520px] pl-1 text-[16px] font-medium leading-8 text-white/72 md:text-[18px] md:leading-8">
  Stop dreaming, start doing. Get your personalized plan today.
</p>
              </div>

              <div className="pt-2 pl-1">
                <a
                  href="#analysis-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#E85002] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(232,80,2,0.24)] transition hover:bg-[#F16001] md:px-10 md:text-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}