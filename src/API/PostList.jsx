import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// 전체게시글 불러오기
function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://api.mandarin.weniv.co.kr/post', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <div>
            <h3>{post.content}</h3>
            <img src={post.image} alt="Post image" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostList;