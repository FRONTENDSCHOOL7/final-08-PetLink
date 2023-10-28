import React, { useState } from 'react'
import { Container } from '../../Styles/reset.style'
import *as S from '../../Components/Home/PostList.style'
import { Link } from 'react-router-dom'
import imgUrl from '../../assets/image/icon-basic-profile.png'
import HeaderLayouts from '../../Components/Common/Header/Header'
import styled from 'styled-components'

export default function FollowList() {
  const [isFollow, setIsFollow] = useState(true);
  const toggleFollow = () => {
    setIsFollow(() => !isFollow);
  };
  return (
    <Container>
      <HeaderLayouts follow txt='Followers'/>
      <S.UserInfo >
          <S.UserProfile>
            <Link to="/profile"><img src={imgUrl} alt='사용자 프로필 이미지'/></Link>
            <S.UserName >
                <p >애월읍에서 강아지들에게 유명한 곳</p>
                <span>accountname </span>
            </S.UserName> 
          </S.UserProfile>
          <FollowBtn onClick={toggleFollow} isFollow={isFollow}>
        {isFollow ? '팔로우' : '취소'}
      </FollowBtn>
        </S.UserInfo>
    </Container>
  )
}


const FollowBtn = styled.button`
  background-color:${(props)=>(props.isFollow ? ' #004E98': '#fff')};
  color:${(props)=>(props.isFollow ? ' #fff': '#767676')};
  border:${(props)=>(props.isFollow ? 'none': '1px solid #DBDBDB')};
  border-radius:26px ;
  transition: background-color 0.3s;
  width: 56px;
  height: 28px;
`

