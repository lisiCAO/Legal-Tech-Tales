'use client';
// components/ArticleForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const ArticleForm = () => {
  const [article, setArticle] = useState({ title: '', body: '' });
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/articles/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(article),
        });
  
        if (response.ok) {
            // redirect to articles list
          router.push('/articles');
        } else {
          console.error('Failed to create the article.');
        }
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={article.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={10}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          value={article.body}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={50}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
