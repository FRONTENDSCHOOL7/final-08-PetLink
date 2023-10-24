import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginFrom.module.css";

function LoginForm({ handlePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid]);

  let navigate = useNavigate();

  const login = async (email, password) => {
    const url = "https://api.mandarin.weniv.co.kr/user/login/";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      const resJson = await res.json();

      console.log("API Response:", resJson);

      if (res.ok) {
        // 로그인 성공, 토큰을 로컬 스토리지에 저장하고 프로필 페이지로 이동
        localStorage.setItem("token", resJson.user.token);
        navigate("/home");
      } else {
        // 로그인 실패, 에러 메시지를 알림
        alert(resJson.message || "로그인에 실패했습니다!");
      }
    } catch (err) {
      console.error(err);
      alert("로그인에 실패했습니다!");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex = /^.{8,}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    if (!emailValid || !pwValid) {
      alert("Please enter a valid email and password.");
    } else {
      await login(email, password);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>로그인</div>
      <form onSubmit={submitLogin}>
        <div className={styles.contentWrap}>
          {/* Email Input */}
          <div className={styles.inputTitle}>이메일 주소</div>
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              type="text"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmail}
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputTitle} style={{ marginTop: "26px" }}>
            비밀번호
          </div>
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={password}
              onChange={handlePassword}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={notAllow}
            className={styles.bottomButton}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
