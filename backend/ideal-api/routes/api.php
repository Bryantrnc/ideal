<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\RecommendationController;

Route::post('/v1/analysis', [AnalysisController::class, 'store']);
Route::post('/v1/recommendation', [RecommendationController::class, 'store']);