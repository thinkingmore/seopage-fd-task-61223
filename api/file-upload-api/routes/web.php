<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['web','cors'])->group(function () {
    Route::post('/upload', 'FileController@upload')->withoutMiddleware(['web', 'StartSession']);
    Route::get('/totalAttachments', [FileController::class, 'totalAttachments']);
});

