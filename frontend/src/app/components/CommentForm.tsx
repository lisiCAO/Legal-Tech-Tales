// components/CommentForm.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
interface CommentFormProps {
  articleId: string;
  slug: string; // 添加这一行
}
const CommentForm: React.FC<CommentFormProps> = ({ articleId, slug }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({   body: comment,
          articleId: articleId }),
        credentials: 'include'
      });
      if( response.status === 401 ) {
        router.push('/login');
        return;
      } 
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      setComment('');
      
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    setError('');
  }
  , [comment]);
  

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
