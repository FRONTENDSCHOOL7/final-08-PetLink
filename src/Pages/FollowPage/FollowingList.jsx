import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import 추가
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../../Components/Common/Header/Header';
import * as S from '../../Components/Home/PostList.style';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

// imgUrl 정의가 필요합니다. 다음과 같이 기본 이미지를 정의할 수 있습니다.
const imgUrl = 'path_to_your_default_image.png'; // 기본 이미지 경로로 변경해야 합니다.

const FollowingList = () => {
const [followingList, setFollowingList] = useState([]);
const { accountname } = useParams(); // use useParams to get the accountname
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
        const user = followingList.find(u => u._id === userId); // 사용자 검색
        if (!user) {
            throw new Error('User not found!');
        }
        // 팔로우 상태에 따라 액션 결정
        const action = user.isfollow ? 'unfollow' : 'follow';
        const method = user.isfollow ? 'delete' : 'post'; // HTTP 메서드 변경

        const response = await axios({
            method: method, // HTTP 메서드 동적 할당
            url: `https://api.mandarin.weniv.co.kr/profile/${user.accountname}/${action}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        });

        if (response.status === 200) {
            // 응답 데이터에 따라 사용자의 팔로우 상태 업데이트
            setFollowingList(prevList => prevList.map(item => {
                if (item._id === userId) {
                    // 서버로부터 받은 팔로우 상태로 업데이트
                    return { ...item, isfollow: response.data.profile.isfollow };
                }
                return item;
            }));
        }
    } catch (error) {
        console.error(error);
        // 오류 메시지 처리
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
            {followingList.map((user) => (
                <S.UserInfo key={user._id}>
                    <S.UserProfile>
                        <Link to={`/profile/${user.accountname}`}>
                            <img src={user.image || imgUrl} alt={`${user.username} 프로필 이미지`} />
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
        </Container>
    );
};

export default FollowingList;

const FollowBtn = styled.button`
    background-color: ${(props) => (props.isFollowing ? '#004E98' : '#fff')};
    color: ${(props) => (props.isFollowing ? '#fff' : '#767676')};
    border: ${(props) => (props.isFollowing ? 'none' : '1px solid #DBDBDB')};
    border-radius: 26px;
    transition: background-color 0.3s;
    width: 56px;
    height: 28px;
    cursor: pointer;
    &:hover {
    opacity: 0.8;
}
`;