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
  background-color: ${props => props.$active ? "#004E98" : "#7299BE"};
  color: white;
`;

export const DetailContainer = styled.div`
  width: 100%;
  padding: 17px 34px;
  box-sizing: border-box;
`;

export const CustomInput = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PostInfo = styled.div` 
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;

  input {
    border: none;
    border-bottom: 1px solid #DBDBDB;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: #DBDBDB;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 43px;
`;

export const DropdownSelect = styled.select`
  width: 125px; 
  border: 1px solid #707070;  
  border-radius: 4px;
  margin-left: 49px;
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
    border-color: #DBDBDB;
  }

  option {
    padding: 5px;
    font-size: 0.9rem; 
  }
`;

export const InputTitle = styled.div`
  color: #767676;
  font-size: 12px;
`;

export const AddImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputImg = styled.div`
  width: 100%;
  height: 204px;
  border-radius: 10px;
  border: 0.5px solid #DBDBDB;
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
`;
