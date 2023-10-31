import React, { useEffect, useState } from 'react'
import { Header, HeaderButton, DetailContainer, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, ProductInfo, AddTxtForm, Required } from './AddProduct.style'
import { GlobalStyle, Container } from '../../Styles/reset.style'
import { useNavigate } from 'react-router-dom'
import backBtn from '../../assets/image/icon-arrow-left.png'
import imgBtn from '../../assets/image/icon-img-button.png'
import axios from 'axios'
import { CategoryContainer } from '../CommunityPage/CommunityUpload.style'

function ProductInput({title, isRequired, placeholder, type = "text", value, onChange}) {
  return (
    <ProductInfo>
      <InputTitle>{title} {isRequired && <Required>*</Required>}</InputTitle>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </ProductInfo>
  )
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  
  // 상품정보 유효성 검사로 저장 버튼 활성화 여부 결정
  useEffect(()=> {
    setIsActive(!!(imageUrl && isValidProductName(productName) && price && productLink))
  }, [imageUrl, productName, price, productLink])

  // 이미지 파일 선택하고 서버에 업로드한 후 URL 받아오는 함수
  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post('https://api.mandarin.weniv.co.kr/image/uploadfile', formData, {
        headers: {
          "Content-type" : "multipart/form-data"
        }
      })

      let filename = res.data.filename; // 서버로부터 반환된 파일명
      const baseUrl = 'https://api.mandarin.weniv.co.kr/';
      const fullPath = baseUrl + filename;
      setImageUrl(fullPath) // 이미지 URL 상태 업데이트
    } catch(err) {
      console.error(err);
    }
  };

  // 상품명 유효성 검사
  const isValidProductName = (name) => { // 상품명 2~15자 이내 조건
    return name.length >=2 && name.length <= 15;
  }

  // 상품 저장 버튼 클릭 시 실행되는 함수
  const handleSaveProduct = async () => {
    if (!isActive) {
      alert("필수 입력사항을 입력해주세요.");
      return;
    }
    if (isNaN(price) || price < 1) {
      alert("가격은 1원 이상의 숫자로 입력하셔야 합니다.");
      return;
    }

    const token = localStorage.getItem("token"); // 로컬스토리지에서 사용자 토큰 가져오기
    const productData = {
      itemName: productName ,
      price: Number(price),
      link: productLink,
      itemImage: imageUrl,
      category: category
    }

    try {
      // 상품 데이터를 서버에 전송
      const res = await axios.post('https://api.mandarin.weniv.co.kr/product', {
        product: productData, // 전송할 상품 데이터
      }, {
        headers: {
          Authorization : `Bearer ${token}`,
          "Content-type" : "application/json"
        },
      });

      console.log(res.data); // 서버 응답 콘솔에 기록
      navigate('/market'); // 성공 시 마켓 페이지로 이동
    } catch (error) {
      console.error(error); // 오류 발생 시 콘솔에 기록
      alert("상품 등록에 실패했습니다.")
    }
  };

  return (
    <>
      <GlobalStyle/>
      <Container>
        <Header>
          <HeaderButton onClick={()=>navigate(-1)}><img src={backBtn} alt="" /></HeaderButton>
          <SaveButton $active={isActive} onClick={handleSaveProduct}>저장</SaveButton>
          {/* '$' 접두사 사용 이유 => "이 속성은 HTML 태그에 존재하지 않지만 스타일을 위해 임시로만 사용하겠다"는 의미 */}
        </Header>
        <DetailContainer>
          <CategoryContainer>
            <InputTitle>카테고리 <Required>*</Required></InputTitle>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">선택</option>
              <option value="dogs">강아지</option>
              <option value="cats">고양이</option>
              <option value="etc.">기타</option>
            </select>
          </CategoryContainer>
          <AddImg>
            <InputTitle>이미지 등록 <Required>*</Required></InputTitle>
            <InputImg img={imageUrl}>
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
              isRequired={true}
              placeholder="2~15자 이내여야 합니다."
              value={productName}
              onChange={e=>setProductName(e.target.value)}
            />
            <ProductInput 
              title="가격" 
              isRequired={true}
              placeholder="숫자만 입력 가능합니다." 
              type="number"
              value={price}
              onChange={e=>setPrice(e.target.value)}
            />
            <ProductInput 
              title="판매 링크" 
              isRequired={true}
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
