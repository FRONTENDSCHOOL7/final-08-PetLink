import React, { useEffect, useState } from 'react'
import { ProductImg, ProfileInfo, ProfileImg, ProfileContents, ProfileTxt, ChatBtn, ProfileName, ProfileId, ProductInfo, ProductDesc, Overlay } from './ProductDetail.style'
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style'
import BottomModal from '../Common/Modal/BottomModal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TabMenu from '../Common/TabMenu/TabMenu'
import axios from 'axios'
import HeaderLayouts from '../Common/Header/Header'

export default function MarketDetail() {
  const [productDetail, setProductDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {productId} = useParams(); // URL에서 상품 Id 추출
  const location = useLocation();
  const navigate = useNavigate();

  // 상품 세부 정보 받아오기
  const { pureProductName, description } = location.state || { pureProductName: "상품이름", description: "" };

  console.log("Received State:", location.state); 

  useEffect(()=>{
    fetchProductDetail();
  },[productId]);

  const fetchProductDetail = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`https://api.mandarin.weniv.co.kr/product/detail/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Fetched product detail:", res.data.product);
      setProductDetail(res.data.product);
    } catch (error) {
      console.error("Error", error);
    }
  }

  if(!productDetail) {
    return <div>Loading...</div>
  }
  
  console.log("Final description value:", description);

  const reportOptions = [
    {action: "신고하기", alertText: "신고하시겠습니까?"},
    {action: "차단하기", alertText: "차단하시겠습니까?"}
  ]

  const handleChatButtonClick = () => {
    navigate(`/chatroom/newChat`, { state: { username: productDetail.author.username } });
  };

  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts backTxt={true} onModalToggle={() => setIsModalOpen(true)} />

        <SubContainer>
            <ProductImg>
              <img src={productDetail.itemImage} alt="상품 사진" />
            </ProductImg>
            <ProfileInfo>
              <ProfileImg src={productDetail.author.image} alt="프로필 사진" />
              <ProfileContents>
                <ProfileTxt>
                  <ProfileName>{productDetail.author.username}</ProfileName>
                  <ProfileId>@{productDetail.author.accountname}</ProfileId>
                </ProfileTxt>
                <ChatBtn onClick={handleChatButtonClick}>채팅하기</ChatBtn>
              </ProfileContents>
            </ProfileInfo>
            <ProductInfo>
              <h4>{pureProductName}</h4>
              <strong>{Number(productDetail.price).toLocaleString()}원</strong>
            </ProductInfo>
            <ProductDesc>
              <p>{description}</p>
            </ProductDesc>
        </SubContainer>

        {/* 모달창 */}
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
