import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token directly from localStorage
    
                const response = await axios.get('https://api.mandarin.weniv.co.kr/user/myinfo', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : null,
                        'Content-type': 'application/json',
                    },
                });
    
                if (response.data && response.data[0] && response.data[0].user) {
                    setProfileData(response.data[0].user);
                } else {
                    setError(new Error('Unexpected response format'));
                }
            } catch (error) {
                setError(error);
            }
        };
    
        fetchData();
    }, []);    

    if (error) {
        return <div>Error occurred: {error.message}</div>;
    }

    if (!profileData) {
        return <div>로딩중...</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <img src={profileData.image} alt="Profile" />
            <h2>{profileData.username} (@{profileData.accountname})</h2>
            <p>Followers: {profileData.followerCount}</p>
            <p>Following: {profileData.followingCount}</p>
        </div>
    );
};

export default ProfilePage;