import React, { useState, useEffect } from 'react';

function ProfilePage({ userInfo }) {
    const [imgSrc, setImgSrc] = useState('');
    const [newIntro, setNewIntro] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newAccountName, setNewAccountName] = useState('');

    useEffect(() => {
        if (userInfo) {
            setImgSrc(userInfo.image);
            setNewIntro(userInfo.intro);
            setNewUsername(userInfo.username);
            setNewAccountName(userInfo.accountname);
        }
    }, [userInfo]);

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

        return baseUrl + json.filename;
    };

    const handleChangeImage = async (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const uploadedImageUrl = await uploadImage(imageFile);
            setImgSrc(uploadedImageUrl);
        }
    };

    const updateProfile = async () => {
        const token = localStorage.getItem('token');
        const updateUrl = "https://api.mandarin.weniv.co.kr/user";
        const payload = {
            user: {
                username: newUsername,
                accountname: newAccountName,
                intro: newIntro,
                image: imgSrc
            }
        };

        try {
            const response = await fetch(updateUrl, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
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
        <div className="profile-page">
            <h1>Profile Page</h1>
            {userInfo ? (
                <div className="profile-content">
                    <div className="profile-image-section">
                        <img src={imgSrc || 'default-image-path.jpg'} alt="Profile" className="profile-img" />
                        <input type="file" onChange={handleChangeImage} className="upload-button" />
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <label>ID:</label>
                            <span>{userInfo._id}</span>
                        </div>
                        <div className="detail-item">
                            <label>Username:</label>
                            <input 
                                type="text" 
                                value={newUsername} 
                                onChange={(e) => setNewUsername(e.target.value)} 
                            />
                        </div>
                        <div className="detail-item">
                            <label>Account Name:</label>
                            <input 
                                type="text" 
                                value={newAccountName} 
                                onChange={(e) => setNewAccountName(e.target.value)} 
                            />
                        </div>
                        <div className="detail-item">
                            <label>소개글 수정:</label>
                            <textarea 
                                value={newIntro} 
                                onChange={(e) => setNewIntro(e.target.value)}
                            ></textarea>
                        </div>
                        <button onClick={updateProfile} className="update-button">Update Profile</button>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default ProfilePage;