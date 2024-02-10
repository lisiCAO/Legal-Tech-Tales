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
  _id: string;
  name: string;
  authorId: { _id: string, name: string };
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
      if (article?.authorId) {
        const response = await fetch(`http://localhost:3000/api/users/${article.authorId}`);
        const data = await response.json();
        setAuthorName(data.name);
      }
    };
    fetchAuthor();
  }, [article?.authorId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold my-6 text-foreground">{article.title}</h1>
      <p className="mb-2 text-secondary">Posted by {authorName} on {new Date(article.createdAt).toLocaleDateString()}</p>
      <article className="mb-6 bg-card rounded-lg shadow p-4">{article.body}</article>
      <section className="mb-6">
        <CommentForm articleId={article._id} slug={slug} />
      </section>
      <section>
        <h2 className="text-xl font-bold text-foreground">Previous comments:</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="mb-4 bg-card rounded-lg shadow p-4">
            <div className="font-semibold text-foreground">{comment.authorId.name}</div>
            <p className="text-secondary">{comment.body}</p>
            <time className="text-sm text-secondary">{new Date(comment.createdAt).toLocaleDateString()}</time>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ArticleView;
