import styled from 'styled-components';
import imgUploadBtn from '../../assets/image/icon-img-button.png'

export const Container = styled.div`
  position: relative;
  background-color: white;
  width: 390px;
  height: 100%;
  margin: auto;
`;

// Header
export const Header = styled.header`
  display: flex;
  padding: 16px 13px 12px 19px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
`;

export const BackBtn = styled.img`
  width: 22px;
  height: 22px;
`;

export const UploadBtn = styled.button`
  width: 90px;
  height: 32px;
  border-radius: 32px;
  background-color: #7299BE;
  color: white;
`

export const InputField = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical; // 사용자가 세로로만 크기 조절 가능하도록 설정
  height: 150px;
`;

export const ImageUpload = styled.input`
  display: none; // 기본 input 스타일 숨김
`;

export const ImageUploadLabel = styled.div`
  position: absolute;  // 절대 위치 지정
  right: 20px;         // 오른쪽에서 20px 떨어진 위치
  bottom: 20px;        // 하단에서 20px 떨어진 위치
  display: inline-block;
  width: 42px;  // 이미지 크기에 맞게 조절
  height: 42px; // 이미지 크기에 맞게 조절
  background-image: url(${imgUploadBtn});
  background-size: cover;
  cursor: pointer;

  label {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const ImagePreviewBox = styled.div`
  width: 100%; // 원하는 너비로 조정
  height: 200px; // 원하는 높이로 조정
  background-color: #D3D3D3; // 회색 배경
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; // 이미지가 박스를 벗어나지 않게 함
  margin-top: 20px; // 상단 여백

  img {
    max-width: 100%; // 이미지가 박스 너비를 넘지 않게 함
    max-height: 100%; // 이미지가 박스 높이를 넘지 않게 함
    object-fit: cover; 
  }
`;
