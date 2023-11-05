import React, { useEffect, useState } from 'react'
import { ProductImg, ProfileInfo, ProfileImg, ProfileContents, ProfileTxt, ChatBtn, ProfileName, ProfileId, ProductInfo, ProductDesc, Overlay, UserProfile} from './ProductDetail.style'
import {GlobalStyle, Container, SubContainer} from '../../Styles/reset.style'
import BottomModal from '../Common/Modal/BottomModal'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import TabMenu from '../Common/TabMenu/TabMenu'
import axios from 'axios'
import HeaderLayouts from '../Common/Header/Header'

export default function ProductDetail() {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [productDetail, setProductDetail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 상태
  const [userAccountName, setUserAccountName] = useState(false);
  const [isMyProduct, setIsMyProduct] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState([]);
  const {productId} = useParams(); // URL에서 상품 Id 추출
  const [isUpdated, setIsUpdated] = useState(false); // 상품 업데이트된 상태
  const location = useLocation();
  const navigate = useNavigate();

  // 상품 세부 정보 받아오기
  const { pureProductName, description } = location.state || { pureProductName: "상품이름", description: "" };

  console.log("Received State:", location.state); 

  useEffect(()=>{
    console.log("Component did mount. Received State:", location.state);
    fetchMyProfile();
    fetchProductDetail();
  },[productId]);

  useEffect(() => {
    if (location.state?.updated) {
      fetchProductDetail();
      // 상태를 초기화하여 다른 탐색에서 'updated' 상태가 남지 않도록 합니다.
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location.state, productId, navigate]);

  // 상품 상세 정보
  const fetchProductDetail = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`https://api.mandarin.weniv.co.kr/product/detail/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Fetched product detail:", response.data.product);
      const productData = response.data.product;
      setProductDetail(productData);
      setIsUpdated(productData.updated); // 상품의 updated 상태를 설정
      setIsMyProduct(productData.author.accountname === currentUser); // 현재 사용자가 작성자와 일치하는지 확인
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
    }
  }

   // 게시물 삭제 함수
  const deleteProduct = async (productId) => {
    console.log('deleteProduct is called with id:', productId)
    try {
      await axios.delete(`https://api.mandarin.weniv.co.kr/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      alert('삭제되었습니다.');
      navigate('/market');
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
    }
  };

  // 현재 로그인한 사용자 정보
  const fetchMyProfile = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data) {
        const userAccountName = data.user.accountname;
        setUserAccountName(userAccountName);
        setIsMyProduct(userAccountName === productDetail?.author?.accountname);
        console.log("userAccountName:", userAccountName);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchMyProfile();
    fetchProductDetail();
  }, [productId]);


  // 채팅하기
  const handleChatButtonClick = (e) => {
    e.preventDefault();
    navigate(`/chatroom/newChat`, { state: { username: productDetail.author.username } });
  };



// 모달 오픈 함수
const productOpenModal = () => {
  let modalOptions = [];

  if (isMyProduct) {
    modalOptions = [
      { action: "수정하기", alertText: "수정 하시겠습니까?", onSelect: () => navigate(`/market/edit/${productId}`) },
      { action: "삭제하기", alertText: "삭제 하시겠습니까?", onSelect: () => deleteProduct(productId) },
    ];
  } else {
    modalOptions = [
      { action: "신고하기", alertText: "신고 하시겠습니까?" },
    ];
  }

  setIsModalOpen(true);
  setReportOptions(modalOptions); // 여기서 올바른 상태 함수를 사용해야 합니다.
};


    // 로딩 상태
    if(!productDetail) {
      return <div>Loading...</div>
    }
  
  console.log("Final description value:", description);

  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts backTxt={true} onModalToggle={() => productOpenModal()} />

        <SubContainer>
              <ProductImg>
                <img src={productDetail.itemImage} alt="상품 사진" />
              </ProductImg>
                <ProfileInfo>
                  <Link to={`/profile/${productDetail.author.accountname}`}>
                    <UserProfile>
                      <ProfileImg src={productDetail.author?.image || defaultUserImg} alt="프로필 사진" />
                  {/* <ProfileContents> */}
                      <ProfileTxt>
                        <ProfileName>{productDetail.author.username}</ProfileName>
                        <ProfileId>@{productDetail.author.accountname}</ProfileId>
                      </ProfileTxt>
                    </UserProfile>
                  </Link>
                  <ChatBtn onClick={handleChatButtonClick}>채팅하기</ChatBtn>
                {/* </ProfileContents> */}
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
            <BottomModal setIsModalOpen={setIsModalOpen} reports={reportOptions} />
          </>
        )}
        <TabMenu/>
      </Container>
    </>
  )
}
