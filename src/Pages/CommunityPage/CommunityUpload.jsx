import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from '../../Styles/reset.style'
import { Container, Header, BackBtn, UploadBtn, InputField, TextArea, ImageUpload, ImageUploadLabel, ImagePreviewBox } from './CommunityUpload.style';

import PopupModal from '../../Components/Common/Modal/PopupModal';
import backBtn from '../../assets/image/icon-arrow-left.png'
import imgUploadBtn from '../../assets/image/icon-img-button.png'


export default function CommunityUploadPage() {

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const handleBackBtnClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/community');
  };
  
  const handleCancel = () => {
    setShowModal(false);
  };
  

  const handleBackBtnClick = () => {
    navigate('/community');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };


  
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <BackBtn src={backBtn} alt="뒤로가기" onClick={handleBackBtnClick} />
          <UploadBtn>업로드</UploadBtn>
        </Header>

        <main>
          <div className='category-choice'>
            <p>카테고리</p>
          </div>

          <form>
            <label>
                제목:
                <InputField type="text" placeholder="제목을 입력하세요" />
              </label>
              <label>
                내용:
                <TextArea placeholder="내용을 입력하세요"></TextArea>
              </label>
              <ImageUploadLabel>
          <ImageUpload type="file" accept="image/*" id="imgUpload" onChange={handleImageChange} />
          <label htmlFor="imgUpload"></label>
        </ImageUploadLabel>
        <ImagePreviewBox>
          {preview ? <img src={preview} alt="Upload preview" /> : "이미지를 추가해주세요"}
        </ImagePreviewBox>
      </form>
        </main>
        <nav>
          {/* NavBar 컴포넌트 추가 필요 */}
        </nav>
        {showModal && <PopupModal onConfirm={handleConfirm} onCancel={handleCancel} />}
      </Container>
    </>
  );
}