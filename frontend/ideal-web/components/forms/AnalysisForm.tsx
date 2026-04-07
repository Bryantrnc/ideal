"use client";

import { useMemo, useState } from "react";

type Goal = "none" | "diet" | "bulking";
type Gender = "male" | "female";
type ActivityLevel = "low" | "moderate" | "high";

type FormState = {
  heightCm: string;
  weightKg: string;
  age: string;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: Goal;
};

type SubmittedState = {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: Goal;
};

function calculateResult(data: SubmittedState) {
  const h = data.heightCm / 100;
  const w = data.weightKg;
  const bmi = w / (h * h || 1);
  const min = 18.5 * h * h;
  const max = 24.9 * h * h;

  const bmr =
    data.gender === "male"
      ? 10 * w + 6.25 * data.heightCm - 5 * data.age + 5
      : 10 * w + 6.25 * data.heightCm - 5 * data.age - 161;

  const activityMultiplier =
    data.activityLevel === "high"
      ? 1.725
      : data.activityLevel === "moderate"
        ? 1.55
        : 1.2;

  const maintenanceCalories = bmr * activityMultiplier;

  const calories =
    data.goal === "diet"
      ? Math.round(maintenanceCalories - 400)
      : data.goal === "bulking"
        ? Math.round(maintenanceCalories + 300)
        : Math.round(maintenanceCalories);

  const category =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
        ? "Normal"
        : bmi < 30
          ? "Overweight"
          : "Obese";

  return {
    bmi: bmi.toFixed(1),
    min: min.toFixed(1),
    max: max.toFixed(1),
    calories,
    category
  };
}

export function AnalysisForm() {
  const [form, setForm] = useState<FormState>({
    heightCm: "170",
    weightKg: "65",
    age: "24",
    gender: "male",
    activityLevel: "moderate",
    goal: "none"
  });

  const [submitted, setSubmitted] = useState<SubmittedState | null>(null);
  const [error, setError] = useState("");

  const result = useMemo(() => {
    if (!submitted) return null;
    return calculateResult(submitted);
  }, [submitted]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleGenerate() {
    const heightCm = Number(form.heightCm);
    const weightKg = Number(form.weightKg);
    const age = Number(form.age);

    if (!heightCm || !weightKg || !age) {
      setError("Semua data wajib diisi terlebih dahulu.");
      return;
    }

    if (heightCm <= 0 || weightKg <= 0 || age <= 0) {
      setError("Masukkan data yang valid untuk tinggi, berat, dan usia.");
      return;
    }

    setError("");
    setSubmitted({
      heightCm,
      weightKg,
      age,
      gender: form.gender,
      activityLevel: form.activityLevel,
      goal: form.goal
    });
  }

  const showProgramCard =
    submitted !== null && result !== null && submitted.goal !== "none";

  const inputClass =
    "w-full rounded-[20px] border border-[#A7A7A7]/35 bg-[#F9F9F9] px-5 py-4 text-[17px] text-[#000000] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-[#646464] focus:border-[#E85002]/55 focus:ring-4 focus:ring-[#E85002]/10";

  const softLightCard =
    "rounded-[30px] border border-[#A7A7A7]/20 bg-gradient-to-br from-[#F9F9F9] via-[#F6F6F6] to-[#EFEFEF] p-6 text-black shadow-[0_24px_60px_rgba(0,0,0,0.18)]";

  const darkPreviewCard =
    "rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#090909] to-[#151515] p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.28)]";

  return (
    <section
      id="analysis-form"
      className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]"
    >
      <div className="relative overflow-hidden rounded-[36px] border border-[#A7A7A7]/20 bg-gradient-to-br from-[#F9F9F9] via-[#F6F6F6] to-[#F1F1F1] p-8 text-black shadow-[0_30px_90px_rgba(0,0,0,0.32)] md:p-10">
        <div className="pointer-events-none absolute -left-20 -top-14 h-56 w-56 rounded-full bg-[#E85002]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#C10801]/8 blur-3xl" />

        <div className="relative space-y-8">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-[#E85002]/20 bg-[#FFF3EC] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#E85002]">
              Ideal Analysis
            </span>

            <div>
              <h2 className="text-4xl font-bold tracking-tight text-[#000000] md:text-5xl">
                Analisis Tubuh
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#646464] md:text-base">
                Masukkan data tubuhmu untuk melihat hasil BMI dan program yang
                paling sesuai dengan tujuanmu.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333333]">
                Tinggi Badan (cm)
              </label>
              <input
                type="number"
                value={form.heightCm}
                onChange={(e) => updateField("heightCm", e.target.value)}
                placeholder="Contoh: 170"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333333]">
                Berat Badan (kg)
              </label>
              <input
                type="number"
                value={form.weightKg}
                onChange={(e) => updateField("weightKg", e.target.value)}
                placeholder="Contoh: 65"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333333]">
                Usia
              </label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder="Contoh: 24"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333333]">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => updateField("gender", e.target.value as Gender)}
                className={inputClass}
              >
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333333]">
                Aktivitas
              </label>
              <select
                value={form.activityLevel}
                onChange={(e) =>
                  updateField("activityLevel", e.target.value as ActivityLevel)
                }
                className={inputClass}
              >
                <option value="low">Rendah</option>
                <option value="moderate">Sedang</option>
                <option value="high">Tinggi</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#333333]">
                Program
              </label>
              <select
                value={form.goal}
                onChange={(e) => updateField("goal", e.target.value as Goal)}
                className={inputClass}
              >
                <option value="none">None</option>
                <option value="diet">Diet</option>
                <option value="bulking">Bulking</option>
              </select>
              <p className="pt-2 text-sm text-[#646464]">
                Pilih sesuai tujuanmu.
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-[#C10801]/20 bg-[#FFF1F0] px-4 py-3 text-sm text-[#C10801]">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#000000] via-[#C10801] to-[#F16001] px-8 py-4 text-base font-semibold text-white shadow-[0_22px_45px_rgba(232,80,2,0.24)] transition hover:scale-[1.01] hover:shadow-[0_24px_55px_rgba(232,80,2,0.30)]"
            >
              Generate Insight
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {!result ? (
          <>
            <div className={darkPreviewCard}>
              <p className="text-sm font-medium text-[#A7A7A7]">Preview Hasil</p>
              <h3 className="mt-4 text-3xl font-bold text-[#F9F9F9]">
                Hasil akan muncul di sini
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-[#A7A7A7]">
                Isi semua data, lalu klik <span className="text-white">Generate Insight</span> untuk melihat hasil analisis.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
                <p className="text-sm text-[#A7A7A7]">BMI</p>
                <p className="mt-3 text-4xl font-bold text-white">--</p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
                <p className="text-sm text-[#A7A7A7]">Kategori</p>
                <p className="mt-3 text-4xl font-bold text-white">--</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
              <p className="text-sm text-[#A7A7A7]">Rentang Berat Ideal</p>
              <p className="mt-3 text-4xl font-bold text-white">--</p>
            </div>
          </>
        ) : (
          <>
            <div className={softLightCard}>
              <p className="text-sm font-medium text-[#646464]">BMI</p>
              <p className="mt-3 text-5xl font-bold text-[#000000]">
                {result.bmi}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className={softLightCard}>
                <p className="text-sm font-medium text-[#646464]">Kategori BMI</p>
                <p className="mt-3 text-4xl font-bold text-[#000000]">
                  {result.category}
                </p>
              </div>

              {submitted && submitted.goal !== "none" && (
                <div className={softLightCard}>
                  <p className="text-sm font-medium text-[#646464]">Kalori Harian</p>
                  <p className="mt-3 text-4xl font-bold text-[#000000]">
                    {result.calories}
                  </p>
                </div>
              )}
            </div>

            <div className={softLightCard}>
              <p className="text-sm font-medium text-[#646464]">Rentang Berat Ideal</p>
              <p className="mt-3 text-4xl font-bold text-[#000000]">
                {result.min} - {result.max} kg
              </p>
            </div>

            {showProgramCard && submitted && (
              <div className={softLightCard}>
                <p className="text-xs uppercase tracking-[0.22em] text-[#E85002]">
                  PROGRAM {submitted.goal.toUpperCase()}
                </p>

                <h3 className="mt-4 text-2xl font-bold text-[#000000]">
                  Lanjut ke program
                </h3>

                <div className="mt-5 flex flex-col gap-4 rounded-[24px] border border-[#A7A7A7]/20 bg-white p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#000000]">
                      Buka halaman {submitted.goal}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#646464]">
                      Lihat panduan singkat yang sesuai dengan tujuanmu.
                    </p>
                  </div>

                  <a
                    href={`/program/${submitted.goal}?heightCm=${submitted.heightCm}&weightKg=${submitted.weightKg}&age=${submitted.age}&gender=${submitted.gender}&activityLevel=${submitted.activityLevel}&goal=${submitted.goal}`}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#000000] via-[#C10801] to-[#F16001] px-6 py-3 font-semibold text-white shadow-[0_16px_35px_rgba(232,80,2,0.18)] transition hover:scale-[1.01]"
                  >
                    View Program
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}