// pages/articles/add.tsx
import React from 'react';
import RootLayout from '../../layout';
import ArticleForm from '../../components/ArticleForm';

const AddArticlePage = () => {

    return (
        <RootLayout>
          <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Create new article</h1>
            <ArticleForm />
          </div>
        </RootLayout>
      );
    };

export default AddArticlePage;
