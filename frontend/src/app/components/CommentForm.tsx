// components/CommentForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 正确的导入

const CommentForm = ({ articleId }: { articleId: string }) => {
  const [comment, setComment] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // 这里应该有一些前端验证

    // 发送请求到后端API添加评论
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        // 评论添加成功，可以刷新页面或者动态添加到评论列表
        router.replace(router.asPath); // 使用 replace 方法来刷新页面
      } else {
        // 处理错误，可能是显示一个错误消息
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
        className="..."
        required
      />
      <button type="submit" className="...">
        Add comment
      </button>
    </form>
  );
};

export default CommentForm;
