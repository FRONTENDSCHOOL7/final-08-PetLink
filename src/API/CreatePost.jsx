import React, { useState } from 'react';
import axios from 'axios';
// 게시글 작성
function CreatePost() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const res = await axios.post('https://api.mandarin.weniv.co.kr/image/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      let filename = res.data.filename;
      const baseUrl = 'https://api.mandarin.weniv.co.kr/';
      const fullPath = baseUrl + filename;
      setImageUrl(fullPath);
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const handlePostSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('https://api.mandarin.weniv.co.kr/post', {
        post: {
          content,
          image: imageUrl,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handlePostSubmit} disabled={!content}>업로드</button>
    </div>
  );
}

export default CreatePost;