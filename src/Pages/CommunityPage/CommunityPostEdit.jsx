import React, { useState, useEffect } from 'react';
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style';
import { Header, HeaderButton, Required, SaveButton, AddImg, InputTitle, InputImg, AddImgBtn, PostInfo, CategoryContainer, DropdownSelect, AddTxtForm } from './CommunityUpload.style'
import { useNavigate, useParams  } from 'react-router-dom';
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

// 게시글 수정 페이지 메인 컴포넌트
export default function CommunityEditUpload() {
    // 페이지 이동을 위한 useNavigate 훅 사용
    const navigate = useNavigate();

    // 게시글 관련 상태들 정의 (제목, 내용, 카테고리, 이미지 URL, 모달 창 표시 여부 등)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
    // useParams 훅을 사용하여 URL에서 postId 추출
    const { postId } = useParams();

    // 게시글 제목, 카테고리, 내용의 유효성 검사를 위한 useEffect
    useEffect(() => {
      const isTitleValid = title.length >= 2 && title.length <= 15;
      setIsAllFieldsFilled(category && isTitleValid && content.trim() !== '');
    }, [title, category, content]); // title, category, content가 변경될 때마다 실행됩니다.

    // 페이지 마운트 시 기존 게시글 데이터를 불러오는 useEffect
    useEffect(() => {
      // 게시글 상세 정보를 가져오는 함수 정의
      const fetchPostDetails = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`https://api.mandarin.weniv.co.kr/post/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const postData = JSON.parse(response.data.post.content);
          setTitle(postData.title);
          setContent(postData.contentText);
          setCategory(postData.category);
          setImgUrl(response.data.post.image);
        } catch (error) {
          console.error('Failed to fetch post details', error);
        }
      };

      fetchPostDetails();
    }, [postId]);

    // 게시글 수정 제출 처리 함수
    const handlePostUpdate = async (e) => {
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
      const updateData = {
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
        await axios.put(`https://api.mandarin.weniv.co.kr/post/${postId}`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        navigate('/community'); 
      } catch (err) {
        console.error(err);
      }
    };

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
    

    // CommunityPostEdit.jsx파일의 경우 게시글을 수정하는 페이지이므로, handlePostSubmit함수는 필요하지 않음. 이 함수는 새로운 게시물을 생성하고 서버에 제출하는 함수이므로 코드 제거해도 될 것으로 보임.확인 필요.(handlePostSubmit함수는 CommunityUpload.jsx파일에 선언되어있음)
    const handlePostSubmit = async (e) => {
      e.preventDefault();
  
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
                {/* 뒤로가기 버튼: 클릭 시 모달 창을 표시합니다. */}
                <HeaderButton onClick={() => setShowModal(true)}><img src={backBtn} alt="" /></HeaderButton>
                {/* 저장 버튼: isAllFieldsFilled 상태에 따라 활성화 상태가 결정되며, 게시물을 수정하는 함수를 호출합니다.
                isAllFieldsFilled 상태를 SaveButton의 isActive prop으로 전달 */}
                <SaveButton isActive={isAllFieldsFilled} onClick={handlePostUpdate}>업로드</SaveButton>
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
