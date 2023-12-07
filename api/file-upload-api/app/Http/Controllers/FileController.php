<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'files.*' => 'required|mimes:jpeg,png,txt,pdf|max:2048',
        ]);

        $files = $request->file('files');

        foreach ($files as $file) {
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('uploads', $fileName, 'public');
        }

        return response()->json(['success' => true, 'message' => 'Files uploaded successfully.']);
    }

    public function totalAttachments()
    {
        $fileCount = count(\File::files(public_path('uploads')));
        return response()->json(['totalAttachments' => $fileCount]);
    }
}

