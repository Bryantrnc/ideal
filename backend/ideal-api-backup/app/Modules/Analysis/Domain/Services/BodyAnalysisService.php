<?php

namespace App\Modules\Analysis\Domain\Services;

use App\Modules\Analysis\Domain\Entities\BodyMetrics;

class BodyAnalysisService
{
    public function analyze(BodyMetrics $metrics): array
    {
        $heightMeter = $metrics->heightCm / 100;
        $bmi = $metrics->weightKg / ($heightMeter * $heightMeter);
        $idealMin = 18.5 * ($heightMeter * $heightMeter);
        $idealMax = 24.9 * ($heightMeter * $heightMeter);

        return [
            'bmi' => round($bmi, 1),
            'bmiCategory' => $this->mapCategory($bmi),
            'idealWeightMinKg' => round($idealMin, 1),
            'idealWeightMaxKg' => round($idealMax, 1),
        ];
    }

    private function mapCategory(float $bmi): string
    {
        if ($bmi < 18.5) return 'underweight';
        if ($bmi < 25) return 'normal';
        if ($bmi < 30) return 'overweight';
        return 'obese';
    }
}
