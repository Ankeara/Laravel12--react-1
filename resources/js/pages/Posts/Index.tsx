// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head , Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts({posts}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="container ms-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                    <Link href="/posts/create" className="bg-gray-500 text-white px-4 py-1 rounded">
                        Create New Post
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className='w-full table-auto shadow-lg bg-white dark:bg-neutral-800 rounded-lg'>
                        <thead>
                            <tr className="bg-gray-200 dark:bg-neutral-700">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Content</th>
                                <th className="px-4 py-2 text-left">Published At</th>
                                <th className="px-4 py-2 text-left">Updated At</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b dark:border-neutral-600">
                                    <td className="px-4 py-2">{post.id}</td>
                                    <td className="px-4 py-2">{post.title}</td>
                                    <td className="px-4 py-2">{post.content}</td>
                                    <td className="px-4 py-2">{post.created_at}</td>
                                    <td className="px-4 py-2">{post.updated_at}</td>
                                    <td className="px-4 py-2">
                                        <Link href={`/posts/${post.id}/edit`} className="text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <span className="mx-2">|</span>
                                        <Link href={`/posts/${post.id}`} method='delete' as='button' onClick={(e) => {if(!confirm('Are you sure you want to delete this post?')) e.preventDefault()}} className="text-red-500 hover:underline">
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
