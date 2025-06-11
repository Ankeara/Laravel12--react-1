import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Post',
        href: '/posts/edit', // Lowercase for consistency
    },
];

export default function EditPost({post}) {
    const { data, setData, put, errors , reset, processing} = useForm({
        title: post.title || '',
        content: post.content || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('posts.update', post.id), );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Create New Post</h1>
                    <Link href="/posts" className="bg-gray-500 text-white px-4 py-1 rounded">
                        Back to Posts
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={4}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
                    </div>
                    <button
                        type="submit"
                        aria-label="Create new post"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {processing ? 'Updating...' : 'Update Post'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
