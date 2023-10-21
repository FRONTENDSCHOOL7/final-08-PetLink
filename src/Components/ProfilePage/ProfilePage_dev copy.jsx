import React, { useState, useEffect } from 'react';

function ProfilePage({ userInfo }) {
    const [userDetail, setUserDetail] = useState(null);
    const [imgSrc, setImgSrc] = useState('');
    const [newIntro, setNewIntro] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newAccountName, setNewAccountName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userInfo) {
            setUserDetail(userInfo); // Set userDetail when userInfo prop is available
        }
    }, [userInfo]);

    useEffect(() => {
        if (userDetail) {
            setImgSrc(userDetail.image || ''); // Added a fallback to an empty string
            setNewIntro(userDetail.intro || ''); // Added a fallback to an empty string
            setNewUsername(userDetail.username || ''); // Added a fallback to an empty string
            setNewAccountName(userDetail.accountname || ''); // Added a fallback to an empty string
        }
    }, [userDetail]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userInfo || !userInfo.accountname) {
                setError('Account name is not provided.');
                return;
            }

            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://api.mandarin.weniv.co.kr/profile/${userInfo.accountname}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch profile.');
                }
    
                const data = await response.json();
                setUserDetail(data.profile);
                
            } catch (error) {
                setError(error.message || 'Failed to fetch profile.');
            }
        };
    
        fetchProfile();
    }, [userInfo]);

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('https://api.mandarin.weniv.co.kr/image/uploadfile', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            return data.filename;
        } catch (error) {
            setError('Image upload failed.');
        }
    };

    const handleChangeImage = async (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const uploadedImageName = await uploadImage(imageFile);
            setImgSrc(uploadedImageName);
        }
    };

    const updateProfile = async () => {
        try {
            const response = await fetch('https://api.mandarin.weniv.co.kr/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    username: newUsername,
                    accountname: newAccountName,
                    intro: newIntro,
                    image: imgSrc,
                }),
            });

            if (!response.ok) {
                throw new Error('Profile update failed.');
            }

            alert('Profile updated successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : userDetail ? (
                <div className="profile-content">
                    <div className="profile-image-section">
                        <img src={imgSrc} alt="Profile" className="profile-img" />
                        <input type="file" onChange={handleChangeImage} className="upload-button" />
                    </div>
                    <div className="profile-details">
                        <div className="detail-item">
                            <h2>
                                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                            </h2>
                        </div>
                        <div className="detail-item">
                            <p>@<input type="text" value={newAccountName} onChange={(e) => setNewAccountName(e.target.value)} /></p>
                        </div>
                        <div className="detail-item">
                            <textarea value={newIntro} onChange={(e) => setNewIntro(e.target.value)}></textarea>
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