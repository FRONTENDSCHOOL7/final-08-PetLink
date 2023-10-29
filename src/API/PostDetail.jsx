import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// 상세게시글 보기
function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`https://api.mandarin.weniv.co.kr/post/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPost(res.data.post);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.content}</h1>
      <img src={post.image} alt="Post" />
      {/* 여기에 다른 게시글 정보를 추가할 수 있습니다. */}
    </div>
  );
}

export default PostDetail;