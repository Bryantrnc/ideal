"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Goal = "none" | "diet" | "bulking";
type Gender = "male" | "female";
type ActivityLevel = "low" | "moderate" | "high";

type ResultState = {
  bmi: string;
  bmiCategory: string;
  idealMin: string;
  idealMax: string;
  calories: number;
  programTitle: string;
};

export function AnalysisForm() {
  const router = useRouter();

  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("65");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState<Gender>("male");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("none");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const result = useMemo<ResultState>(() => {
    const hCm = Number(heightCm);
    const h = hCm / 100;
    const w = Number(weightKg);
    const userAge = Number(age);

    if (!hCm || !w || !userAge || h <= 0 || w <= 0 || userAge <= 0) {
      return {
        bmi: "0.0",
        bmiCategory: "-",
        idealMin: "0.0",
        idealMax: "0.0",
        calories: 0,
        programTitle: "Program",
      };
    }

    const bmi = w / (h * h);
    const idealMin = 18.5 * h * h;
    const idealMax = 24.9 * h * h;

    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * hCm - 5 * userAge + 5
        : 10 * w + 6.25 * hCm - 5 * userAge - 161;

    const activityMultiplier =
      activityLevel === "high" ? 1.725 : activityLevel === "moderate" ? 1.55 : 1.2;

    const baseCalories = bmr * activityMultiplier;
    const calories = Math.round(
      baseCalories + (goal === "diet" ? -400 : goal === "bulking" ? 300 : 0)
    );

    let bmiCategory = "Normal";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi >= 25 && bmi < 30) bmiCategory = "Overweight";
    else if (bmi >= 30) bmiCategory = "Obesitas";

    let programTitle = "Program";
    if (goal === "diet") programTitle = "Program Diet";
    if (goal === "bulking") programTitle = "Program Bulking";

    return {
      bmi: bmi.toFixed(1),
      bmiCategory,
      idealMin: idealMin.toFixed(1),
      idealMax: idealMax.toFixed(1),
      calories,
      programTitle,
    };
  }, [heightCm, weightKg, age, gender, activityLevel, goal]);

  const handleGenerate = async () => {
    const h = Number(heightCm);
    const w = Number(weightKg);
    const userAge = Number(age);

    if (!h || !w || !userAge || h <= 0 || w <= 0 || userAge <= 0) {
      setError("Mohon isi data dengan benar.");
      setHasGenerated(false);
      return;
    }

    setError("");
    setIsLoading(true);
    setHasGenerated(false);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    setHasGenerated(true);
  };

  const goToProgramPage = () => {
    const params = new URLSearchParams({
      heightCm,
      weightKg,
      age,
      gender,
      activityLevel,
      goal,
    });

    router.push(`/program/${goal}?${params.toString()}`);
  };

  return (
    <section
  id="analysis-section"
  className="grid scroll-mt-8 gap-6 xl:grid-cols-[1.08fr_0.92fr]"
>
      <div className="soft-card rounded-[30px] border border-[#DCCBB8] bg-[#FFF4E8] p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#2C0901] md:text-4xl">
              IDEAL ANALYSIS
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#8A7464]">
              Masukan Data Fisik Anda Untuk Di Analisis
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Tinggi Badan (cm)" value={heightCm} onChange={setHeightCm} />
            <Field label="Berat Badan (kg)" value={weightKg} onChange={setWeightKg} />
            <Field label="Usia" value={age} onChange={setAge} />

            <SelectField
              label="Gender"
              value={gender}
              onChange={(value) => setGender(value as Gender)}
              options={[
                { label: "Pria", value: "male" },
                { label: "Wanita", value: "female" },
              ]}
            />

            <SelectField
              label="Aktivitas"
              value={activityLevel}
              onChange={(value) => setActivityLevel(value as ActivityLevel)}
              options={[
                { label: "Rendah", value: "low" },
                { label: "Sedang", value: "moderate" },
                { label: "Tinggi", value: "high" },
              ]}
            />

            <div>
              <label className="mb-2 block text-sm text-[#8A7464]">Program</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as Goal)}
                className="w-full rounded-2xl border border-[#DCCBB8] bg-[#F0E0C7] px-5 py-4 text-lg text-[#2C0901] outline-none transition focus:border-[#4E1E15] focus:shadow-[0_0_0_4px_rgba(180,142,105,0.14)]"
              >
                <option value="none">None</option>
                <option value="diet">Diet</option>
                <option value="bulking">Bulking</option>
              </select>
              <p className="mt-3 text-sm leading-6 text-[#8A7464]">Pilih sesuai tujuanmu.</p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-[#c78f78] bg-[#fff0ea] px-4 py-3 text-sm text-[#8a3d22]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="glow-button glow-dark inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-[#4E1E15] px-6 py-4 text-base font-bold text-[#FFF4E8] hover:bg-[#5f271b] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Generating Insight..." : "Generate Insight"}
            </button>

            {isLoading && (
              <div className="flex items-center gap-3 text-sm text-[#8A7464]">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#B48E69]" />
                Memproses hasil...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {!hasGenerated ? (
          <div className="soft-card rounded-[30px] border border-[#DCCBB8] bg-[#FFF4E8] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#B48E69]">Hasil</p>
            <h3 className="mt-4 text-2xl font-bold text-[#2C0901]">
              Hasil analisis akan tampil di sini
            </h3>
            <p className="mt-3 max-w-xl leading-8 text-[#8A7464]">
              Klik Generate Insight untuk melihat hasilnya.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="BMI" value={result.bmi} accent />
              <ResultCard label="Kategori BMI" value={result.bmiCategory} />
              <ResultCard
                label="Rentang Berat Ideal"
                value={`${result.idealMin} - ${result.idealMax} kg`}
                className="sm:col-span-2"
              />

            </div>

            <div className="soft-card rounded-[30px] border border-[#DCCBB8] bg-[#FFF4E8] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[#B48E69]">
                {result.programTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[#2C0901]">Lanjut ke program</h3>

              {goal === "none" ? (
                <div className="mt-5 rounded-2xl bg-[#F0E0C7] px-5 py-4 text-sm leading-7 text-[#8A7464]">
                  Analisis dasar aktif. Tidak ada program tambahan.
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#F0E0C7] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-[#2C0901]">
                      {goal === "diet" ? "Buka halaman diet" : "Buka halaman bulking"}
                    </p>
                    <p className="mt-1 text-sm text-[#8A7464]">
                      Lihat panduan singkat yang sesuai dengan tujuanmu.
                    </p>
                  </div>

                  <button
  type="button"
  onClick={goToProgramPage}
  className="glow-button glow-dark inline-flex whitespace-nowrap items-center justify-center rounded-2xl bg-[#4E1E15] px-5 py-3 text-sm font-bold text-[#FFF4E8] hover:bg-[#5f271b]"
>
  View Program
</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[#8A7464]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#DCCBB8] bg-[#F0E0C7] px-5 py-4 text-lg text-[#2C0901] outline-none transition focus:border-[#4E1E15] focus:shadow-[0_0_0_4px_rgba(180,142,105,0.14)]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[#8A7464]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#DCCBB8] bg-[#F0E0C7] px-5 py-4 text-lg text-[#2C0901] outline-none transition focus:border-[#4E1E15] focus:shadow-[0_0_0_4px_rgba(180,142,105,0.14)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultCard({
  label,
  value,
  accent = false,
  className = "",
}: {
  label: string;
  value: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={`soft-card rounded-[24px] border border-[#DCCBB8] bg-[#FFF4E8] p-6 ${className}`}>
      <p className="text-sm text-[#8A7464]">{label}</p>
      <p className={`mt-3 text-3xl font-extrabold leading-tight md:text-4xl ${accent ? "text-[#4E1E15]" : "text-[#2C0901]"}`}>
        {value}
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[24px] bg-[#F0E0C7] p-5">
      <div className="h-4 w-24 animate-pulse rounded bg-[#dccbb8]" />
      <div className="mt-4 h-10 w-36 animate-pulse rounded bg-[#dccbb8]" />
    </div>
  );
}