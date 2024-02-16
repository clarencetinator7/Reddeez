<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {

        $validateData = $request->validate([
            'username' => 'required|max:16|unique:users',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'
        ], [
            'password.regex' => 'Password must be a combination of uppercase, lowercase, number and special character (@,$,!,%,*,?,&)'
        ]);

        $validateData['display_name'] = $validateData['username'];

        $user = User::create($validateData);

        if ($user) {
            return new AuthResource($user);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User not created'
            ], 400);
        }
    }
}
