import React from 'react';
import SNSLoginSection from './SnsLogin';
import styles from './MainLogin.module.css'; // CSS 모듈을 추가해주세요.

function MainLoginPage({ handlePage }) {
    return (
        <div className={styles.mainLoginPage}>
            <h1>반결고리</h1>
            
            {/* SNS 로그인  */}
            <SNSLoginSection /> 

            {/* 이메일로그인 회원가입 */}
            <div className={styles.buttonGroup}>
                <button className={`${styles.loginButton} ${styles.email}`} onClick={() => handlePage('login')}>
                    이메일 로그인
                </button>
                <div className={styles.divider}>|</div> 
                <button className={`${styles.loginButton} ${styles.signup}`} onClick={() => handlePage('join')}>
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default MainLoginPage;
