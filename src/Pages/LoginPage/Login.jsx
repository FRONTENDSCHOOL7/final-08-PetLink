import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SNSLoginSection from '../../Components/Login/SnsLogin';
import LoginForm from '../../Components/Login/LoginForm';
import styles from './Login.module.css';

function LoginPage({ handlePage }) {
    const navigate = useNavigate();
    const [view, setView] = useState('initial');

    return (
        <div className={styles.mainLoginPage}>
            <h1>반결고리</h1>
            
            {view === 'initial' && (
                <>
                    {/* SNS 로그인 */}
                    <SNSLoginSection /> 
                    
                    {/* 이메일로그인 회원가입 */}
                    <div className={styles.buttonGroup}>
                        <button 
                            className={`${styles.loginButton} ${styles.email}`} 
                            onClick={() => setView('login')}
                        >
                            이메일 로그인
                        </button>
                        <div className={styles.divider}>|</div> 
                        <button 
                            className={`${styles.loginButton} ${styles.signup}`} 
                            onClick={() => navigate('/join')}
                        >
                            회원가입
                        </button>
                    </div>
                </>
            )}
            
            {view === 'login' && <LoginForm handlePage={handlePage} />}
        </div>
    );
}

export default LoginPage;