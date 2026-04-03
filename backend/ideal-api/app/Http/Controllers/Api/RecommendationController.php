<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\RecommendationService;

class RecommendationController extends Controller
{
    protected RecommendationService $recommendationService;

    public function __construct(RecommendationService $recommendationService)
    {
        $this->recommendationService = $recommendationService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'goal' => ['required', 'string'],
            'heightCm' => ['required', 'numeric', 'min:1'],
            'weightKg' => ['required', 'numeric', 'min:1'],
            'age' => ['required', 'integer', 'min:1'],
            'gender' => ['required', 'string'],
            'activityLevel' => ['required', 'string'],
        ]);

        $result = $this->recommendationService->generate(
            goal: $validated['goal'],
            heightCm: (float) $validated['heightCm'],
            weightKg: (float) $validated['weightKg'],
            age: (int) $validated['age'],
            gender: $validated['gender'],
            activityLevel: $validated['activityLevel'],
        );

        return response()->json([
            'message' => 'Rekomendasi berhasil dibuat',
            'data' => $result,
        ]);
    }
}