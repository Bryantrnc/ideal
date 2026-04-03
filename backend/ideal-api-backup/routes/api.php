<?php

use App\Modules\Analysis\Interfaces\Http\Controllers\AnalysisController;
use App\Modules\Recommendation\Interfaces\Http\Controllers\RecommendationController;

return [
    ['method' => 'GET', 'uri' => '/api/v1/health', 'action' => function () {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'ok', 'service' => 'ideal-api']);
    }],
    ['method' => 'POST', 'uri' => '/api/v1/analysis', 'action' => [AnalysisController::class, 'handle']],
    ['method' => 'POST', 'uri' => '/api/v1/recommendation', 'action' => [RecommendationController::class, 'handle']],
];
