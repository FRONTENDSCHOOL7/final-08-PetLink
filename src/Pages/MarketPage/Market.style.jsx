import styled,{createGlobalStyle} from 'styled-components'
import {Link} from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: white;
  position: relative;
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  color: #004E98;
  padding: 13px;
  border-bottom: 1px solid #DBDBDB;
`
export const NavMenu = styled.ul`
  margin: 14px 21px;
  display: flex;
  gap: 6px;
`
export const BtnNav = styled.button`
  width: 87px;
  height: 24px;
  background-color: #6C9BD1;
  border-radius: 30px;
  font-size: 12px;
  color: white;
  font-weight: 700;

  &.active {
    background-color: #004E98;
  }
`
/* .item-container-wrapper {
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
  height: 100vh;
} */

export const ItemContainer = styled.ul`
  padding: 41px 34px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const Item = styled.li`
  width: 145px;
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
  gap: 10px;

  img {
    height: 102px;
    object-fit: cover;
  }

  p {
    font-size: 14px;
  }

  strong {
    color: #004E98;
    font-size: 14px;
  }
`

export const BtnAddWrap = styled.div`
  text-align: right;
`

export const BtnAdd = styled.button`
  display: inline-block;
  position: absolute;
  bottom: 30px;
  right: 30px;
  /* z-index: 100; */

  img {
    width: 51px;
    height: 51px;
  }
`