import React, { useState, useEffect } from 'react';
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style';
import { Header, HeaderButton, Required, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, PostInfo, CategoryContainer, DropdownSelect, AddTxtForm } from './CommunityUpload.style'
import { useNavigate } from 'react-router-dom';
import backBtn from '../../assets/image/icon-arrow-left.png';
import imgBtn from '../../assets/image/icon-img-button.png';
import PopupModal from '../../Components/Common/Modal/PopupModal';
import axios from 'axios';

// CustomInput 컴포넌트 정의: 다양한 타입의 입력 필드 생성
function CustomInput({ title, isRequired, placeholder, type = "text", value, onChange }) {
  // 드롭다운 타입의 입력 필드 생성
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

  // 텍스트 영역 타입의 입력 필드 생성
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

// 커뮤니티 업로드 페이지 메인 컴포넌트
export default function CommunityUploadPage() {
     // 'useNavigate' 훅을 사용하여 라우터 내의 페이지 이동 기능을 활성화함. 이를 통해 사용자가 양식을 제출하거나 취소 버튼을 클릭했을 때 다른 페이지로 이동할 수 있음.
    const navigate = useNavigate();
    
    // 'title' 상태는 사용자가 입력한 게시글의 제목을 저장하며, 'setTitle'함수를 통해 상태 업데이트. 초기값은 빈 문자열('')
    const [title, setTitle] = useState('');

    // 'content' 상태는 사용자가 입력한 게시글의 내용을 저장하며, 'setContent' 함수를 통해 상태 업데이트. 초기값은 빈 문자열('')
    const [content, setContent] = useState('');

    // 'category' 상태는 사용자가 선택한 게시글의 카테고리 저장. 'setCategory' 함수를 통해 상태 업데이트. 초기값은 빈 문자열로, 어떤 카테고리도 선택되지 않은 상태를 나타냄.
    const [category, setCategory] = useState('');

    // 'imgUrl'상태는 사용자가 업로드한 이미지의 URL저장. 'setImgUrl'함수를 통해 상태 업데이트. 초기값은 빈 문자열로, 아직 이미지가 업로드되지 않았음을 나타냄
    const [imgUrl, setImgUrl] = useState('');

    // 'showModal'상태는 모달 창의 표시 여부를 관리하며, 'setShowModal'함수를 통해 이 상태를 업데이트하며, 초기값은 false로 설정되어 모달 창이 기본적으로 표시되지 않음
    const [showModal, setShowModal] = useState(false);

    // 'isAllFieldsFilled' 상태는 폼의 모든 필드가 채워졌는지 여부를 나타냄. 이 상태는 사용자가 모든 필수 정보를 입력했는지 검사하는데 사용되며, 초기값은 false로 설정되어 있어 모든 필드가 채워지지 않은 상태로 간주함
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

    // useEffect를 사용하여 입력 필드의 유효성을 검사함
    useEffect(() => {
      const isTitleValid = title.length >= 2 && title.length <= 15;
      setIsAllFieldsFilled(category && isTitleValid && content.trim() !== '');
    }, [title, category, content]); // title, category, content가 변경될 때마다 실행됩니다.

    // 이미지 업로드 처리 함수
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
    

    // 게시물 제출 처리 함수
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

    // 컴포넌트의 반환 부분
    return (
        <>
            <GlobalStyle />
            <Container>
            <Header>
              {/* 뒤로가기 버튼: 클릭 시 모달 창을 표시합니다. */}
              <HeaderButton onClick={() => setShowModal(true)}><img src={backBtn} alt="뒤로가기 버튼" /></HeaderButton>
              {/* 저장 버튼: isAllFieldsFilled 상태에 따라 활성화 상태가 결정되며, 게시물을 제출하는 함수를 호출합니다.
              isAllFieldsFilled 상태를 SaveButton의 isActive prop으로 전달 */}
              <SaveButton isActive={isAllFieldsFilled} onClick={handlePostSubmit}>업로드</SaveButton>
            </Header>
            {/* 팝업 모달 창: showModal 상태에 따라 표시 여부가 결정됩니다. */}
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
