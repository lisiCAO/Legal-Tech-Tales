'use client';
// components/ArticleView.tsx
import React, { useState, useEffect } from 'react';

import CommentForm from './CommentForm';

interface Article {
  _id: string;
  title: string;
  authorId: string;
  slug: string;
  createdAt: string;
  body: string;
}

interface Comment {
  authorId: string;
  body: string;
  createdAt: string;
}

const ArticleView = ({ slug }: { slug: string }) => {
  const [authorName, setAuthorName] = useState('');
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleRes = await fetch(`http://localhost:3000/api/articles/${slug}`);
      const article = await articleRes.json();
      setArticle(article);
      const commentsRes = await fetch(`http://localhost:3000/api/comments/${article._id}`, { credentials: 'include' });
      const comments = await commentsRes.json();
      setComments(comments);
    };
    fetchArticle();
  }, [slug]);

  useEffect(() => {
    // Fetch author name
    const fetchAuthor = async () => {
      if (article) {
        const response = await fetch(`http://localhost:3000/api/users/${article.authorId}`);
        const data = await response.json();
        setAuthorName(data.name);
      }
    };
    fetchAuthor();
  }, [article]);

  if (!article) {
    return null; // or render a loading state
  }

  return (
    <div>
      <h1 className="text-3xl font-bold my-6">{article.title}</h1>
      <p className="mb-2">Posted by {authorName} on {article.createdAt}</p>
      <article className="mb-6">{article.body}</article>
      <section className="mb-6">
        <h2 className="text-xl font-bold">My comment:</h2>
        <CommentForm articleId={article._id} />
      </section>
      <section>
        <h2 className="text-xl font-bold">Previous comments:</h2>
        {comments.map((comment, _id) => (
          <div key={_id} className="mb-4">
            <div className="font-semibold">{comment.authorId}</div> {/* Ideally, you would replace authorId with author's name */}
            <p>{comment.body}</p>
            <time className="text-sm text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</time>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ArticleView;
