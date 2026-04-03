<?php

namespace App\Modules\Recommendation\Domain\Services;

use App\Modules\Recommendation\Domain\Entities\RecommendationProfile;

class RecommendationEngine
{
    public function generate(RecommendationProfile $profile): array
    {
        $bmr = $profile->gender === 'male'
            ? (10 * $profile->weightKg) + (6.25 * $profile->heightCm) - (5 * $profile->age) + 5
            : (10 * $profile->weightKg) + (6.25 * $profile->heightCm) - (5 * $profile->age) - 161;

        $activityMultiplier = match ($profile->activityLevel) {
            'high' => 1.725,
            'moderate' => 1.55,
            default => 1.2
        };

        $maintenance = $bmr * $activityMultiplier;
        $calorieTarget = match ($profile->goal) {
            'diet' => $maintenance - 400,
            'bulking' => $maintenance + 300,
            default => $maintenance
        };

        $protein = round($profile->weightKg * ($profile->goal === 'bulking' ? 2.0 : 1.8));
        $fat = round(($calorieTarget * 0.25) / 9);
        $carbs = round(($calorieTarget - ($protein * 4) - ($fat * 9)) / 4);

        return [
            'goal' => $profile->goal,
            'estimatedCalories' => (int) round(max(1200, $calorieTarget)),
            'suggestedProteinGrams' => (int) $protein,
            'suggestedFatGrams' => (int) $fat,
            'suggestedCarbsGrams' => (int) $carbs,
            'notes' => $this->notes($profile->goal),
        ];
    }

    private function notes(string $goal): array
    {
        return match ($goal) {
            'diet' => [
                'Gunakan defisit kalori moderat.',
                'Prioritaskan protein tinggi dan tidur cukup.'
            ],
            'bulking' => [
                'Gunakan surplus kalori ringan.',
                'Kombinasikan dengan progressive overload.'
            ],
            default => [
                'Pantau berat badan mingguan.',
                'Jaga konsistensi aktivitas dan pola makan.'
            ],
        };
    }
}
