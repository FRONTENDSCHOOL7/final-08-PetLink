import React, { useState, useEffect } from "react";
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style'
import { TitleWrap, SubmitButton, InputField, StyledInput, FieldLabel, ErrorMsg } from './LoginForm.style'
import { LoginButton } from "../../Components/Login/Login.styles";
import { useNavigate } from "react-router-dom";
import { saveToken } from '../../utils/tokenUtils';

function LoginForm({ handlePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const setErrorMsg = (msg) => {
    setError(msg);
  }

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
        saveToken(resJson.user.token); // 로그인 성공 시 토큰을 저장합니다.
        navigate("/home");
      } else {
        alert(resJson.message || "이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("이메일 또는 비밀번호가 일치하지 않습니다.");
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
    if (!emailValid || !pwValid || !email || !password) {
      alert("Please enter a valid email and password.");
    } else {
      await login(email, password);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <TitleWrap>로그인</TitleWrap>
        <SubContainer>
        <form onSubmit={submitLogin}>
          
          <InputField>
            <FieldLabel>이메일</FieldLabel>
            <StyledInput
              type="text"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmail}
            />
          </InputField>
          
          <InputField>
            <FieldLabel>비밀번호</FieldLabel>
            <StyledInput
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={password}
              onChange={handlePassword}
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </InputField>
          
          
          <SubmitButton type="submit" disabled={notAllow}>
            로그인
          </SubmitButton>
          <LoginButton onClick={() => navigate("/join")}
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
      이메일로 회원가입
    </LoginButton>
        </form>
        </SubContainer>
      </Container>
    </>
  );
}

export default LoginForm;
