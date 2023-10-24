import React from 'react';
import styles from './SnsLogin.module.css';

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

function SNSLoginSection() {
  return (
      <div className={styles.container}> {/* 컨테이너 스타일 적용 */}
          <section className={styles.buttonContainer}> {/* 버튼 컨테이너 스타일 적용 */}
              <button
                  onClick={() => socialLogin("google")}
                  className={`${styles.googleConnect} ${styles.customButton}`}
              >
                  <span>구글 계정으로 로그인</span>
              </button>
              <button
                  onClick={() => socialLogin("facebook")}
                  className={`${styles.facebookConnect} ${styles.customButton}`}
              >
                  <span>페이스북 계정으로 로그인</span>
              </button>
              <button
                  onClick={() => socialLogin("naver")}
                  className={`${styles.naverConnect} ${styles.customButton}`}
              >
                  <span>네이버 계정으로 로그인</span>
              </button>
              <button
                  onClick={() => socialLogin("kakao")}
                  className={`${styles.kakaoConnect} ${styles.customButton}`}
              >
                  <span>카카오톡 계정으로 로그인</span>
              </button>
          </section>
      </div>
  );
}

export default SNSLoginSection;
