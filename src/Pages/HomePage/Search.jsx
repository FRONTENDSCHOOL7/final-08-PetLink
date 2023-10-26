import React from 'react'
import { Container } from '../../Styles/reset.style'
import { IconMore, UserInfo, UserName, UserProfile } from '../../Components/Home/PostList.style'
import profileIcon from '../../assets/image/icon-basic-profile.png'
import moreIcon from '../../assets/image/icon- more-vertical.png'
import { Link } from 'react-router-dom'
import HeaderLayouts from '../../Components/Common/Header/Header'
import styled from 'styled-components'
import { PostUserInfo } from '../../Components/Home/PostList'

export default function Search() {
  // const url = 'https://api.mandarin.weniv.co.kr/user/myinfo'
  // const [accountname, imgUrl] = PostUserInfo(url)

  return (
    <>
    <Container>
        <HeaderLayouts searchInput /> 
        <SearchBox>
          <UserInfo>
            <UserProfile>
              <Link to="#"><img src={profileIcon} alt='프로필 이미지'/></Link>
              <UserName >
                  <p >애월읍에서 강아지들에게 유명한 곳</p>
                  <span>@활동명</span>
              </UserName> 
          </UserProfile>
          <button ><IconMore src={moreIcon} alt='신고하기 모달창 불러오기'/></button>
            </UserInfo>
        </SearchBox>
    </Container>

    </>
  )
}








export const SearchBox = styled.div`
  padding: 20px 16px;
`

