<?php

namespace App\Modules\Recommendation\Application\UseCases;

use App\Modules\Recommendation\Domain\Entities\RecommendationProfile;
use App\Modules\Recommendation\Domain\Services\RecommendationEngine;

class GenerateRecommendationUseCase
{
    public function __construct(
        private readonly RecommendationEngine $engine = new RecommendationEngine()
    ) {}

    public function execute(array $payload): array
    {
        $profile = new RecommendationProfile(
            (string) ($payload['goal'] ?? 'maintenance'),
            (float) ($payload['weightKg'] ?? 0),
            (float) ($payload['heightCm'] ?? 0),
            (int) ($payload['age'] ?? 0),
            (string) ($payload['gender'] ?? 'male'),
            (string) ($payload['activityLevel'] ?? 'low'),
        );

        return $this->engine->generate($profile);
    }
}
