// Purpose: Home page for the blog
import React from 'react';
import ArticleList from '../components/ArticleList';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-6">Welcome to my blog, read on!</h1>
        {<ArticleList />}
        <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
            <Link  href={"/articles/add"}>
                Create your Article
            </Link>
        </div>
      </div>
  );
};

export default HomePage;
