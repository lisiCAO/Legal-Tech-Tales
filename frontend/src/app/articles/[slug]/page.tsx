// app/articles/[id]/page.tsx
import React from 'react';  
import ArticleView from '../../components/ArticleView';

const ArticlePage = ({ params }: { params: { slug: string } }) => {

  return (
      <ArticleView slug={params.slug} />
  );
};

export default ArticlePage;
