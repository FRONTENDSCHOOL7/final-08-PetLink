import React, { useState, useEffect } from 'react';
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style';
import { Header, HeaderButton, Required, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, PostInfo, CategoryContainer, DropdownSelect, AddTxtForm } from './CommunityUpload.style'
import { useNavigate } from 'react-router-dom';
import backBtn from '../../assets/image/icon-arrow-left.png';
import imgBtn from '../../assets/image/icon-img-button.png';
import PopupModal from '../../Components/Common/Modal/PopupModal';
import axios from 'axios';

function CustomInput({ title, isRequired, placeholder, type = "text", value, onChange }) {
  if (type === "dropdown") {
    return (
      <PostInfo>
        <InputTitle>
          {title}
          {isRequired && <Required>*</Required>}
        </InputTitle>
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
        <InputTitle>
          {title} 
          {isRequired && <Required>*</Required>}
        </InputTitle>
        <textarea placeholder={placeholder} value={value} onChange={onChange} rows="10" />
      </PostInfo>
    );
  }

  return (
    <PostInfo>
        <InputTitle>
          {title} 
          {isRequired && <Required>*</Required>}
        </InputTitle>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} maxLength={title ? 15 : undefined} />
    </PostInfo>
  );
}

export default function CommunityUploadPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

    useEffect(() => {
      const isTitleValid = title.length >= 2 && title.length <= 15;
      setIsAllFieldsFilled(category && isTitleValid && content.trim() !== '');
    }, [title, category, content]); // title, category, content가 변경될 때마다 실행됩니다.

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
    
      try {
        const res = await axios.post('https://api.mandarin.weniv.co.kr/image/uploadfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        let filename = res.data.filename;
        const baseUrl = 'https://api.mandarin.weniv.co.kr/';
        const fullPath = baseUrl + filename;
        setImgUrl(fullPath);
      } catch (err) {
        console.error(err);
      }
    };
    
    const handlePostSubmit = async (e) => {
        e.preventDefault();

      // 제목의 유효성 검사 (2~15자 검사)
        const isTitleValid = title.length >= 2 && title.length <= 15;

        // 모든 필드가 채워져 있는지 검사
        const isAllFieldsFilled = category && isTitleValid && content.trim();

        // 카테고리가 선택되지 않았을 경우
        if (!category) {
          alert("카테고리를 선택해주세요.");
          return;
        }

        // 제목이 유효하지 않을 경우
        if (!isTitleValid) {
          alert("제목은 2~15자 이내로 입력해주세요.");
          return;
        }

        // 내용이 입력되지 않았을 경우
        if (!content.trim()) {
          alert("내용을 입력해주세요.");
          return;
        }

        // 모든 필드가 채워져 있지 않을 경우
        if (!isAllFieldsFilled) {
          alert("필수 입력사항을 입력해주세요.");
          return;
        }
  
      const token = localStorage.getItem('token');
      const postData = {
        post: {
        content: JSON.stringify({
            title: title,
            category: category,
            contentText: content
        }),
        image: imgUrl
    }
      };
  
      try {
        const res = await axios.post('https://api.mandarin.weniv.co.kr/post', postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log(res.data);
        navigate('/community'); 

      } catch (err) {
        console.error(err);
      }
    };

    return (
        <>
            <GlobalStyle />
            <Container>
            <Header>
              <HeaderButton onClick={() => setShowModal(true)}><img src={backBtn} alt="뒤로가기 버튼" /></HeaderButton>
              {/* isAllFieldsFilled 상태를 SaveButton의 isActive prop으로 전달 */}
              <SaveButton isActive={isAllFieldsFilled} onClick={handlePostSubmit}>업로드</SaveButton>
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
            <SubContainer>
                <CategoryContainer>
                    <InputTitle>카테고리 <Required>*</Required></InputTitle>
                    <DropdownSelect value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">선택</option>
                        <option value="정보 공유">정보 공유</option>
                        <option value="산책 크루">산책 크루</option>
                        <option value="반려 돌보미">반려 돌보미</option>
                        <option value="실종 신고">실종 신고</option>
                    </DropdownSelect>
                </CategoryContainer>
                <AddTxtForm>
                <CustomInput
                    title="제목"
                    isRequired={true}
                    placeholder="2~15자 이내여야 합니다."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <CustomInput
                    title="내용"
                    isRequired={true}
                    type="textarea"
                    placeholder="내용을 입력해 주세요."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                </AddTxtForm>
                <AddImg>
                    <InputTitle>이미지 등록</InputTitle>
                    <InputImg img={imgUrl}>
                        <input
                            type="file"
                            id='imgUpload'
                            onChange={handleImageUpload}
                        />
                        <AddImgBtn>
                            <label htmlFor="imgUpload">
                                <img src={imgBtn} alt="사진 추가 버튼" />
                            </label>
                        </AddImgBtn>
                    </InputImg>
                </AddImg>
              </SubContainer>
        </Container>
        </>
    );
}
