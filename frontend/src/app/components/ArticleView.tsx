// components/ArticleView.tsx
import React, { useState, useEffect } from 'react';


interface ArticleProps {
    title: string;
    authorId: string;
    createdAt: string;
    body: string;
  }
  
  interface CommentProps {
    authorId: string;
    body: string;
    createdAt: string;
  }
  
  interface ArticleViewProps {
    article: ArticleProps;
    comments: CommentProps[];
  }

  const ArticleView: React.FC<ArticleViewProps> = ({ article, comments }) => {
    const [authorName, setAuthorName] = useState('');
    useEffect(() => {
        // 获取作者名字
        const fetchAuthor = async () => {
          const response = await fetch(`http:/localhost:3000/api/users/${article.authorId}`);
          const data = await response.json();
          setAuthorName(data.name);
        };
        fetchAuthor();
        }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold my-6">{article.title}</h1>
      <p className="mb-2">Posted by {authorName} on {article.createdAt}</p>
      <article className="mb-6">{article.body}</article>
      <section className="mb-6">
        <h2 className="text-xl font-bold">My comment:</h2>
        {/* Comments */}
      </section>
      <section>
        <h2 className="text-xl font-bold">Previous comments:</h2>
        {/* Comment list */}
      </section>
    </div>
  );
};

export default ArticleView;
