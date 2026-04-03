<?php

namespace App\Modules\Analysis\Interfaces\Http\Controllers;

use App\Modules\Analysis\Application\UseCases\AnalyzeBodyUseCase;

class AnalysisController
{
    public function handle(): void
    {
        $payload = json_decode(file_get_contents('php://input'), true) ?? [];

        if (!isset($payload['heightCm'], $payload['weightKg'])) {
            header('Content-Type: application/json', true, 422);
            echo json_encode(['message' => 'heightCm dan weightKg wajib diisi']);
            return;
        }

        $useCase = new AnalyzeBodyUseCase();
        $result = $useCase->execute($payload);

        header('Content-Type: application/json');
        echo json_encode([
            'message' => 'Analisis berhasil',
            'data' => $result,
        ]);
    }
}
