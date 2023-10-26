import React from 'react'
import { GlobalStyle, Header } from '../CommunityPage/Community.style'
import { Container } from './Market.style'

export default function AddProduct() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle/>
      <Container>
        <Header>
          <HeaderButton onClick={()=>navigate(-1)}><img src={backBtn} alt="" /></HeaderButton>
          <HeaderButton>저장</HeaderButton>
        </Header>
        <DetailContainer>
          <div className='addImg'>
            <p>이미지 등록</p>
            <div>
              <img src="" alt="사진 추가 버튼" />
            </div>
          </div>
          <form className='addTxt'>
            <div className='product-name'>
              <p>상품명</p>
              <input type="text" />
            </div>
            <div className='product-price'>
              <p>가격</p>
              <input type="number" step={1000}/>
            </div>
            <div className='product-link'>
              <p>판매 링크</p>
              <input type="text" />
            </div>
          </form>
        </DetailContainer>
      </Container>
    </>
  )
}
