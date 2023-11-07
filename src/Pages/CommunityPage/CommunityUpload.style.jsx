import styled from 'styled-components';
import dropdownIcon from '../../assets/image/icon-dropdown.png'

export const Header = styled.header`
  width: 100%;
  height: 48px;
  /* padding: 0 16px; */
  box-sizing: border-box;
  border-bottom: 1px solid #DBDBDB;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    height: 60px;
  }
`;

export const HeaderButton = styled.button`
  width: 48px;
  height: 48px;

  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
  }
`;

export const SaveButton = styled.button`
  width: 90px;
  height: 32px;
  margin-right: 16px;
  border-radius: 32px;
  background-color: ${({ isActive }) => (isActive ? '#004E98' : '#7299BE')};
  color: white;

    @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const DetailContainer = styled.div`
  width: 100%;
  padding: 17px 34px;
  box-sizing: border-box;
`;

export const AddTxtForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (min-width: 768px) {
    gap: 25px;
  }
`

export const CustomInput = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PostInfo = styled.div` 
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    border-bottom: 1px solid #DBDBDB;
  }

  textarea {
    height: 90px;
    resize: none;
    border: 1px solid #DBDBDB;
    line-height: 1.5;
    margin-bottom: 30px;

    @media (min-width: 768px) {
      height: 120px;
    }
  }

  input:focus {
    outline: none;
    border-bottom: 1px solid #004E98;
  }

  textarea:focus {
    outline: none;
    border: 1px solid #004E98;
  }

  input::placeholder,
  textarea::placeholder {
    color: #DBDBDB;
  }

  @media (min-width: 768px) {
    gap: 15px;

    input,
    textarea {
      font-size: 14px;
    }
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  color:#767676;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DropdownSelect = styled.select`
  width: 100%; 
  border: 1px solid #707070;  
  border-radius: 4px;
  background-color: white;
  padding: 5px 8px;
  appearance: none;
  background-image: url(${dropdownIcon});  // 화살표 모양 SVG 추가
  background-size: 11px 7px;
  background-repeat: no-repeat;
  background-position: right 15px center; 
  padding-right: 30px;
  color: #707070;
  font-size: 0.9rem;  

  &:focus {
    outline: none;
    border-color: #004E98;
  }

  option {
    padding: 5px;
    font-size: 0.9rem; 
  }

    @media (min-width: 768px) {
    width: 50%;
  }
`;

export const InputTitle = styled.div`
  color: #767676;
  font-size: 12px;

    @media (min-width: 768px) {
    font-size: 14px;
  }
`;

// 필수 입력 표시
export const Required = styled.span`
  color: red;
  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`

export const AddImg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputImg = styled.div`
  width: 100%; // 모바일 화면 기준 너비
  max-height: 204px; // 최대 높이 설정
  padding-top: calc(204 / 375 * 100%); // 비율 조정
  background-color: #F2F2F2;
  background-image: url(${props => props.img || "none"});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  margin-bottom: 30px;

  input[type="file"] {
    display: none;
  }

  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto 30px;
  }
`;

export const AddImgBtn = styled.button`
  width: 60px;
  height: 60px;
  position: absolute;
  right: 0;
  bottom: 0;

  label {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 36px;
    height: 36px;
  }

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;

    img {
    width: 50px;
    height: 50px;
  }
  }
`;
