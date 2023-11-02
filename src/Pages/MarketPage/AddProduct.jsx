import React, { useEffect, useState } from 'react'
import { Header, HeaderButton, DetailContainer, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, ProductInfo, AddTxtForm, Required } from './AddProduct.style'
import { GlobalStyle, Container } from '../../Styles/reset.style'
import { useNavigate } from 'react-router-dom'
import backBtn from '../../assets/image/icon-arrow-left.png'
import imgBtn from '../../assets/image/icon-img-button.png'
import axios from 'axios'
import { CategoryContainer } from '../CommunityPage/CommunityUpload.style'

// 공통으로 사용되는 input 컴포넌트
function ProductInput({title, isRequired, placeholder, type = "text", value, onChange}) {
  return (
    <ProductInfo>
      <InputTitle>
        {title} 
        {isRequired && <Required>*</Required>}
      </InputTitle>
      
      {type === "textarea" ? (
        <textarea placeholder={placeholder} value={value} onChange={onChange}></textarea>
      ) : (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      )}
    </ProductInfo>
  );
}

export default function AddProduct() {
  const navigate = useNavigate();

  // 상품 정보 관련 상태
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [description, setDescription] = useState("");

  const [isActive, setIsActive] = useState(false);

  
  // 상품정보 유효성 검사로 저장 버튼 활성화 여부 결정
  useEffect(()=> {
    const isValid = imageUrl && isValidProductName(productName) && price && productLink && description;
    setIsActive(!!isValid)
  }, [imageUrl, productName, price, productLink, description])

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
      const fullPath = `https://api.mandarin.weniv.co.kr/${filename}`;
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
    if(!isValidProductName(productName)) {
      alert("상품명은 2~15자 이내로 입력해주세요.");
      return;
    }
    if (isNaN(price) || price < 1) {
      alert("가격은 1원 이상의 숫자로 입력하셔야 합니다.");
      return;
    }
    if (!isActive) {
      alert("필수 입력사항을 입력해주세요.");
      return;
    }
    

    const token = localStorage.getItem("token"); // 로컬스토리지에서 사용자 토큰 가져오기

    // 카테고리와 상품명을 결합하여 새로운 상품명을 생성
    const formattedProductName = `
      productName: ${productName}
      category: ${category} 
      description: ${description}`;

    const productData = {
      itemName: formattedProductName,
      price: Number(price),
      link: productLink,
      itemImage: imageUrl,
      category: category,
      description: description
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
          <HeaderButton onClick={()=>navigate(-1)}>
            <img src={backBtn} alt="뒤로가기" />
          </HeaderButton>
          <SaveButton $active={isActive} onClick={handleSaveProduct}>저장</SaveButton>
          {/* '$' 접두사 사용 이유 => "이 속성은 HTML 태그에 존재하지 않지만 스타일을 위해 임시로만 사용하겠다"는 의미 */}
        </Header>

        <DetailContainer>
          <CategorySection category={category} setCategory={setCategory}/>
          <ImageUploadSection imageUrl={imageUrl} handleImgChange={handleImgChange}/>
          <ProductDetails 
            productName={productName} setProductName={setProductName}
            price={price} setPrice={setPrice}
            productLink={productLink} setProductLink={setProductLink}
            description={description} setDescription={setDescription}
          />
        </DetailContainer>
      </Container>
    </>
  )
}

function CategorySection({category, setCategory}) {
  return (
    <CategoryContainer>
      <InputTitle>카테고리 <Required>*</Required></InputTitle>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">선택</option>
        <option value="bg_dogs">강아지</option>
        <option value="bg_cats">고양이</option>
        <option value="bg_etc.">기타</option>
      </select>
    </CategoryContainer>
  )
}

function ImageUploadSection({imageUrl, handleImgChange}) {
  return(
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
  )
}

function ProductDetails({productName, setProductName, price, setPrice, productLink, setProductLink, description, setDescription}) {
  return(
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
      <ProductInput 
        title="상품 설명" 
        isRequired={true}
        placeholder="상품에 대한 설명을 입력하세요."
        value={description}
        onChange={e=>setDescription(e.target.value)}
        type='textarea'
      />
    </AddTxtForm>
  )
}