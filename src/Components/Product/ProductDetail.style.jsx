import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 48px;
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
  border-radius: 50%;
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
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`
