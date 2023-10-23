import React, { useState, useEffect } from 'react';
import styles from './Splash.module.css';
import Logo from '../../assets/images/logo-petlink.png';
import LogoText from '../../assets/images/logo-txt.png';

function SplashScreen({ duration = 3000, onEnd }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onEnd) onEnd(); // 여기에서 onEnd 콜백이 호출되어야 합니다.
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onEnd]);

  return (
    visible && (
        <div className={styles['splash-screen']}>
            <div className={styles['splash-content']}>
                <img src={Logo} className={styles['splash-logo']} />
                <img src={LogoText} className={styles['splash-logo']} />
            </div>
        </div>
    )
);
}

export default SplashScreen;