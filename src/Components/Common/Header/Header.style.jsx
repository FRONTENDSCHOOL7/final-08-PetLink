import styled from 'styled-components';


// export const Container = styled.div`
//   width: 100%;
//   max-width: 390px;
//   margin: 0 auto;
//   background-color: white;
// `;

// 서치 스타일드 컴포넌트
export const HeaderLayout = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  gap: 20px;
  border-bottom: 1px solid #DBDBDB;
`

export const HeaderButton = styled.button`
  width: 44px;
  height: 44px;

  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
  }
`

export const SearchImg =styled.img`
      width: 22px;
      height: 22px;
    object-fit: cover;

`
export const SearchInput = styled.input`
    padding: 6px 16px;
    width: 100%;
    height: 32px;
    border-radius: 32px;
    background-color: #F2F2F2;
    /* color: #C4C4C4; */
    font-size: 14px;
    cursor: pointer;
    &:focus{
        border: 1px solid #004e98 ;
    }
`