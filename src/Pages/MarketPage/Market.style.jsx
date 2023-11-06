import styled from 'styled-components'
import {Link} from 'react-router-dom'

// 카테고리 버튼
export const NavMenu = styled.ul`
  margin-bottom: 30px;
  display: flex;
  gap: 6px;
  padding: 0 10px;

  /* 카테고리 버튼 화면 밖으로 넘어갈 경우 */
  white-space: nowrap; // 메뉴 항목들이 한 줄에 표시되도록 설정
  overflow-x: auto; // 가로 스크롤 가능하도록 설정
  -webkit-overflow-scrolling: touch; // 모바일 기기에서의 스크롤 성능 개선

  &::-webkit-scrollbar {
    display: none; // 스크롤바를 보이지 않도록 설정 (모바일에서 주로 사용)
  }

  /* @media (min-width: 768px) {
    padding-left: 20px; // 데스크탑 화면에 맞춰 좌측 패딩 조정
    padding-right: 20px; // 데스크탑 화면에 맞춰 우측 패딩 조정
  } */
`

export const BtnNav = styled.button`
  width: 85px;
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

  @media (min-width: 480px) {
    width: 95px; // 태블릿 크기 조정
    font-size: 12px;
  }

  @media (min-width: 768px) {
    width: 105px; // 데스크탑 크기 조정
    font-size: 14px;
  }
`

// 개별 아이템
export const ItemContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  margin-bottom: 50px;
  gap: 10px;
`

export const StyledLink = styled(Link)`
  width: 165px;
  text-decoration: none;
  color: inherit;

  @media (min-width: 768px) {
    width: 222px; // 더 넓은 화면에 맞춰 좌우 패딩 조정
  }
`

export const Item = styled.li`
  width: 145px;
  margin: 0 5px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 100%;
    height: 130px;
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

  @media (min-width: 768px) {
    width: 185px; // 데스크탑 너비 조정
    margin: 0 10px 22px; // 데스크탑에서의 아이템 간 간격
  }
`

// 가격 및 좋아요
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

// 상품 추가 버튼
export const BtnAdd = styled.button`
  display: inline-block;
  position: fixed;
  bottom: 70px;
  right: calc((100% - 390px) / 2 + 16px); // 가정한 컨테이너의 max-width 및 오른쪽 여백
  z-index: 100;

  img {
    width: 51px;
    height: 51px;
  }

  // 화면이 768px 이상일 때
  @media (min-width: 768px) {
    right: calc((100% - 768px) / 2 + 45px); // 화면 너비가 768px 이상일 때 가운데 정렬
  }
`