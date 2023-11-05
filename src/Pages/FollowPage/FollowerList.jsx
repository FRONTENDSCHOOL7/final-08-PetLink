import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '../../Styles/reset.style';
import * as S from '../../Components/Home/PostList.style';
import { Link, useParams } from 'react-router-dom'; // Make sure useParams is imported here
import imgUrl from '../../assets/image/icon-basic-profile.png';
import HeaderLayouts from '../../Components/Common/Header/Header';
import styled from 'styled-components';

export default function FollowerList() {
  const [followers, setFollowers] = useState([]);
  const { accountname } = useParams(); // useParams is now defined

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        // Correctly using template literals to embed accountname in URL
        const response = await axios.get(`https://api.mandarin.weniv.co.kr/profile/${accountname}/follower`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json'
          }
        });
        setFollowers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (accountname) {
      fetchFollowers();
    }
  }, [accountname]);

  const toggleFollow = async (accountname, isCurrentlyFollowed) => {
    try {
      const url = `https://api.mandarin.weniv.co.kr/profile/${accountname}/${isCurrentlyFollowed ? 'unfollow' : 'follow'}`;
      const method = isCurrentlyFollowed ? 'delete' : 'post';
      const response = await axios[method](url, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json'
        }
      });
      if (response.data) {
        setFollowers(prev => prev.map(follower => {
          if (follower.accountname === accountname) {
            return { ...follower, isfollow: !isCurrentlyFollowed };
          }
          return follower;
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  function parseIntro(intro) {
    if (!intro) {
        return { intro: '소개글이 없습니다.' }; // Return default message if intro is falsy
    }

    const tags = ['intro', 'pet', 'gender', 'birthdate', 'location'];
    const info = {
        intro: '소개글이 없습니다.' // Set a default message for intro
    };
    
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
      <HeaderLayouts backTxt txt='Followers' />
      {followers.map(follower => (
        <S.UserInfo key={follower._id}>
          <S.UserProfile>
            <Link to={`/profile/${follower.accountname}`}>
              <S.UserImg src={follower.image || imgUrl} alt={`${follower.username} 프로필 이미지`} />
            </Link>
            <S.UserName>
            {/* <p>{parseIntro(follower.intro).intro}</p> */}
              <span>{follower.accountname}</span>
            </S.UserName>
          </S.UserProfile>
          <FollowBtn onClick={() => toggleFollow(follower.accountname, follower.isfollow)} isFollow={follower.isfollow}>
            {follower.isfollow ? '언팔로우' : '팔로우'}
          </FollowBtn>
        </S.UserInfo>
      ))}
    </Container>
  )
}

const FollowBtn = styled.button`
  background-color:${(props) => (props.isFollow ? '#fff' : '#004E98')};
  color:${(props) => (props.isFollow ? '#767676' : '#fff')};
  border:${(props) => (props.isFollow ? '1px solid #DBDBDB' : 'none')};
  border-radius:26px;
  transition: background-color 0.3s;
  width: 56px;
  height: 28px;
  cursor: pointer;
`
