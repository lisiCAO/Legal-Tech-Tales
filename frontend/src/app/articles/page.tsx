// Purpose: Home page for the blog
import React from 'react';
import Layout from '../layout';
import ArticleList from '../components/ArticleList';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-6">Welcome to my blog, read on!</h1>
        {<ArticleList />}
      </div>
    </Layout>
  );
};

export default HomePage;