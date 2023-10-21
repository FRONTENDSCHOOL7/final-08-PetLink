import React, { useState } from 'react';

function ProfilePage() {
    const [imgSrc, setImgSrc] = useState('');
    const [newIntro, setNewIntro] = useState('');

    const uploadImage = async (imageFile) => {
        const baseUrl = "https://api.mandarin.weniv.co.kr/";
        const reqUrl = baseUrl + "image/uploadfile";

        const form = new FormData();
        form.append("image", imageFile);

        const res = await fetch(reqUrl, {
            method: "POST",
            body: form
        });

        const json = await res.json();
        setImgSrc(baseUrl + json.filename);
    };

    const handleChangeImage = (e) => {
        const imageFile = e.target.files[0];
        uploadImage(imageFile);
    };

    const updateProfile = async () => {
        const token = localStorage.getItem('token');
        const baseUrl = "https://api.mandarin.weniv.co.kr/user/updateProfile";
        const form = new FormData();
        form.append("image", imgSrc); // 이미지 파일 자체를 추가
        form.append("intro", newIntro);
    
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: form
            });
    
            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                const errorData = await response.json();
                alert(`Failed to update profile: ${errorData.message || ''}`);
            }
        } catch (error) {
            console.error("Profile update failed:", error);
        }
    };
    
    return (
        <div>
            <h1>Profile Page</h1>
            <img src={imgSrc} alt="Profile" />
            <input type="file" onChange={handleChangeImage} />

            <div>
                <label>New Introduction:</label>
                <textarea value={newIntro} onChange={(e) => setNewIntro(e.target.value)}></textarea>
            </div>

            <button onClick={updateProfile}>Update Profile</button>
        </div>
    );
}

export default ProfilePage;