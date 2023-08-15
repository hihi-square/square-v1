import React, { useState } from 'react';

function CommentForm({ postId, onCommentSubmit, type }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === '') {
      return; // 댓글 내용이 비어있으면 제출하지 않음
    }
    if (type === '') {

    } else {
        
    }
    
    // 댓글을 서버에 제출하는 로직
    // 예: axios.post('/api/comments', { postId, comment });
    
    onCommentSubmit(); // 부모 컴포넌트에 댓글 제출 완료를 알림
    setComment(''); // 댓글 입력 필드 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요"
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default CommentForm;