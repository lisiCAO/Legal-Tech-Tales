// app/articles/[id]/page.tsx
import React, { useState, useEffect } from 'react';  
import RootLayout from './../../layout';
import ArticleView from '../../components/ArticleView';

const ArticlePage = ({ params }: { params: { slug: string } }) => {

  return (
    <RootLayout>
      {<ArticleView slug={params.slug} />}
    </RootLayout>
  );
};

export default ArticlePage;
