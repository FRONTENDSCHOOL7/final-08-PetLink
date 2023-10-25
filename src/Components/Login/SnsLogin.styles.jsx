import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 90vh;
  padding: 0 20px 30px;
`;

export const SNSLoginWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 600px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomButton = styled.button`
  width: 100%;
  max-width: 400px;
  min-width: 350px;
  height: 50px;
  margin: 10px 0;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
`;

export const GoogleButton = styled(CustomButton)`
background: rgb(255, 255, 255) url('src/assets/image/icon-google.png') no-repeat scroll 12px 11px / 28px 28px padding-box border-box;
border: 1px solid #767676;

  &:hover {
    background-color: #EA4335;
    color: white;
  }
`;

export const NaverButton = styled(CustomButton)`
background: rgb(255, 255, 255) url('src/assets/image/icon-naver.png') no-repeat scroll 12px 10px / 28px 28px padding-box border-box;
border: 1px solid #00BF18;

  &:hover {
    background-color: #00BF18;
    color: white;
  }
`;

export const KakaoButton = styled(CustomButton)`
background: rgb(255, 255, 255) url('src/assets/image/icon-kakao.png') no-repeat scroll 13px 0px / 28px 45px padding-box border-box;
border: 1px solid #F2C94C;

  &:hover {
    background-color: #F2C94C;
    color: white;
  }
`;