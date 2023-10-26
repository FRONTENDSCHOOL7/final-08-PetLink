import React, { useState } from 'react';
import axios from 'axios';

function ProfileEdit() {
    const [username, setUsername] = useState('');
    const [accountname, setAccountname] = useState('');
    const [intro, setIntro] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        let imageUrl = image;
        if (image && typeof image !== 'string') {
            imageUrl = await imageUpload(image);
            if (!imageUrl) {
                console.error('Failed to upload image.');
                return;
            }
        }

        const userData = {
            username,
            accountname,
            intro,
            image: imageUrl,
        };

        try {
            const response = await axios.put('https://api.mandarin.weniv.co.kr/user', 
                { user: userData }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data && response.data.user) {
                console.log('Profile updated successfully:', response.data.user);
            } else {
                console.error('Update error:', response.data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Update error:', error.response ? error.response.data : error.message);
        }
    };

async function imageUpload(file) {
    const url = "https://api.mandarin.weniv.co.kr";
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(url + "/image/uploadfile", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.filename) {
            return url + "/" + data.filename;
        } else {
            console.error("Image upload failed:", data);
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>이미지 교체</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                {previewImage && <img src={previewImage} alt="Profile Preview" />}
            </div>
            <div>
                <label>사용자 이름</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>유저 아이디</label>
                <input
                    type="text"
                    value={accountname}
                    onChange={(e) => setAccountname(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>소개글</label>
                <textarea
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                />
            </div>

            <button type="submit">프로필 수정</button>
        </form>
    );
}

export default ProfileEdit;
