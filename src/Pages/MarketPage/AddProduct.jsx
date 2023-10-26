import React, { useEffect, useState } from 'react'
import { Header, HeaderButton, DetailContainer, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, ProductInfo, AddTxtForm } from './AddProduct.style'
import { GlobalStyle, Container } from '../../Styles/reset.style'
import { useNavigate } from 'react-router-dom'
import backBtn from '../../assets/image/icon-arrow-left.png'
import imgBtn from '../../assets/image/icon-img-button.png'

function ProductInput({title, placeholder, type = "text", value, onChange}) {
  return (
    <ProductInfo>
      <InputTitle>{title}</InputTitle>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </ProductInfo>
  )
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [isActive, setIsActive] = useState(false);
  
  useEffect(()=> {
    setIsActive(!!(productName && price && productLink))
  }, [productName, price, productLink])

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader(); // FileReader => 비동기적으로 데이터를 읽기 위해 사용되는 객체
      reader.onloadend = () => { // 파일 읽기가 완료됐을 때 호출되는 이벤트 핸들러
        setSelectedImg(reader.result)
      };
      reader.readAsDataURL(file); // 파일의 데이터 문자열로 표현
    }
  }


  return (
    <>
      <GlobalStyle/>
      <Container>
        <Header>
          <HeaderButton onClick={()=>navigate(-1)}><img src={backBtn} alt="" /></HeaderButton>
          <SaveButton $active={isActive}>저장</SaveButton>
          {/* '$' 접두사 사용 이유 => "이 속성은 HTML 태그에 존재하지 않지만 스타일을 위해 임시로만 사용하겠다"는 의미 */}
        </Header>
        <DetailContainer>
          <AddImg>
            <InputTitle>이미지 등록</InputTitle>
            <InputImg img={selectedImg}>
              <input 
                type="file" 
                id='imgUpload'
                onChange={handleImgChange}
              />
              <AddImgBtn>
                <label htmlFor="imgUpload">
                  <img src={imgBtn} alt="사진 추가 버튼" />
                </label>
              </AddImgBtn>
            </InputImg>
          </AddImg>
          <AddTxtForm>
            <ProductInput 
              title="상품명" 
              placeholder="2~15자 이내여야 합니다."
              value={productName}
              onChange={e=>setProductName(e.target.value)}
            />
            <ProductInput 
              title="가격" 
              placeholder="숫자만 입력 가능합니다." 
              type="number"
              value={price}
              onChange={e=>setPrice(e.target.value)}
            />
            <ProductInput 
              title="판매 링크" 
              placeholder="URL을 입력해 주세요."
              value={productLink}
              onChange={e=>setProductLink(e.target.value)}
            />
          </AddTxtForm>
        </DetailContainer>
      </Container>
    </>
  )
}
