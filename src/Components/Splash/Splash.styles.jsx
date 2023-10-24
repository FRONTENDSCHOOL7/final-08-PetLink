import styled from 'styled-components';

export const SplashScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #004E98;
  z-index: 1000;
`;

export const SplashContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px; /* 작은 화면에 대해 폰트 크기를 조절합니다. */
  }

  @media (min-width: 769px) {
    font-size: 20px; /* 큰 화면에 대해 폰트 크기를 조절합니다. */
  }
`;

export const SplashLogo = styled.img`
  max-width: 50%;
  height: auto;
  margin-bottom: 20px;
`;