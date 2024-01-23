// components/CommentForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const CommentForm = ({ articleId }: { articleId: string }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');
    try {
      const commentData = {
        body: comment,
        articleId: articleId
      };

      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ commentData }),
        credentials: 'include'
      });

      if (response.ok) {
        router.push(`/articles/${articleId}`);
      } else {
        setError('Failed to post the comment.');
      }
    } catch (error) {
      setError('There was an error submitting the comment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <div className="text-red-600">{error}</div>}
      <label htmlFor="comment" className="text-xl font-bold">My Comment:</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="border border-gray-300 text-gray-700 p-2 block w-full rounded mb-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600" 
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add comment
      </button>
    </form>
  );
};

export default CommentForm;
