<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function login(Request $request)
    {
        $validateData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        // LOGIN SPA AUTH
        if (!auth()->attempt($validateData)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }


        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Log in successful',
            'user' => new AuthResource(Auth::user())
        ]);
    }

    public function logout(Request $request)
    {

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        // $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out'
        ]);
    }

    // public function test()
    // {
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'You accessed this',
    //     ]);

    //     // Return the logged in user

    //     // return new AuthResource(Auth::user());
    // }
}
