import styled, { keyframes } from 'styled-components';

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const SplashContainer = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  background-color: #6C9BD1;
  display: flex;
  justify-content: center;
  align-items: center;

  // 태블릿 화면
  @media (min-width: 768px) {
    max-width: 768px;
  }
`;

export const SplashContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${bounce} 1s infinite;

  @media (max-width: 768px) {
    font-size: 14px; /* 작은 화면에 대해 폰트 크기를 조절합니다. */
  }

  @media (min-width: 769px) {
    font-size: 20px; /* 큰 화면에 대해 폰트 크기를 조절합니다. */
  }
`;

export const LogoIcon = styled.img`
  width: 190px;
  height: 120px;
`;

export const LogoText = styled.span`
  margin-top: 16px;
  font-size: 60px;
  font-family: 'Yeongdo-Rg';
  color: white;
  display: flex;
  justify-content: center;

  & > span {
    display: inline-block;
    animation: ${bounce} 1s infinite;
  }

  & > span:nth-child(1) { animation-delay: 0.1s; }
  & > span:nth-child(2) { animation-delay: 0.2s; }
  & > span:nth-child(3) { animation-delay: 0.3s; }
  & > span:nth-child(4) { animation-delay: 0.4s; }
`;

export const SubText = styled.span`
  margin-top: 10px;
  font-size: 14px;
  color: white;
`