// app/articles/[id]/page.tsx
import React, { useState, useEffect } from 'react';  
import Layout from './../../layout';
import ArticleView from './../../components/ArticleView';
import CommentForm from './../../components/CommentForm';
interface Article {
    _id: string;
    title: string;
    body: string;
    authorId: string;
    createdAt: string;
  }
  
  interface Comment {
    authorId: string;
    articleId: string;
    body: string;
    createdAt: string;
  }
const ArticlePage = ({ params }: { params: { id: string } }) => {

    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            const articleId = params.id;
            const articleRes = await fetch(`http:/localhost:3000/api/articles/${articleId}`);
            const article = await articleRes.json();
            const commentsRes = await fetch(`http:/localhost:3000/api/comments/${articleId}`);
            const comments = await commentsRes.json();
            setArticle(article);
            setComments(comments);
        };
        fetchArticle();
    });
  return (
    <Layout>
      {article && <ArticleView article={article} comments={comments} />}
      {article && <CommentForm articleId={article._id} />}
    </Layout>
  );
};

export default ArticlePage;
