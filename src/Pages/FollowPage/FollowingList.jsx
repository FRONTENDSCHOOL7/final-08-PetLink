import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, SubContainer } from '../../Styles/reset.style';
import HeaderLayouts from '../../Components/Common/Header/Header';
import * as S from '../../Components/Home/PostList.style';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const imgUrl = 'https://api.mandarin.weniv.co.kr/1698644803298.jpg';

const FollowingList = () => {
const [followingList, setFollowingList] = useState([]);
const { accountname } = useParams();
const token = localStorage.getItem('token');

useEffect(() => {
    if (accountname) {
        fetch(`https://api.mandarin.weniv.co.kr/profile/${accountname}/following`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFollowingList(data);
        })
        .catch(error => {
                console.error('Error fetching following data:', error);
            });
        }
}, [token, accountname]);

const toggleFollow = async (userId) => {
    try {
        const user = followingList.find(u => u._id === userId);
        if (!user) {
            throw new Error('User not found!');
        }

        const action = user.isfollow ? 'unfollow' : 'follow';
        const method = user.isfollow ? 'delete' : 'post';

        const response = await axios({
            method: method,
            url: `https://api.mandarin.weniv.co.kr/profile/${user.accountname}/${action}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        });

        if (response.status === 200) {
            setFollowingList(prevList => prevList.map(item => {
                if (item._id === userId) {
                    return { ...item, isfollow: response.data.profile.isfollow };
                }
                return item;
            }));
        }
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('An error occurred while trying to follow/unfollow the user.');
        }
    }
};

// 인트로 추출
function parseIntro(intro) {
const tags = ['intro', 'pet', 'gender', 'birthdate', 'location'];
const info = {};

tags.forEach(tag => {
    const match = intro.match(new RegExp(`#${tag}:(.*?)(?=#|$)`));
    if (match && match[1]) {
        info[tag] = match[1].trim();
    }
});

return info;
}

    return (
        <Container>
            <HeaderLayouts backTxt txt='Followings' />
            <SubContainer>
            {followingList.map((user) => (
                <S.UserInfo key={user._id} style={{marginBottom:'5px'}}>
                    <S.UserProfile>
                        <Link to={`/profile/${user.accountname}`}>
                            <S.UserImg src={user.image || imgUrl} alt={`${user.username} 프로필 이미지`} />
                        </Link>
                        <S.UserName>
                            <p>{parseIntro.intro}</p>
                            <span>{user.accountname}</span>
                        </S.UserName>
                    </S.UserProfile>
                    <FollowBtn onClick={() => toggleFollow(user._id)} isFollowing={user.isfollow}>
                        {user.isfollow ? '언팔로우' : '팔로우'}
                    </FollowBtn>
                </S.UserInfo>
            ))}
            </SubContainer>
        </Container>
    );
};

export default FollowingList;

const FollowBtn = styled.button`
    background-color: ${(props) => (props.isFollowing ? '#fff' : '#004E98')};
    color: ${(props) => (props.isFollowing ? '#767676' : '#fff')};
    border: ${(props) => (props.isFollowing ? '1px solid #DBDBDB' : 'none')};
    border-radius: 26px;
    transition: background-color 0.3s;
    width: 56px;
    height: 28px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;
