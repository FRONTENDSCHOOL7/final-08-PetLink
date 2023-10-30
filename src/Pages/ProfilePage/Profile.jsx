import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    BtnGrop,
    ProfileContainer
} from '../../Components/Profile/Profile.style';
import MyFeed from '../../Components/Profile/MyFeed';

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
                    const user = response.data.user;
    
                    // Extract the content after #intro: tag from the intro
                    const introMatch = user.intro.match(/#intro:(.*?)(?=#|$)/);
                    const introContent = introMatch ? introMatch[1].trim() : user.intro;
                    
                    setProfileData({
                        ...user,
                        intro: introContent
                    });
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
        return <div>로딩...</div>;
    }

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
            <BtnGrop>
                <Link to="/profile/edit">
                    <Button>프로필 수정</Button>
                </Link>
                    <Button>상품 등록</Button>
            </BtnGrop>
        </ProfileContainer>
        </Container>
        <TabMenu/>
        </>
    );
};

export default ProfilePage;