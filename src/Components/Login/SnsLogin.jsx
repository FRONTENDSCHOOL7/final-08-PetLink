import React from 'react';
import { GlobalStyle } from '../../Styles/reset.style'
import {
  ButtonContainer,
  GoogleButton,
  NaverButton,
  KakaoButton,
  SNSLoginWrapper,
} from './SnsLogin.styles';

const socialLogin = (platform) => {
  switch (platform) {
    case "google":
      console.log("Google login not implemented yet.");

      // TODO: Implement Google login here
      break;

    case "facebook":
      console.log("Facebook login not implemented yet.");

      // TODO: Implement Facebook login here
      break;

    case "naver":
      console.log("Naver login not implemented yet.");

      // TODO: Implement Naver login here
      break;

    case "kakao":
      console.log("Kakao login not implemented yet.");

      // TODO: Implement Kakao login here
      break;

    default:
      console.error("Unknown platform:", platform);
  }
};

function SNSLoginSection({ children }) {
  return (
    <>
      <GlobalStyle/>
        <SNSLoginWrapper>
          <ButtonContainer>
            <GoogleButton onClick={() => socialLogin("google")}>
              구글 계정으로 로그인
            </GoogleButton>
            <NaverButton onClick={() => socialLogin("naver")}>
              네이버 계정으로 로그인
            </NaverButton>
            <KakaoButton onClick={() => socialLogin("kakao")}>
              카카오톡 계정으로 로그인
            </KakaoButton>
          </ButtonContainer>
          {children}
        </SNSLoginWrapper>
    </>
  );
}

export default SNSLoginSection;