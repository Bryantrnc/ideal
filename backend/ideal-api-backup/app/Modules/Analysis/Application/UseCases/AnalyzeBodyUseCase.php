<?php

namespace App\Modules\Analysis\Application\UseCases;

use App\Modules\Analysis\Domain\Entities\BodyMetrics;
use App\Modules\Analysis\Domain\Services\BodyAnalysisService;

class AnalyzeBodyUseCase
{
    public function __construct(
        private readonly BodyAnalysisService $analysisService = new BodyAnalysisService()
    ) {}

    public function execute(array $payload): array
    {
        $metrics = new BodyMetrics(
            (float) ($payload['heightCm'] ?? 0),
            (float) ($payload['weightKg'] ?? 0),
        );

        return $this->analysisService->analyze($metrics);
    }
}
