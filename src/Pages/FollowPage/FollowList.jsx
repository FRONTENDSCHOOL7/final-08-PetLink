import React from 'react'
import { Container } from '../../Styles/reset.style'
import { HeaderLayout } from '../../Components/Common/Header/Header.style'
import *as S from '../../Components/Home/PostList.style'
import { Link } from 'react-router-dom'
import imgUrl from '../../assets/image/icon-basic-profile.png'
import HeaderLayouts from '../../Components/Common/Header/Header'

export default function FollowList() {
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

        </S.UserInfo>
    </Container>
  )
}
