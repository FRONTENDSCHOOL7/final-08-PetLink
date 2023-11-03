import styled from 'styled-components'
import {Link} from 'react-router-dom'

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

  &:hover,
  &.active {
    background-color: #004E98;
  }
`

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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: #004E98;
    font-size: 14px;
  }
`

export const PriceLikesWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LikeBtn = styled.button`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  img {
    width: 16px;
    height: 15px;
    display: block; // 주변 요소와 간격 설정
  }

  span {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`


export const BtnAdd = styled.button`
  display: inline-block;
  position: fixed;
  bottom: 70px;
  right: calc(50% - 175px); // Container의 max-width: 390px; 고려한 오른쪽 여백 계산
  z-index: 100;

  img {
    width: 51px;
    height: 51px;
  }
`