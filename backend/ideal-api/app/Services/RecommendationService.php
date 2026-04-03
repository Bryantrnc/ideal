<?php

namespace App\Services;

class RecommendationService
{
    public function generate(
        string $goal,
        float $heightCm,
        float $weightKg,
        int $age,
        string $gender,
        string $activityLevel
    ): array {
        $bmr = $gender === 'male'
            ? (10 * $weightKg) + (6.25 * $heightCm) - (5 * $age) + 5
            : (10 * $weightKg) + (6.25 * $heightCm) - (5 * $age) - 161;

        $activityMultiplier = match ($activityLevel) {
            'high' => 1.725,
            'moderate' => 1.55,
            default => 1.2,
        };

        $maintenanceCalories = $bmr * $activityMultiplier;

        $targetCalories = match ($goal) {
            'diet' => $maintenanceCalories - 400,
            'bulking' => $maintenanceCalories + 300,
            default => $maintenanceCalories,
        };

        $protein = round($weightKg * ($goal === 'bulking' ? 2.0 : 1.8));
        $fat = round(($targetCalories * 0.25) / 9);
        $carbs = round(($targetCalories - ($protein * 4) - ($fat * 9)) / 4);

        return [
            'goal' => $goal,
            'estimatedCalories' => (int) round(max(1200, $targetCalories)),
            'suggestedProteinGrams' => (int) $protein,
            'suggestedFatGrams' => (int) $fat,
            'suggestedCarbsGrams' => (int) $carbs,
            'notes' => $this->notes($goal),
        ];
    }

    private function notes(string $goal): array
    {
        return match ($goal) {
            'diet' => [
                'Gunakan defisit kalori moderat.',
                'Prioritaskan protein tinggi dan tidur cukup.',
            ],
            'bulking' => [
                'Gunakan surplus kalori ringan.',
                'Kombinasikan dengan progressive overload.',
            ],
            default => [
                'Pantau berat badan mingguan.',
                'Jaga konsistensi aktivitas dan pola makan.',
            ],
        };
    }
}