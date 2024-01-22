// Purpose: Home page for the blog
import React from 'react';
import ArticleList from '../components/ArticleList';

const HomePage: React.FC = () => {
  return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-6">Welcome to my blog, read on!</h1>
        {<ArticleList />}
      </div>
  );
};

export default HomePage;
