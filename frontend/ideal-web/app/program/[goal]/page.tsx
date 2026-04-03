type ProgramPageProps = {
  params: {
    goal: string;
  };
  searchParams: {
    heightCm?: string;
    weightKg?: string;
    age?: string;
    gender?: string;
    activityLevel?: string;
  };
};

function getBMI(weightKg: number, heightCm: number) {
  const h = heightCm / 100;
  return weightKg / (h * h);
}

function getIdealRange(heightCm: number) {
  const h = heightCm / 100;
  return {
    min: 18.5 * h * h,
    max: 24.9 * h * h,
  };
}

function getCalories({
  weightKg,
  heightCm,
  age,
  gender,
  activityLevel,
  goal,
}: {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: string;
  activityLevel: string;
  goal: string;
}) {
  const base =
    (gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161) *
    (activityLevel === "high" ? 1.725 : activityLevel === "moderate" ? 1.55 : 1.2);

  return Math.round(base + (goal === "diet" ? -400 : 300));
}

function getProgramCopy(goal: string) {
  if (goal === "diet") {
    return {
      badge: "Diet Program",
      title: "Program Diet Menuju Berat Ideal",
      description:
        "Panduan personal untuk membantu kamu menurunkan berat badan secara lebih terarah, stabil, dan tetap nyaman dijalani.",
      overview:
        "Program ini fokus pada defisit kalori yang terkontrol, pola makan yang rapi, dan aktivitas yang konsisten agar progress tetap stabil.",
      focusItems: [
        "Defisit kalori ringan agar progress tetap stabil.",
        "Protein cukup untuk menjaga massa otot.",
        "Cardio ringan dan latihan beban rutin.",
        "Tidur cukup dan evaluasi progress mingguan.",
      ],
      roadmap: [
        {
          title: "Week 1–2",
          desc: "Mulai rapikan pola makan, kurangi minuman tinggi gula, dan biasakan jadwal makan yang lebih konsisten.",
        },
        {
          title: "Week 3–4",
          desc: "Tambahkan latihan ringan dan pertahankan defisit kalori tanpa membuat tubuh terlalu lelah.",
        },
        {
          title: "Week 5–8",
          desc: "Evaluasi hasil, sesuaikan porsi bila perlu, dan fokus pada progress yang stabil.",
        },
      ],
      nutrition: [
        "Utamakan protein tanpa lemak seperti ayam, ikan, telur, dan tempe.",
        "Gunakan karbohidrat kompleks secukupnya seperti nasi, kentang, atau oats.",
        "Perbanyak sayur, buah, dan air putih.",
        "Batasi gorengan, camilan tinggi gula, dan minuman berkalori tinggi.",
      ],
      training: [
        "Cardio ringan 3–5 kali per minggu.",
        "Latihan beban full-body 3 kali per minggu.",
        "Gunakan gerakan dasar yang mudah dijaga konsistensinya.",
        "Naikkan aktivitas harian seperti jalan kaki dan mobilitas ringan.",
      ],
      checklist: [
        "Pantau berat badan mingguan.",
        "Tidur minimal 7 jam.",
        "Jaga protein harian tetap masuk.",
        "Hindari defisit kalori berlebihan.",
      ],
      direction: "Penurunan berat badan",
    };
  }

  return {
    badge: "Bulking Program",
    title: "Program Bulking Menuju Target Berat",
    description:
      "Panduan personal untuk membantu kamu menaikkan massa tubuh secara lebih terarah, terkontrol, dan tetap berkualitas.",
    overview:
      "Program ini fokus pada surplus kalori yang rapi, kualitas latihan yang konsisten, dan recovery yang baik agar massa tubuh naik dengan lebih optimal.",
    focusItems: [
      "Surplus kalori terkontrol agar kenaikan tetap rapi.",
      "Protein cukup untuk mendukung pertumbuhan otot.",
      "Latihan beban progresif dan terukur.",
      "Recovery dan tidur yang cukup setiap hari.",
    ],
    roadmap: [
      {
        title: "Week 1–2",
        desc: "Tambahkan asupan kalori secara bertahap dan rapikan jadwal makan harian.",
      },
      {
        title: "Week 3–4",
        desc: "Tingkatkan kualitas latihan dan mulai pantau kenaikan berat badan secara rutin.",
      },
      {
        title: "Week 5–8",
        desc: "Fokus pada progressive overload dan evaluasi hasil mingguan agar kenaikan tetap ideal.",
      },
    ],
    nutrition: [
      "Tambah porsi makan secara bertahap, bukan berlebihan sekaligus.",
      "Utamakan protein, karbohidrat, dan lemak sehat.",
      "Gunakan snack padat kalori bila kebutuhan harian belum tercapai.",
      "Hindari dirty bulking berlebihan agar hasil tetap rapi.",
    ],
    training: [
      "Latihan beban 4 kali per minggu.",
      "Fokus pada compound movement utama.",
      "Naikkan beban atau repetisi secara bertahap.",
      "Jaga recovery dan rest day yang cukup.",
    ],
    checklist: [
      "Makan konsisten setiap hari.",
      "Pantau berat badan mingguan.",
      "Catat progres latihan.",
      "Jaga hidrasi dan kualitas tidur.",
    ],
    direction: "Peningkatan massa tubuh",
  };
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="soft-card rounded-[24px] border border-[#DCCBB8] bg-[#FFF4E8] p-6">
      <p className="text-sm text-[#8A7464]">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-[#2C0901] md:text-4xl">{value}</p>
    </div>
  );
}

function SectionCard({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="soft-card scroll-mt-28 rounded-[30px] border border-[#DCCBB8] bg-[#FFF4E8] p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-[#2C0901] md:text-[32px]">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-[#8A7464]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function SoftItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] bg-[#F0E0C7] px-5 py-4 text-[#4E1E15] shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
      {children}
    </div>
  );
}

export default function ProgramPage({ params, searchParams }: ProgramPageProps) {
  const goal = params.goal;

  const heightCm = Number(searchParams.heightCm || 0);
  const weightKg = Number(searchParams.weightKg || 0);
  const age = Number(searchParams.age || 0);
  const gender = searchParams.gender || "male";
  const activityLevel = searchParams.activityLevel || "moderate";

  const isDiet = goal === "diet";
  const isBulking = goal === "bulking";

  if (!isDiet && !isBulking) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 md:px-8">
        <div className="soft-card rounded-[30px] border border-[#DCCBB8] bg-[#FFF4E8] p-8">
          <h1 className="text-3xl font-bold text-[#2C0901]">Program tidak ditemukan</h1>
          <p className="mt-3 text-[#8A7464]">
            Halaman yang kamu buka tidak valid. Silakan kembali ke halaman analisis.
          </p>
        </div>
      </main>
    );
  }

  const bmi = getBMI(weightKg, heightCm);
  const ideal = getIdealRange(heightCm);
  const calories = getCalories({
    weightKg,
    heightCm,
    age,
    gender,
    activityLevel,
    goal,
  });

  const copy = getProgramCopy(goal);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-8">
      <div className="space-y-6 md:space-y-8">

        <div className="sticky top-4 z-20">
          <div className="mx-auto w-full max-w-fit rounded-full border border-[#DCCBB8] bg-[#FFF4E8]/95 p-2 shadow-[0_10px_30px_rgba(44,9,1,0.10)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="#overview"
                className="rounded-full bg-[#2C0901] px-5 py-2 text-sm font-semibold text-[#FFF4E8]"
              >
                Overview
              </a>
              <a
                href="#focus"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#4E1E15] transition hover:bg-[#F0E0C7]"
              >
                Focus
              </a>
              <a
                href="#roadmap"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#4E1E15] transition hover:bg-[#F0E0C7]"
              >
                Roadmap
              </a>
              <a
                href="#nutrition"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#4E1E15] transition hover:bg-[#F0E0C7]"
              >
                Nutrition
              </a>
              <a
                href="#training"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#4E1E15] transition hover:bg-[#F0E0C7]"
              >
                Training
              </a>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Current Weight" value={`${weightKg} kg`} />
          <StatCard label="BMI" value={bmi.toFixed(1)} />
          <StatCard
            label="Ideal Range"
            value={`${ideal.min.toFixed(1)} - ${ideal.max.toFixed(1)} kg`}
          />
          <StatCard label="Target Calories" value={`${calories} kkal`} />
        </section>

        <SectionCard
          id="overview"
          title="Program Overview"
          subtitle="Ringkasan cepat tentang arah program yang sedang kamu jalani."
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] bg-[#F0E0C7] p-6 text-[#4E1E15]">
              <p className="text-base leading-8">{copy.overview}</p>
            </div>

            <div className="grid gap-4">
              <SoftItem>
                Arah program: <span className="font-semibold text-[#2C0901]">{copy.direction}</span>
              </SoftItem>
              <SoftItem>
                Usia: <span className="font-semibold text-[#2C0901]">{age} tahun</span>
              </SoftItem>
              <SoftItem>
                Gender:{" "}
                <span className="font-semibold text-[#2C0901]">
                  {gender === "male" ? "Pria" : "Wanita"}
                </span>
              </SoftItem>
              <SoftItem>
                Aktivitas:{" "}
                <span className="font-semibold text-[#2C0901]">
                  {activityLevel === "high"
                    ? "Tinggi"
                    : activityLevel === "moderate"
                    ? "Sedang"
                    : "Rendah"}
                </span>
              </SoftItem>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          id="focus"
          title="Focus Program"
          subtitle="Hal paling penting yang perlu kamu jaga selama menjalani program ini."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {copy.focusItems.map((item) => (
              <SoftItem key={item}>{item}</SoftItem>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          id="roadmap"
          title="Weekly Roadmap"
          subtitle="Tahapan sederhana untuk menjaga progress tetap terarah setiap minggu."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {copy.roadmap.map((step) => (
              <div
                key={step.title}
                className="rounded-[24px] bg-[#F0E0C7] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B48E69]">
                  {step.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#4E1E15]">{step.desc}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <section className="grid gap-6 lg:grid-cols-2">
          <SectionCard
            id="nutrition"
            title="Nutrition Guide"
            subtitle="Panduan asupan yang lebih mudah diikuti untuk mendukung target programmu."
          >
            <div className="space-y-3">
              {copy.nutrition.map((item) => (
                <SoftItem key={item}>{item}</SoftItem>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="training"
            title="Training Guide"
            subtitle="Arah latihan yang sederhana, realistis, dan tetap efektif untuk dijalankan."
          >
            <div className="space-y-3">
              {copy.training.map((item) => (
                <SoftItem key={item}>{item}</SoftItem>
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard
          id="checklist"
          title="Daily Checklist"
          subtitle="Checklist singkat supaya progress tetap konsisten setiap hari."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {copy.checklist.map((item) => (
              <SoftItem key={item}>• {item}</SoftItem>
            ))}
          </div>
        </SectionCard>

        <section className="soft-card rounded-[30px] border border-[#DCCBB8] bg-[#FFF4E8] p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="glow-button glow-dark inline-flex items-center justify-center rounded-full bg-[#4E1E15] px-6 py-3 font-semibold text-[#FFF4E8] hover:bg-[#5f271b]"
            >
              Back to Analysis
            </a>
            <a
              href="/"
              className="glow-button glow-gold inline-flex items-center justify-center rounded-full bg-[#B48E69] px-6 py-3 font-semibold text-[#2C0901]"
            >
              Edit Input
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}