<?php

namespace App\Services;

class AnalysisService
{
    public function analyze(float $heightCm, float $weightKg): array
    {
        $heightM = $heightCm / 100;

        $bmi = $weightKg / ($heightM * $heightM);
        $idealWeightMinKg = 18.5 * ($heightM * $heightM);
        $idealWeightMaxKg = 24.9 * ($heightM * $heightM);

        return [
            'bmi' => round($bmi, 1),
            'bmiCategory' => $this->getBmiCategory($bmi),
            'idealWeightMinKg' => round($idealWeightMinKg, 1),
            'idealWeightMaxKg' => round($idealWeightMaxKg, 1),
        ];
    }

    private function getBmiCategory(float $bmi): string
    {
        if ($bmi < 18.5) {
            return 'underweight';
        }

        if ($bmi < 25) {
            return 'normal';
        }

        if ($bmi < 30) {
            return 'overweight';
        }

        return 'obese';
    }
}