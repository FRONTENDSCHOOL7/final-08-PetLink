import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon, LogoText, SplashContainer, SplashContent, SubText } from '../../Components/Splash/Splash.styles';
import logoPetlink from '../../assets/image/logo-petlink.png';

function SplashPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); // isVisible 상태 변수 추가

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // 상태를 false로 설정하여 스플래시 화면을 숨깁니다.
      navigate('/login'); // 홈 페이지로 리디렉션
    }, 2000); // 2초 후

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    isVisible && (
      <SplashContainer>
        <SplashContent>
          <LogoIcon src={logoPetlink} alt="반결고리 로고" />
          <LogoText>반결고리</LogoText>
          <SubText>반려동물 연결고리 </SubText>
        </SplashContent>
      </SplashContainer>
    )
  );
}

export default SplashPage;