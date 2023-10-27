import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../Styles/reset.style'
import { SplashScreen, SplashContent, SplashLogo } from '../../Components/Splash/Splash.styles';
import logoPetlink from '../../assets/image/logo-petlink.png';
import txtPetlink from '../../assets/image/logo-txt.png';

function SplashPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); // isVisible 상태 변수 추가

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      navigate('/login');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    isVisible && (
      <Container>
      <SplashScreen>
        <SplashContent>
          <SplashLogo src={logoPetlink} alt="Logo" />
          <SplashLogo src={txtPetlink} alt="Logo" />
        </SplashContent>
      </SplashScreen>
      </Container>
    )
  );
}

export default SplashPage;