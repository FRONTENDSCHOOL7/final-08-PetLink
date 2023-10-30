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
  
  useEffect(()=> {
    setIsActive(!!(imageUrl && isValidProductName(productName) && price && productLink))
  }, [imageUrl, productName, price, productLink])

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

      let filename = res.data.filename;
      const baseUrl = 'https://api.mandarin.weniv.co.kr/';
      const fullPath = baseUrl + filename;
      setImageUrl(fullPath)
    } catch(err) {
      console.error(err);
    }
  };

  const isValidProductName = (name) => { // 상품명 2~15자 이내 조건
    return name.length >=2 && name.length <= 15;
  }

  const handleSaveProduct = async () => {
    if (!isActive) {
      alert("필수 입력사항을 입력해주세요.");
      return;
    }
    if (isNaN(price) || price < 1) {
      alert("가격은 1원 이상의 숫자로 입력하셔야 합니다.");
      return;
    }

    const token = localStorage.getItem("token");
    const productData = {
      itemName: productName,
      price: Number(price),
      link: productLink,
      itemImage: imageUrl,
      category: category
    }

    try {
      const res = await axios.post('https://api.mandarin.weniv.co.kr/product', {
        product: productData,
      }, {
        headers: {
          Authorization : `Bearer ${token}`,
          "Content-type" : "application/json"
        },
      });

      console.log(res.data);
      navigate('/market');
    } catch (error) {
      console.error(error);
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
