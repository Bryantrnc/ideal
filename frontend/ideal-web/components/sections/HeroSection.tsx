import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[38px] border border-[#5a2b20]/30 shadow-[0_25px_70px_rgba(44,9,1,0.28)]">
      <div
        className="relative min-h-[560px] bg-cover bg-center bg-no-repeat md:min-h-[660px]"
        style={{ backgroundImage: "url('/hero-jogging.png')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,9,1,0.80)_0%,rgba(44,9,1,0.62)_36%,rgba(44,9,1,0.30)_68%,rgba(44,9,1,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,244,232,0.16)_0%,rgba(255,244,232,0.06)_18%,transparent_42%)]" />
        <div className="absolute left-0 top-0 h-full w-[52%] backdrop-blur-[3px]" />

        <div className="relative z-10 flex min-h-[560px] items-start md:min-h-[660px]">
          <div className="w-full max-w-[760px] px-8 py-8 md:px-14 md:py-10">
            <a href="#analysis-section" className="flex items-start">
  <Image
    src="/logo.png"
    alt="Ideals Logo"
    width={168}
    height={54}
    priority
    className="h-auto w-auto object-contain"
  />
</a>

            <h1 className="hero-title glass-text mt-2 max-w-[700px] text-[52px] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[84px]">
              Discover the Best Version of Yourself with Ideal
            </h1>

            <p className="hero-subtext mt-4 max-w-[620px] text-[16px] leading-8 md:text-[18px]">
              Kickstart your transformation with customized diet and bulking plans designed for your body goals.
            </p>

            <div className="mt-8">
              <a
                href="#analysis-section"
                className="glow-button glow-dark inline-flex items-center justify-center rounded-full bg-[#4E1E15] px-7 py-3 font-semibold text-[#FFF4E8] hover:bg-[#5f271b]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}