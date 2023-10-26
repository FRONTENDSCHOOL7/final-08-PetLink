import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  height: 48px;
  /* padding: 0 16px; */
  box-sizing: border-box;
  border-bottom: 1px solid #DBDBDB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderButton = styled.button`
  width: 48px;
  height: 48px;

  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
  }
`

export const SaveButton = styled(HeaderButton)`
  width: 90px;
  height: 32px;
  margin-right: 16px;
  border-radius: 32px;
  background-color: ${props => props.$active ? "#004E98" : "#7299BE"};
  color: white;
`

export const DetailContainer = styled.main`
  width: 100%;
  padding: 17px 34px;
  box-sizing: border-box;
`

export const AddImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const InputTitle = styled.p`
  color: #767676;
  font-size: 12px;
`

export const InputImg = styled.div`
  width: 100%;
  height: 204px; // 사이즈 고려
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
`

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
`

export const AddTxtForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

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
`