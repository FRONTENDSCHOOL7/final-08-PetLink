import React, { useState } from 'react'
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../../Components/Common/Header/Header';
import *as S from '../../Components/Home/PostList.style'
import { Link } from 'react-router-dom';
import imgUrl from '../../assets/image/icon-basic-profile.png'
import styled from 'styled-components'

const FollowingList = () => {
    const [isFollowing, setIsFollowing] = useState(true);
    const toggleFollow = () => {
      setIsFollowing(() => !isFollowing);
    };
  return (
    <Container>
    <HeaderLayouts backTxt txt='Followings'/>
    <S.UserInfo >
        <S.UserProfile>
          <Link to="/profile"><img src={imgUrl} alt='사용자 프로필 이미지'/></Link>
          <S.UserName >
              <p >애월읍에서 강아지들에게 유명한 곳</p>
              <span>accountname </span>
          </S.UserName> 
        </S.UserProfile>
        <FollowBtn onClick={toggleFollow} isFollowing={isFollowing}>
      {isFollowing ? '팔로우' : '취소'}
    </FollowBtn>
      </S.UserInfo>
  </Container>
  )
}

export default FollowingList


const FollowBtn = styled.button`
  background-color:${(props)=>(props.isFollowing ? ' #004E98': '#fff')};
  color:${(props)=>(props.isFollowing ? ' #fff': '#767676')};
  border:${(props)=>(props.isFollowing ? 'none': '1px solid #DBDBDB')};
  border-radius:26px ;
  transition: background-color 0.3s;
  width: 56px;
  height: 28px;
`