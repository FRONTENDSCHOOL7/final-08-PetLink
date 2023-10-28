import React, { useState } from 'react';
import { GlobalStyle, Container } from '../../Styles/reset.style';
import { Header, HeaderButton, DetailContainer, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, PostInfo, CategoryContainer, DropdownSelect } from './CommunityUpload.style'
import { useNavigate } from 'react-router-dom';
import backBtn from '../../assets/image/icon-arrow-left.png';
import imgBtn from '../../assets/image/icon-img-button.png';
import PopupModal from '../../Components/Common/Modal/PopupModal';

function CustomInput({ title, placeholder, type = "text", value, onChange }) {
  if (type === "dropdown") {
    return (
      <PostInfo>
        <InputTitle>{title}</InputTitle>
        <select value={value} onChange={onChange}>
          <option value="">선택</option>
          <option value="정보 공유">정보 공유</option>
          <option value="산책 크루">산책 크루</option>
          <option value="반려 돌보미">반려 돌보미</option>
          <option value="실종 신고">실종 신고</option>
        </select>
      </PostInfo>
    );
  }

  if (type === "textarea") {
    return (
      <PostInfo>
        <InputTitle>{title}</InputTitle>
        <textarea placeholder={placeholder} value={value} onChange={onChange} rows="10" />
      </PostInfo>
    );
  }

  return (
    <PostInfo>
      <InputTitle>{title}</InputTitle>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} maxLength={title ? 15 : undefined} />
    </PostInfo>
  );
}


export default function CommunityUploadPage() {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackBtnClick = () => {
    setShowModal(true);  // backBtn 클릭 시 모달을 보이게 합니다.
  };

  const isTitleValid = title.length >= 2 && title.length <= 15;
  const isAllFieldsFilled = category && isTitleValid && content;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <HeaderButton onClick={handleBackBtnClick}><img src={backBtn} alt="" /></HeaderButton>
          <SaveButton isActive={isAllFieldsFilled}>업로드</SaveButton>
        </Header>
        <PopupModal 
            isVisible={showModal}
            setIsVisible={setShowModal}
            onConfirm={() => navigate('/community')}
            onCancel={() => console.log('Cancel')}
            alertText="작성을 취소하시겠습니까?"
            cancelText="취소"
            confirmText="확인"
        />
        <DetailContainer>
        <CategoryContainer>
            <InputTitle>카테고리</InputTitle>
            <DropdownSelect value={category} onChange={e => setCategory(e.target.value)}>
              <option value="" disabled selected>선택</option> 
              <option value="정보 공유">정보 공유</option>
              <option value="산책 크루">산책 크루</option>
              <option value="반려 돌보미">반려 돌보미</option>
              <option value="실종 신고">실종 신고</option>
            </DropdownSelect>
          </CategoryContainer>
          <CustomInput
            title="제목"
            placeholder="2~15자 이내여야 합니다."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <CustomInput
            title="내용"
            type="textarea"
            placeholder="내용을 입력해 주세요."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
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
        </DetailContainer>
      </Container>
    </>
  );
}
