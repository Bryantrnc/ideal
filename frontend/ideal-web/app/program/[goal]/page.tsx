"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

type GoalKey = "diet" | "bulking" | "maintenance";
type TabKey =
  | "overview"
  | "focus"
  | "roadmap"
  | "targets"
  | "guide"
  | "tips"
  | "faq";

type GoalContent = {
  badge: string;
  heroTitle: string;
  heroDescription: string;
  summaryTitle: string;
  summaryDescription: string;
  stats: {
    bmi: string;
    idealWeight: string;
    status: string;
  };
  highlights: {
    label: string;
    value: string;
    description: string;
  }[];
  focusAreas: {
    title: string;
    text: string;
  }[];
  roadmap: {
    phase: string;
    title: string;
    duration: string;
    items: string[];
  }[];
  dailyTargets: {
    label: string;
    value: string;
    note: string;
  }[];
  guideTitle: string;
  mealGuide: string[];
  expectations: {
    title: string;
    text: string;
  }[];
  tips: string[];
  faqs: {
    q: string;
    a: string;
  }[];
};

const goalContent: Record<GoalKey, GoalContent> = {
  diet: {
    badge: "Diet",
    heroTitle: "Your Personal Tracker",
    heroDescription:
      "Selesaikan target harianmu dan unlock versi terbaik dari dirimu.",
    summaryTitle: "Program Diet",
    summaryDescription:
      "Fokus pada penurunan lemak tubuh secara bertahap dengan pola yang lebih stabil dan realistis.",
    stats: { bmi: "22.8", idealWeight: "58–67.5 kg", status: "Aktif" },
    highlights: [
      { label: "Target Kalori", value: "1.950 kkal", description: "Defisit moderat yang lebih nyaman dijalankan." },
      { label: "Durasi Program", value: "12 Minggu", description: "Cukup untuk membangun progres yang stabil." },
      { label: "Progres Mingguan", value: "0.3–0.6 kg", description: "Rentang yang realistis dan lebih aman." },
      { label: "Fokus Utama", value: "Fat Loss", description: "Turun lemak tanpa membuat pola hidup terasa berat." }
    ],
    focusAreas: [
      { title: "Defisit yang Terkontrol", text: "Kalori dikurangi secara moderat agar progres tetap jalan tanpa mengganggu energi harian." },
      { title: "Protein sebagai Prioritas", text: "Asupan protein dijaga agar kenyang lebih lama dan massa otot tetap terpelihara." },
      { title: "Aktivitas yang Konsisten", text: "Fokus bukan hanya olahraga, tetapi juga langkah harian, tidur, dan rutinitas makan." },
      { title: "Hasil yang Realistis", text: "Program dirancang untuk hasil yang bisa dipertahankan, bukan hasil instan." }
    ],
    roadmap: [
      { phase: "Fase 1", title: "Adaptasi", duration: "Minggu 1–2", items: ["Merapikan jadwal makan", "Mulai kontrol porsi", "Membentuk ritme aktivitas harian", "Membangun konsistensi awal"] },
      { phase: "Fase 2", title: "Progres", duration: "Minggu 3–8", items: ["Menjaga defisit kalori", "Meningkatkan kualitas asupan", "Memantau progres mingguan", "Menjaga ritme tidur dan aktivitas"] },
      { phase: "Fase 3", title: "Stabilisasi", duration: "Minggu 9–12", items: ["Menjaga hasil tetap stabil", "Evaluasi kebiasaan yang efektif", "Persiapan maintenance", "Membuat pola hidup lebih berkelanjutan"] }
    ],
    dailyTargets: [
      { label: "Kalori", value: "1.950 kkal", note: "Target utama harian" },
      { label: "Protein", value: "135 g", note: "Prioritas setiap hari" },
      { label: "Lemak", value: "55 g", note: "Untuk keseimbangan tubuh" },
      { label: "Karbohidrat", value: "210 g", note: "Sumber energi utama" },
      { label: "Air Minum", value: "2.5–3 L", note: "Jaga hidrasi harian" },
      { label: "Langkah", value: "7.000–9.000", note: "Aktif setiap hari" },
      { label: "Tidur", value: "7–8 jam", note: "Bantu recovery dan kontrol lapar" },
      { label: "Workout", value: "3–4 sesi", note: "Fokus pada konsistensi" }
    ],
    guideTitle: "Panduan Diet",
    mealGuide: [
      "Mulai hari dengan sarapan yang sederhana dan tinggi protein.",
      "Isi piring dengan sumber protein, karbohidrat, dan sayur yang seimbang.",
      "Pilih camilan yang terukur agar tidak berlebihan.",
      "Jaga pola makan tetap fleksibel agar lebih mudah dipertahankan.",
      "Fokus pada konsistensi, bukan kesempurnaan."
    ],
    expectations: [
      { title: "Awal Program", text: "Tubuh mulai beradaptasi dengan ritme baru dan hasil awal bisa terlihat dari perubahan kebiasaan." },
      { title: "Minggu Menengah", text: "Progres mulai terasa lebih jelas, baik dari angka maupun dari kualitas rutinitas harian." },
      { title: "Akhir Program", text: "Fokus utama adalah menjaga hasil agar lebih stabil dan tidak mudah kembali seperti sebelumnya." }
    ],
    tips: [
      "Pantau berat badan secara konsisten pada waktu yang sama.",
      "Jangan terpaku pada perubahan harian, lihat tren mingguan.",
      "Jaga protein, tidur, dan aktivitas sebagai fondasi utama.",
      "Buat program tetap fleksibel agar tidak terasa membebani.",
      "Lebih baik konsisten 80% daripada sempurna sesaat."
    ],
    faqs: [
      { q: "Apakah saya harus mengikuti semuanya secara sempurna?", a: "Tidak. Fokus utamanya adalah menjaga hal-hal penting seperti kalori, protein, aktivitas, dan tidur secara konsisten." },
      { q: "Bagaimana kalau ada hari makan lebih banyak?", a: "Itu normal. Yang penting adalah kembali ke pola utama di hari berikutnya tanpa merasa gagal." },
      { q: "Kapan target perlu disesuaikan?", a: "Saat progres stagnan beberapa minggu atau energi harian terasa menurun terlalu banyak." }
    ]
  },
  bulking: {
    badge: "Bulking",
    heroTitle: "Your Personal Tracker",
    heroDescription:
      "Selesaikan target harianmu dan unlock versi terbaik dari dirimu.",
    summaryTitle: "Program Bulking",
    summaryDescription:
      "Fokus pada surplus kalori, latihan progresif, dan pemulihan yang konsisten.",
    stats: { bmi: "20.4", idealWeight: "62–72 kg", status: "Aktif" },
    highlights: [
      { label: "Target Kalori", value: "2.850 kkal", description: "Surplus yang terukur dan tetap terkendali." },
      { label: "Durasi Program", value: "16 Minggu", description: "Lebih cukup untuk progres naik massa tubuh." },
      { label: "Progres Mingguan", value: "0.2–0.4 kg", description: "Naik bertahap agar lebih berkualitas." },
      { label: "Fokus Utama", value: "Muscle Gain", description: "Naik massa tubuh dengan arah yang lebih rapi." }
    ],
    focusAreas: [
      { title: "Surplus yang Terkontrol", text: "Kalori ditambah secukupnya agar tubuh punya bahan bakar tambahan tanpa terlalu banyak kenaikan lemak." },
      { title: "Protein dan Recovery", text: "Asupan protein dan pemulihan dijaga agar pertumbuhan otot lebih optimal." },
      { title: "Latihan Progresif", text: "Performa latihan harus berkembang agar surplus memberi hasil yang lebih baik." },
      { title: "Makan yang Konsisten", text: "Kunci bulking adalah konsistensi, bukan sekadar makan besar sesekali." }
    ],
    roadmap: [
      { phase: "Fase 1", title: "Penyesuaian", duration: "Minggu 1–3", items: ["Menaikkan porsi makan secara bertahap", "Membiasakan jadwal makan yang konsisten", "Memantau berat badan mingguan", "Menyesuaikan menu agar lebih nyaman"] },
      { phase: "Fase 2", title: "Pertumbuhan", duration: "Minggu 4–10", items: ["Menjaga surplus tetap stabil", "Meningkatkan kualitas latihan", "Menjaga protein tetap cukup", "Memantau progres performa"] },
      { phase: "Fase 3", title: "Evaluasi", duration: "Minggu 11–16", items: ["Menilai kualitas kenaikan berat", "Menyesuaikan surplus bila perlu", "Menjaga ritme makan tetap stabil", "Mengontrol kenaikan lemak berlebih"] }
    ],
    dailyTargets: [
      { label: "Kalori", value: "2.850 kkal", note: "Target surplus harian" },
      { label: "Protein", value: "150 g", note: "Penting untuk growth" },
      { label: "Lemak", value: "75 g", note: "Tambahan energi harian" },
      { label: "Karbohidrat", value: "365 g", note: "Sumber tenaga latihan" },
      { label: "Air Minum", value: "2.5–3.5 L", note: "Dukung performa dan recovery" },
      { label: "Langkah", value: "6.000–8.000", note: "Tetap aktif dengan seimbang" },
      { label: "Tidur", value: "7–9 jam", note: "Bagian penting dari recovery" },
      { label: "Workout", value: "4–5 sesi", note: "Utamakan latihan progresif" }
    ],
    guideTitle: "Panduan Bulking",
    mealGuide: [
      "Tambahkan kalori secara bertahap agar tubuh lebih mudah beradaptasi.",
      "Pilih makanan padat energi yang tetap nyaman dimakan.",
      "Pastikan protein hadir di setiap waktu makan.",
      "Jangan melewatkan makan setelah latihan.",
      "Jaga surplus tetap stabil, bukan berlebihan."
    ],
    expectations: [
      { title: "Awal Program", text: "Tubuh mulai menyesuaikan diri dengan asupan yang lebih tinggi dan ritme makan yang lebih teratur." },
      { title: "Minggu Menengah", text: "Performa latihan mulai meningkat dan progres kenaikan berat mulai lebih terlihat." },
      { title: "Akhir Program", text: "Fokus berpindah ke kualitas kenaikan massa tubuh, bukan sekadar angka timbangan." }
    ],
    tips: [
      "Jangan langsung menaikkan kalori terlalu besar di awal.",
      "Gunakan menu yang praktis agar pola makan lebih mudah dijaga.",
      "Pantau performa latihan selain angka berat badan.",
      "Pastikan tidur cukup agar recovery berjalan optimal.",
      "Naik bertahap jauh lebih baik daripada terlalu agresif."
    ],
    faqs: [
      { q: "Apakah bulking berarti bebas makan apa saja?", a: "Tidak. Kualitas asupan tetap penting agar kenaikan berat lebih mendukung pertumbuhan massa tubuh." },
      { q: "Kalau berat belum naik, apa yang harus dilakukan?", a: "Evaluasi kembali konsistensi target kalori, frekuensi makan, dan apakah surplus benar-benar tercapai." },
      { q: "Apakah harus latihan setiap hari?", a: "Tidak. Yang penting adalah latihan yang progresif, teknik yang baik, dan recovery yang cukup." }
    ]
  },
  maintenance: {
    badge: "Maintenance",
    heroTitle: "Your Personal Tracker",
    heroDescription:
      "Selesaikan target harianmu dan unlock versi terbaik dari dirimu.",
    summaryTitle: "Program Maintenance",
    summaryDescription:
      "Fokus pada keseimbangan pola makan, aktivitas, dan kebiasaan harian yang berkelanjutan.",
    stats: { bmi: "21.9", idealWeight: "60–69 kg", status: "Stabil" },
    highlights: [
      { label: "Target Kalori", value: "2.250 kkal", description: "Kalori seimbang untuk menjaga kestabilan." },
      { label: "Durasi Program", value: "Berkelanjutan", description: "Menjadi bagian dari pola hidup harian." },
      { label: "Fokus Harian", value: "Keseimbangan", description: "Menjaga ritme makan, tidur, dan aktivitas." },
      { label: "Fokus Utama", value: "Stability", description: "Menjaga hasil tanpa tekanan berlebih." }
    ],
    focusAreas: [
      { title: "Kalori yang Seimbang", text: "Target kalori dibuat agar berat badan tetap relatif stabil tanpa perubahan ekstrem." },
      { title: "Pola Makan Fleksibel", text: "Program ini cocok untuk menjaga hasil sambil tetap nyaman menjalani keseharian." },
      { title: "Aktivitas Tetap Konsisten", text: "Aktivitas harian dan olahraga tetap dijaga agar tubuh tetap bugar dan stabil." },
      { title: "Rutinitas yang Berkelanjutan", text: "Yang diutamakan adalah pola hidup yang mudah dipertahankan dalam jangka panjang." }
    ],
    roadmap: [
      { phase: "Fase 1", title: "Stabilisasi", duration: "Minggu 1–2", items: ["Menjaga jadwal makan tetap rapi", "Memantau kestabilan berat badan", "Menjaga ritme tidur dan aktivitas", "Mengurangi pola ekstrem"] },
      { phase: "Fase 2", title: "Konsistensi", duration: "Minggu 3–6", items: ["Menjaga pola makan yang fleksibel", "Memastikan aktivitas tetap berjalan", "Memantau energi dan fokus", "Membangun kebiasaan jangka panjang"] },
      { phase: "Fase 3", title: "Lifestyle", duration: "Minggu 7+", items: ["Menjadikan rutinitas sehat sebagai pola normal", "Menyesuaikan asupan bila kondisi berubah", "Menjaga hasil tanpa tekanan", "Menikmati fleksibilitas yang tetap terkontrol"] }
    ],
    dailyTargets: [
      { label: "Kalori", value: "2.250 kkal", note: "Target keseimbangan harian" },
      { label: "Protein", value: "125 g", note: "Bantu menjaga komposisi tubuh" },
      { label: "Lemak", value: "65 g", note: "Untuk keseimbangan energi" },
      { label: "Karbohidrat", value: "275 g", note: "Menunjang aktivitas harian" },
      { label: "Air Minum", value: "2.5–3 L", note: "Jaga hidrasi dan fokus" },
      { label: "Langkah", value: "7.000–10.000", note: "Tetap aktif setiap hari" },
      { label: "Tidur", value: "7–8 jam", note: "Menjaga ritme tubuh tetap stabil" },
      { label: "Workout", value: "3–4 sesi", note: "Jaga kebugaran tetap terpelihara" }
    ],
    guideTitle: "Panduan Maintenance",
    mealGuide: [
      "Gunakan pola makan yang fleksibel tapi tetap punya struktur.",
      "Pertahankan protein harian agar kualitas tubuh tetap terjaga.",
      "Jangan terlalu sering makan berlebihan hanya karena merasa stabil.",
      "Jaga ritme makan, tidur, dan aktivitas tetap seimbang.",
      "Fokus pada pola yang nyaman dijalankan jangka panjang."
    ],
    expectations: [
      { title: "Awal Program", text: "Fokus utamanya adalah menjaga kestabilan, bukan mengejar perubahan besar dalam waktu singkat." },
      { title: "Minggu Menengah", text: "Rutinitas mulai terasa lebih nyaman, stabil, dan mudah dipertahankan." },
      { title: "Jangka Panjang", text: "Tujuannya adalah membuat hasil yang sudah dicapai tetap terjaga secara konsisten." }
    ],
    tips: [
      "Maintenance tetap butuh ritme, bukan berarti bebas tanpa arah.",
      "Pantau perubahan tren berat secara berkala.",
      "Jaga pola makan tetap fleksibel tapi sadar porsi.",
      "Tetap prioritaskan aktivitas, tidur, dan hidrasi.",
      "Rutinitas yang stabil lebih penting daripada metode yang rumit."
    ],
    faqs: [
      { q: "Apakah maintenance berarti tidak perlu menghitung apa pun lagi?", a: "Tidak harus detail, tetapi tetap perlu sadar terhadap porsi, frekuensi makan, dan aktivitas." },
      { q: "Bagaimana kalau berat naik sedikit?", a: "Fluktuasi kecil itu normal. Yang penting adalah melihat tren beberapa minggu, bukan satu hari." },
      { q: "Apakah olahraga tetap penting saat maintenance?", a: "Ya. Aktivitas tetap penting untuk menjaga kebugaran, energi, dan komposisi tubuh." }
    ]
  }
};

function normalizeGoal(goal: string): GoalKey | null {
  if (goal === "diet") return "diet";
  if (goal === "bulking") return "bulking";
  if (goal === "maintenance") return "maintenance";
  return null;
}

function TabButton({
  active,
  label,
  onClick
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2.5 text-sm font-semibold transition",
        active
          ? "bg-[#E85002] text-white shadow-[0_18px_40px_rgba(232,80,2,0.20)]"
          : "border border-white/10 bg-white/5 text-[#D0D0D0] hover:bg-white/10 hover:text-white"
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function ProgramGoalPage({
  params
}: {
  params: { goal: string };
}) {
  const goal = normalizeGoal(params.goal);

  if (!goal) {
    notFound();
  }

  const content = goalContent[goal];
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const tabs = useMemo(
    () => [
      { key: "overview" as TabKey, label: "Overview" },
      { key: "focus" as TabKey, label: "Focus" },
      { key: "roadmap" as TabKey, label: "Roadmap" },
      { key: "targets" as TabKey, label: "Target Harian" },
      { key: "guide" as TabKey, label: "Panduan" },
      { key: "tips" as TabKey, label: "Tips" },
      { key: "faq" as TabKey, label: "FAQ" }
    ],
    []
  );

  return (
    <main className="pb-16">
      <section className="container-app pt-6 md:pt-10">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#2a1208]/70 via-black to-black">
          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10 xl:p-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-soft">{content.badge}</span>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl xl:text-6xl">
                  {content.heroTitle}
                </h1>
                <p className="max-w-xl text-sm leading-7 text-[#D7D7D7] md:text-base">
                  {content.heroDescription}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A7A7A7]">BMI</p>
                  <p className="mt-2 text-3xl font-bold text-[#F9F9F9]">
                    {content.stats.bmi}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A7A7A7]">
                    BERAT IDEAL
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#F9F9F9]">
                    {content.stats.idealWeight}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A7A7A7]">STATUS</p>
                  <p className="mt-2 text-3xl font-bold text-[#F9F9F9]">
                    {content.stats.status}
                  </p>
                </div>
              </div>
            </div>

            <Card className="h-full bg-[#050505]">
              <div className="flex h-full flex-col justify-center gap-5">
                <div>
                  <p className="text-sm font-medium text-[#FFD7C5]">Ringkasan</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">
                    {content.summaryTitle}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#D0D0D0]">
                    {content.summaryDescription}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-app mt-8">
        <div className="sticky top-4 z-20 rounded-[24px] border border-white/10 bg-[#050505]/90 p-3 backdrop-blur-xl">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                label={tab.label}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="section-title">Overview</h2>
              <p className="section-subtitle">
                Ringkasan inti program agar pengguna langsung memahami arah utama yang perlu dijaga.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.highlights.map((item) => (
                <Card key={item.label}>
                  <p className="text-sm text-[#A7A7A7]">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-[#D0D0D0]">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "focus" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="section-title">Focus</h2>
              <p className="section-subtitle">
                Hal-hal utama yang perlu diprioritaskan selama menjalani program.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {content.focusAreas.map((item) => (
                <Card key={item.title}>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#D0D0D0]">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="section-title">Roadmap</h2>
              <p className="section-subtitle">
                Program dibagi menjadi beberapa tahap agar terasa lebih ringan dan mudah diikuti.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {content.roadmap.map((step) => (
                <Card key={step.title} className="relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#E85002]/10 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="badge-soft">{step.phase}</span>
                      <span className="text-sm text-[#A7A7A7]">{step.duration}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-white">{step.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {step.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-[#D0D0D0]">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[#E85002]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "targets" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="section-title">Target Harian</h2>
              <p className="section-subtitle">
                Target praktis yang bisa dijaga dalam penggunaan sehari-hari.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.dailyTargets.map((item) => (
                <Card key={item.label}>
                  <p className="text-sm text-[#A7A7A7]">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#D0D0D0]">{item.note}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "guide" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card>
              <h2 className="section-title">{content.guideTitle}</h2>
              <p className="section-subtitle">
                Panduan singkat agar program lebih mudah dijalankan dalam rutinitas harian.
              </p>

              <div className="mt-8 space-y-4">
                {content.mealGuide.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E85002]/15 text-sm font-bold text-[#FFD7C5]">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-[#E3E3E3]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="section-title">Ekspektasi</h2>
              <p className="section-subtitle">
                Gambaran progres agar pengguna punya ekspektasi yang lebih sehat dan realistis.
              </p>

              <div className="mt-8 space-y-4">
                {content.expectations.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#D0D0D0]">{item.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="section-title">Tips</h2>
              <p className="section-subtitle">
                Saran praktis agar program lebih nyaman dan lebih konsisten dijalankan.
              </p>
            </div>

            <Card>
              <div className="space-y-3">
                {content.tips.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#E85002]" />
                    <p className="text-sm leading-7 text-[#E3E3E3]">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="section-title">FAQ</h2>
              <p className="section-subtitle">
                Jawaban singkat untuk pertanyaan yang paling sering muncul.
              </p>
            </div>

            <div className="space-y-4">
              {content.faqs.map((item) => (
                <Card key={item.q}>
                  <h3 className="text-base font-semibold text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#D0D0D0]">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="container-app mt-16">
        <div className="flex justify-start">
          <Button href="/" size="lg">
            Kembali ke Analisis
          </Button>
        </div>
      </section>
    </main>
  );
}