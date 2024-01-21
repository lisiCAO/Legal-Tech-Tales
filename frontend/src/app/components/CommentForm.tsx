// components/CommentForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const CommentForm = ({ articleId }: { articleId: string }) => {
  const [comment, setComment] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        router.push(`/articles/${articleId}`);
      } else {
        console.error('Failed to post the comment.');
      }
    } catch (error) {
      console.error('There was an error submitting the comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="...">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit" className="...">
        Add comment
      </button>
    </form>
  );
};

export default CommentForm;
