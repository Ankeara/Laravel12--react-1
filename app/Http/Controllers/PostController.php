<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(){

        $post = Post::latest()->get()->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'user_id' => $post->user_id,
                'created_at' => $post->created_at->diffForHumans(),
                'updated_at' => $post->updated_at->diffForHumans(),
            ];
        });

        return Inertia::render('Posts/Index', [
            'posts' => $post,
        ]);
    }

    public function create(){
        return Inertia::render('Posts/Create', [
            'users' => User::all(),
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ]);

        Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);
        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post){
        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post){
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ]);
        $post->update($request->all());
        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post){
        $post->delete();
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }

}
