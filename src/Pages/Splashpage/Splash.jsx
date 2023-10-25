import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplashScreen, SplashContent, SplashLogo } from '../../Components/Splash/Splash.styles';
import logoPetlink from '../../assets/image/logo-petlink.png';
import txtPetlink from '../../assets/image/logo-txt.png';

function SplashPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); // isVisible 상태 변수 추가

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // 상태를 false로 설정하여 스플래시 화면을 숨깁니다.
      navigate('/login'); // 홈 페이지로 리디렉션
    }, 3000); // 3초 후

    return () => {
      clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 정리합니다.
    };
  }, [navigate]);

  return (
    isVisible && (
      <SplashScreen>
        <SplashContent>
          <SplashLogo src={logoPetlink} alt="Logo" />
          <SplashLogo src={txtPetlink} alt="Logo" />
        </SplashContent>
      </SplashScreen>
    )
  );
}

export default SplashPage; // 컴포넌트 이름을 SplashPage로 수정
