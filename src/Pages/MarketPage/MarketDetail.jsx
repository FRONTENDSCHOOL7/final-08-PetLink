import React from 'react'
// import './MarketDetail.css'
import { Container, Header, HeaderButton, DetailContainer, ProductImg, ProfileInfo, ProfileImg, ProfileContents, ProfileTxt, ChatBtn, ProfileName, ProfileId, ProductInfo, ProductDesc} from './MarketDetail.style'
import {GlobalStyle} from '../../Styles/reset.style'
import backBtn from '../../assets/image/icon-arrow-left.png'
import moreBtn from '../../assets/image/icon-more-vertical.png'
import product from '../../assets/image/marketItem1.png'
import profile from '../../assets/image/icon-basic-profile.png'

export default function MarketDetail() {
  return (
    <>
      <GlobalStyle/>
      <Container>
        <Header>
        {/* <header className='header'> */}
          <HeaderButton><img src={backBtn} alt="" /></HeaderButton>
          <HeaderButton><img src={moreBtn} alt="" /></HeaderButton>
        {/* </header> */}
        </Header>
        {/* <main className='detail-container'> */}
        <DetailContainer>
          {/* <div className='product-img'> */}
          <ProductImg>
            <img src={product} alt="상품사진" />
          {/* </div> */}
          </ProductImg>
          <ProfileInfo>
          {/* <div className='profile-info'> */}
            <ProfileImg src={profile} alt="" />
            <ProfileContents>
              <ProfileTxt>
                <ProfileName>쿠키의 일상</ProfileName>
                <ProfileId>@cookie123</ProfileId>
              </ProfileTxt>
              <ChatBtn>채팅하기</ChatBtn>
            </ProfileContents>
          {/* </div> */}
          </ProfileInfo>
          <ProductInfo>
            <h4>강아지 옷</h4>
            <strong>25,000원</strong>
          </ProductInfo>
          <ProductDesc>
            <h4>상품 설명</h4>
            <p>새 상품이고 사이즈는 라지입니다.<br/>
            옷이 많아서 판매합니다. <br/>
            택배도 가능하니 연락주세요!</p>
          </ProductDesc>
        {/* </main> */}
        </DetailContainer>
      </Container>
    </>
  )
}
