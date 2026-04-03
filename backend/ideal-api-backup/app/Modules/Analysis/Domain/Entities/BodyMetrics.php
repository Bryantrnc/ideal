<?php

namespace App\Modules\Analysis\Domain\Entities;

class BodyMetrics
{
    public function __construct(
        public readonly float $heightCm,
        public readonly float $weightKg
    ) {}
}
