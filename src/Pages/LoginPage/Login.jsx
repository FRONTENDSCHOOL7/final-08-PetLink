import React, { useState } from "react";
import { GlobalStyle, Container } from '../../Styles/reset.style'
import { ButtonGroup, LoginButton, Divider, Logo } from "../../Components/Login/Login.styles";
import { LogoIcon, LogoText } from '../../Components/Splash/Splash.styles';
import { useNavigate } from "react-router-dom";
import SNSLoginSection from "../../Components/Login/SnsLogin";
import LoginForm from "../../Components/Login/LoginForm";
import logoPetlink from '../../assets/image/logo-petlink.png';

function LoginPage({ handlePage }) {
  const navigate = useNavigate();
  const [view, setView] = useState("initial");
  const [email, setEmail] = useState("");
  

  return (
    <>
    <GlobalStyle/>
    <Container style={{ backgroundColor: '#6C9BD1', overflow: 'hidden' }}>
    <div>
        {view === "initial" ? (
          <Logo>
            <LogoIcon src={logoPetlink}/>
            <LogoText>반결고리</LogoText>
          </Logo>
        ) : null}

        {view === "initial" && (
          <SNSLoginSection>
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
    </Container>
    </>
  );
}

export default LoginPage;
