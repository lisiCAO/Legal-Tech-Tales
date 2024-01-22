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
    createdAt: string; 
}

const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]); 
    const [error, setError] =useState('');
    useEffect(() => {
        const fetchArticles = async () => {
            try{
                const res = await fetch('http://localhost:3000/api/articles');
            if(!res.ok) {
                throw new Error('Server responded with an error!');
            }
            const data = await res.json();
            setArticles(data);
            } catch (error:any) {
                setError(error.message);
            }
        };

        fetchArticles();
    }, []);
    if(error) {
        return <div className="text-red-600">{error}</div>
    }

    return (
        <div>
            {articles.map((article) => (
                <article key={article._id} className="mb-6 p-4 bg-custom-cream rounded-lg shadow">
                    <Link href={`/articles/${article.slug}`}>
                        <h2 className="text-xl font-bold text-custom-darkorange cursor-pointer">{article.title}</h2>
                    </Link>
                    <p className="text-custom-green">
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
