import styled from 'styled-components';

// 상품 이미지
export const ProductImg = styled.div`
  img {
    width: 100%;
    height: 250px;
    object-fit: contain;
    margin-bottom: 15px;
  }
`

// 유저 프로필
export const ProfileInfo = styled.div`
  height: 58px;
  margin-bottom: 25px;
  display: flex;
`

export const ProfileImg = styled.img`
  margin-right: 12px;
  border-radius: 50%;
`

export const ProfileContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 13px;
  color: #767676;
`

// 채팅하기 버튼
export const ChatBtn = styled.button`
  width: 87px;
  height: 30px;
  color: white;
  font-size: 13px;
  background-color: #004E98;
  border-radius: 30px;
`

// 상품 정보
export const ProductInfo = styled.div`
  margin-bottom: 30px;

  h4 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  strong {
    font-size: 16px;
    color: #004E98;
  }
`

// 상품 설명
export const ProductDesc = styled.div`

  p {
    font-size: 14px;
    line-height: 1.5;
  }
`

// 모달창 클릭 시 배경 흐리게
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`
