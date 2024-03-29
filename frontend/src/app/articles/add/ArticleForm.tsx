'use client';
// components/ArticleForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const ArticleForm = () => {
  const [article, setArticle] = useState({ title: '', body: '' });
  const router = useRouter();
  const [error,setError] =useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'title' && value.trim() === '') {
      setError('Title cannot be empty');
      return;
    }

    if (name === 'title' && value.length < 10) {
      setError('Title must be at least 10 characters long');
      return;
    }
    
    if (name === 'body' && value.trim() === '') {
      setError('Content cannot be empty');
      return;
    }

    if (name === 'body' && value.length < 50) {
      setError('Content must be at least 50 characters long');
      return;
    }
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); 
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
          setError('Failed to create the article.'); 
        }
      } catch (error) {
        setError('There was an error submitting the form.');
      }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-card shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-foreground text-sm font-bold mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={article.title}
          onChange={handleChange}
          className="shadow appearance-none border-custom rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={10}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="body" className="block text-foreground text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          id="body"
          name="body"
          rows={4}
          value={article.body}
          onChange={handleChange}
          className="shadow appearance-none border-custom rounded w-full py-2 px-3 text-foreground mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
          minLength={50}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-custom-button hover:bg-custom-button-hover text-button-text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;