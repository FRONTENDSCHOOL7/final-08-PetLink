import { Link } from 'react-router-dom';
import styled from 'styled-components';


// 서치 스타일드 컴포넌트
export const HeaderLayout = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #DBDBDB;

  @media (min-width: 768px) {
    height: 60px;
  }
`

export const HeaderTitle = styled.h1`
  padding: 8px 16px;
  color: #004E98;
  font-size: 23px;
  font-family: 'Yeongdo-Rg';

  @media (min-width: 768px) {
    font-size: 30px;
  }
`

export const HeaderButton = styled.button`
  width: 48px;
  height: 48px;

  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    img {
      width: 28px;
      height: 28px;
    }
  }
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 22px;
    object-fit: cover;
  }
`
export const SearchImg =styled.img`
  width: 34px;
  height: 22px;
  padding-right: 16px;
  object-fit: cover;

`
export const SearchInput = styled.input`
  padding: 6px 16px;
  margin-right: 16px;
  width: 100%;
  height: 32px;
  border-radius: 32px;
  background-color: #F2F2F2;
  font-size: 14px;
  cursor: pointer;
    
  &:focus {
    border: 1px solid #004e98 ;
  }
`

export const HeaderBackTxtContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const HeaderBackTxt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderBackBtn = styled.button`
  width: 48px;
  height: 48px;

  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    img {
      width: 28px;
      height: 28px;
    }
  }
`

export const HeaderTxt = styled.h1`
  font-size: 14px;
  color: #004e98;
`

export const HeaderMoreBtn = styled.button`
  position: absolute;
  right: 0;
  width: 48px;
  height: 48px;

  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    img {
      width: 30px;
      height: 30px;
    }
  }
`