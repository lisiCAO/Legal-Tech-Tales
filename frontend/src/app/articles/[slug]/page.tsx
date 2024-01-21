// app/articles/[id]/page.tsx
import React, { useState, useEffect } from 'react';  
import Layout from '../../layout';
import ArticleView from '../../components/ArticleView';

const ArticlePage = ({ params }: { params: { slug: string } }) => {

  return (
    <Layout>
      {<ArticleView slug={params.slug} />}
    </Layout>
  );
};

export default ArticlePage;
