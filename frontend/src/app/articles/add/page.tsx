// pages/articles/add.tsx
import React from 'react';
import ArticleForm from './ArticleForm';

const AddArticlePage = () => {
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold my-6 text-custom-darkorange">Create new article</h1>
            <ArticleForm />
          </div>
      );
    };

export default AddArticlePage;
