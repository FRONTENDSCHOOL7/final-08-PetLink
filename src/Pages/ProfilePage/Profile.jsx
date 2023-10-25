import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import {
    ProfileContainer,
    ProfileImage,
    ProfileUsername,
    ProfileAccountname,
    FollowInfo,
    FollowGroup,
    FollowCount,
    FollowLabel,
    ProfileIntro,
    ProfileImageContainer,
    EditProfileButton
} from '../../Components/Profile/Profile.style';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('https://api.mandarin.weniv.co.kr/user/myinfo', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : null,
                        'Content-type': 'application/json',
                    },
                });
            
                if (response.data && response.data.user) {
                    setProfileData(response.data.user);
                } else {
                    setError(new Error('Unexpected response format'));
                }
            } catch (error) {
                setError(error);
            }
        };
    
        fetchData();    }, []);

    if (error) {
        return <div>Error occurred: {error.message}</div>;
    }

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <ProfileContainer>
            <FollowInfo>
                <FollowGroup>
                    <FollowCount>{profileData.followingCount}</FollowCount>
                    <FollowLabel>Following</FollowLabel>
                </FollowGroup>
                
                <ProfileImageContainer>
                    <ProfileImage src={profileData.image} alt="Profile" />
                    <ProfileUsername>{profileData.username} </ProfileUsername>
                    <ProfileAccountname>@{profileData.accountname}</ProfileAccountname>
                </ProfileImageContainer>
                
                <FollowGroup>
                    <FollowCount>{profileData.followerCount}</FollowCount>
                    <FollowLabel>Followers</FollowLabel>
                </FollowGroup>
            </FollowInfo>

            <ProfileIntro>{profileData.intro}</ProfileIntro>

            <Link to="/profile-edit">
                <EditProfileButton>프로필 수정</EditProfileButton>
            </Link>
        </ProfileContainer>
        <TabMenu/>
        </>
    );
};

export default ProfilePage;