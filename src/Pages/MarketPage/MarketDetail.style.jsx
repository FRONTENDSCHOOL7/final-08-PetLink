import styled,{createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

  body, h1, h2, h3, h4, ul, li, button, img, p, strong {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #e9e9e9;
    font-family: 'Nanum Gothic', sans-serif;
  }

  ul, li {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    background: none;
    border: 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: white;
  position: relative;
`;

export const Header = styled.header`
  width: 100%;
  height: 48px;
  /* padding: 0 16px; */
  box-sizing: border-box;
  border-bottom: 1px solid #DBDBDB;
  display: flex;
  justify-content: space-between;
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

export const DetailContainer = styled.main`
  width: 100%;
  padding: 17px 34px;
  box-sizing: border-box;
`

export const ProductImg = styled.div`
  img {
    width: 100%;
    height: 247px;
    object-fit: cover;
    margin-bottom: 15px;
  }
`

export const ProfileInfo = styled.div`
  height: 58px;
  margin-bottom: 16px;
  display: flex;
`

export const ProfileImg = styled.img`
  margin-right: 12px;
`

export const ProfileTxt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`

export const ProfileName = styled.p`
  font-size: 14px;
`

export const ProfileId = styled.p`
  font-size: 12px;
  color: #767676;
`
export const ChatBtn = styled.button`
  width: 87px;
  height: 24px;
  color: white;
  font-size: 12px;
  background-color: #004E98;
  border-radius: 30px;
`
export const ProfileContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ProductInfo = styled.div`
  margin-bottom: 40px;

  h4{
    font-size: 14px;
    margin-bottom: 6px;
  }

  strong {
    font-size: 12px;
    color: #004E98;
  }
`

export const ProductDesc = styled.div`
  h4 {
    font-size: 14px;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
  }
`

