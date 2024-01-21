'use client';
// components/ArticleList.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
    _id: string;
    title: string;
    body: string;
    slug: string;
    authorName: string;
    createdAt: string; // Fix the type of createdAt to string
}

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]); // Specify the type of articles as Article[]

    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('http://localhost:3000/api/articles');
            const data = await res.json();
            setArticles(data);
        };

        fetchArticles();
    }, []);

    return (
        <div>
            {articles.map((article) => (
                <article key={article._id} className="mb-6">
                    <Link href={`/articles/${article.slug}`}>
                        <p className="text-xl font-bold">{article.title}</p>
                    </Link>
                    <p>
                        Posted by {article.authorName} on{' '}
                        {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                    <p>{article.body.substring(0, 200)}...</p>
                </article>
            ))}
        </div>
    );
};

export default ArticleList;
