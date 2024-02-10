// HomePage component
import React from 'react';
import ArticleList from './ArticleList';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-6 text-foreground">Welcome to my blog, read on!</h1>
        <ArticleList />
        <div className="inline-block align-baseline font-bold text-sm text-link hover:text-link-hover cursor-pointer">
            <Link href="/articles/add">
                Create your Article
            </Link>
        </div>
      </div>
  );
};

export default HomePage;
