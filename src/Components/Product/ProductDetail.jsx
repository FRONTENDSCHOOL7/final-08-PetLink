import React, { useState } from 'react'
import { Header, HeaderButton, DetailContainer, ProductImg, ProfileInfo, ProfileImg, ProfileContents, ProfileTxt, ChatBtn, ProfileName, ProfileId, ProductInfo, ProductDesc, Overlay} from './ProductDetail.style'
import {GlobalStyle, Container} from '../../Styles/reset.style'
import backBtn from '../../assets/image/icon-arrow-left.png'
import moreBtn from '../../assets/image/icon-more-vertical.png'
import product from '../../assets/image/marketItem1.png'
import profile from '../../assets/image/icon-basic-profile.png'
import BottomModal from '../Common/Modal/BottomModal'
import { useNavigate } from 'react-router-dom'
import TabMenu from '../Common/TabMenu/TabMenu'

export default function MarketDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const reportOptions = [
    {action: "신고하기", alertText: "신고하시겠습니까?"},
    {action: "차단하기", alertText: "차단하시겠습니까?"}
  ]

  return (
    <>
      <GlobalStyle/>
      <Container>
        <Header>
          <HeaderButton onClick={()=>navigate(-1)}><img src={backBtn} alt="" /></HeaderButton>
          <HeaderButton onClick={()=>setIsModalOpen(true)}><img src={moreBtn} alt="" /></HeaderButton>
        </Header>
        <DetailContainer>
          <ProductImg>
            <img src={product} alt="상품사진" />
          </ProductImg>
          <ProfileInfo>
            <ProfileImg src={profile} alt="" />
            <ProfileContents>
              <ProfileTxt>
                <ProfileName>쿠키의 일상</ProfileName>
                <ProfileId>@cookie123</ProfileId>
              </ProfileTxt>
              <ChatBtn>채팅하기</ChatBtn>
            </ProfileContents>
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
        </DetailContainer>
        {isModalOpen &&(
          <>
            <Overlay onClick={()=> setIsModalOpen(false)}/>
            <BottomModal setIsModalOpen={setIsModalOpen} reports={reportOptions}/>
          </>
        )}
        <TabMenu/>
      </Container>
    </>
  )
}
