// app/articles/[id]/page.tsx
import React from 'react';  
import ArticleView from './ArticleView';

const ArticlePage = ({ params }: { params: { slug: string } }) => {

  return (
      <div className="container mx-auto px-4">
      <ArticleView slug={params.slug} />
      </div>
  );
};

export default ArticlePage;
