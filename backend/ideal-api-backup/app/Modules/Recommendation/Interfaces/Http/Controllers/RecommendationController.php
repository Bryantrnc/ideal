<?php

namespace App\Modules\Recommendation\Interfaces\Http\Controllers;

use App\Modules\Recommendation\Application\UseCases\GenerateRecommendationUseCase;

class RecommendationController
{
    public function handle(): void
    {
        $payload = json_decode(file_get_contents('php://input'), true) ?? [];
        $required = ['goal', 'weightKg', 'heightCm', 'age', 'gender', 'activityLevel'];

        foreach ($required as $field) {
            if (!isset($payload[$field])) {
                header('Content-Type: application/json', true, 422);
                echo json_encode(['message' => "Field {$field} wajib diisi"]);
                return;
            }
        }

        $useCase = new GenerateRecommendationUseCase();
        $result = $useCase->execute($payload);

        header('Content-Type: application/json');
        echo json_encode([
            'message' => 'Rekomendasi berhasil dibuat',
            'data' => $result,
        ]);
    }
}
