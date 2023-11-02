import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, GlobalStyle } from '../../Styles/reset.style'
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import {
    ProfileImage,
    ProfileUsername,
    ProfileAccountname,
    FollowInfo,
    FollowGroup,
    FollowCount,
    FollowLabel,
    ProfileIntro,
    ProfileImageContainer,
    Button,
    BtnGroup,
    ProfileContainer
} from '../../Components/Profile/Profile.style';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const { accountname } = useParams(); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                let url = 'https://api.mandarin.weniv.co.kr/user/myinfo';
                
                if (accountname) { 
                    url = `https://api.mandarin.weniv.co.kr/profile/${accountname}`;
                }
    
                const response = await axios.get(url, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : null,
                        'Content-type': 'application/json',
                    },
                });
            
                let profile;
                if (response.data.user) { // API에서 user가 있으면 (나의 프로필)
                    profile = response.data.user;
                } else if (response.data.profile) { // API에서 profile가 있으면 (사용자프로필)
                    profile = response.data.profile;
                } else {
                    throw new Error('Unexpected response format');
                }
                
                const introMatch = profile.intro.match(/#intro:(.*?)(?=#|$)/);
                const introContent = introMatch ? introMatch[1].trim() : profile.intro;
                
                setProfileData({
                    ...profile,
                    intro: introContent
                });
            } catch (error) {
                setError(error);
            }
        };
    
        fetchData();    
    }, [accountname]);

    if (error) {
        return <div>Error occurred: {error.message}</div>;
    }

    if (!profileData) {
        return <div>로딩...</div>;
    }

    // 팔로우 언팔 기능

    const handleFollow = async () => {
        try {
            const response = await axios.post(`https://api.mandarin.weniv.co.kr/profile/${profileData.accountname}/follow`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-type': 'application/json',
                },
            });
            if (response.data.profile) {
                setProfileData(response.data.profile);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await axios.delete(`https://api.mandarin.weniv.co.kr/profile/${profileData.accountname}/unfollow`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-type': 'application/json',
                },
            });
            if (response.data.profile) {
                setProfileData(response.data.profile);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <GlobalStyle/>
        <Container>
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
            {accountname ? (
            profileData.isfollow ? (
                <BtnGroup>
                    <Button onClick={handleUnfollow}>언팔로우</Button>
                </BtnGroup>
            ) : (
                <BtnGroup>
                    <Button onClick={handleFollow}>팔로우</Button>
                </BtnGroup>
            )
        ) : (
            <BtnGroup>
                <Link to="/profile/edit">
                    <Button>프로필 수정</Button>
                </Link>
                <Link to={`/market/add-product/${profileData.accountname}`}>
                    <Button>상품 등록</Button>
                </Link>
            </BtnGroup>
        )}
        </ProfileContainer>
        </Container>
        <TabMenu/>
        </>
    );
};

export default ProfilePage;