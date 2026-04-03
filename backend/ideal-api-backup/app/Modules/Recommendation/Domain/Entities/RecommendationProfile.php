<?php

namespace App\Modules\Recommendation\Domain\Entities;

class RecommendationProfile
{
    public function __construct(
        public readonly string $goal,
        public readonly float $weightKg,
        public readonly float $heightCm,
        public readonly int $age,
        public readonly string $gender,
        public readonly string $activityLevel
    ) {}
}
