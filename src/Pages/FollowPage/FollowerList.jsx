import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, SubContainer } from '../../Styles/reset.style';
import * as S from '../../Components/Home/PostList.style';
import { Link, useParams } from 'react-router-dom';
import imgUrl from '../../assets/image/icon-basic-profile.png';
import HeaderLayouts from '../../Components/Common/Header/Header';
import styled from 'styled-components';

export default function FollowerList() {
  const [followers, setFollowers] = useState([]);
  const { accountname } = useParams();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
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
      const method = isCurrentlyFollowed ? 'delete' : 'post';
      const action = isCurrentlyFollowed ? 'unfollow' : 'follow';
      const response = await axios({
        method: method,
        url: `https://api.mandarin.weniv.co.kr/profile/${accountname}/${action}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json'
        }
      });
  
      if (response.data && response.data.profile) {
        setFollowers(prevFollowers =>
          prevFollowers.map(follower => {
            if (follower.accountname === accountname) {
              return { ...follower, isfollow: response.data.profile.isfollow };
            }
            return follower;
          })
        );
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
  

  function parseIntro(intro) {
    if (!intro) {
        return { intro: '소개글이 없습니다.' };
    }

    const tags = ['intro', 'pet', 'gender', 'birthdate', 'location'];
    const info = {
        intro: '소개글이 없습니다.'
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
      <SubContainer>
      {followers.map(follower => (
        <S.UserInfo key={follower._id} style={{marginBottom:'5px'}}>
          <S.UserProfile>
            <Link to={`/profile/${follower.accountname}`}>
              <S.UserImg src={follower.image || imgUrl} alt={`${follower.username} 프로필 이미지`} />
            </Link>
            <S.UserName>
            {/* <p>{parseIntro(follower.intro).intro}</p> */}
              <S.NameTxt>{follower.username}</S.NameTxt>
              <S.Account>{follower.accountname}</S.Account>
            </S.UserName>
          </S.UserProfile>
          <FollowBtn onClick={() => toggleFollow(follower.accountname, follower.isfollow)} isFollow={follower.isfollow}>
            {follower.isfollow ? '언팔로우' : '팔로우'}
          </FollowBtn>
        </S.UserInfo>
      ))}
      </SubContainer>
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