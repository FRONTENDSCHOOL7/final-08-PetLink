import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SNSLoginSection from "../../Components/Login/SnsLogin";
import LoginForm from "../../Components/Login/LoginForm";
import { ButtonGroup, LoginButton, Divider, Logo } from "../../Components/Login/Login.styles";
import logoImage from '../../assets/image/logo-petlink.png'
import logoTxt from '../../assets/image/logo-txt.png'

function LoginPage({ handlePage }) {
  const navigate = useNavigate();
  const [view, setView] = useState("initial");

  return (
    <div>
        <Logo>
          <img src={logoImage} alt="반결고리 로고" />
          <img src={logoTxt} alt="텍스트" />
        </Logo>

      {view === "initial" && (
        <SNSLoginSection>
          {/* 이메일로그인 회원가입 */}
          <ButtonGroup>
            <LoginButton onClick={() => setView("login")}>
              이메일 로그인
            </LoginButton>
            <Divider>|</Divider>
            <LoginButton onClick={() => navigate("/join")}>
              회원가입
            </LoginButton>
          </ButtonGroup>
        </SNSLoginSection>
      )}
      {view === "login" && <LoginForm handlePage={handlePage} />}
    </div>
  );
}

export default LoginPage;