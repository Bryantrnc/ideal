<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AnalysisService;

class AnalysisController extends Controller
{
    protected AnalysisService $analysisService;

    public function __construct(AnalysisService $analysisService)
    {
        $this->analysisService = $analysisService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'heightCm' => ['required', 'numeric', 'min:1'],
            'weightKg' => ['required', 'numeric', 'min:1'],
        ]);

        $result = $this->analysisService->analyze(
            (float) $validated['heightCm'],
            (float) $validated['weightKg']
        );

        return response()->json([
            'message' => 'Analisis berhasil',
            'data' => $result,
        ]);
    }
}