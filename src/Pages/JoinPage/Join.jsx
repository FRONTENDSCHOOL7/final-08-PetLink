import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyle, Container } from "../../Styles/reset.style"
import {
    FormWrapper,
    Button,
    Modal,
    ModalContent,
    CloseButton,
    TitleWrap,
    SubmitButton,
    PetInfo,
    Styledpetinfo
} from "../../Components/Join/JoinPage.style";
import { LoginTitleWrap, SubmitButton as LoginSubmitButton, InputField, StyledInput, FieldLabel } from "../../Components/Login/LoginForm.style"


const JoinPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountname, setAccountname] = useState("");
  const [intro, setIntro] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://api.mandarin.weniv.co.kr/Ellipse.png"
  );
  const [info, setInfo] = useState("");
  const [currentPage, setCurrentPage] = useState("join");
  const [showModal, setShowModal] = useState(false);
  const [pet, setPet] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [location, setLocation] = useState("");

  const goToProfilePage = () => {
    setCurrentPage("profile");
  };

  const join = async (joinData) => {
    const reqUrl = "https://api.mandarin.weniv.co.kr/user/";
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(joinData),
    });
    const json = await res.json();

    if (res.status === 422) {
      alert(json.message);
    } else {
      console.log(json);
    }

    return res;
  };

  const inputUsername = (e) => {
    setUsername(e.target.value);
  };
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const inputAccountname = (e) => {
    setAccountname(e.target.value);
  };
  const inputInfo = (e) => {
    setInfo(e.target.value);
  };


  const uploadImage = async (imageFile) => {
    const baseUrl = "https://api.mandarin.weniv.co.kr/";
    const reqUrl = baseUrl + "image/uploadfile";
    const form = new FormData();
    form.append("image", imageFile);
    const res = await fetch(reqUrl, {
      method: "POST",
      body: form,
    });
    const json = await res.json();
    const imageUrl = baseUrl + json.filename;
    setImgSrc(imageUrl);
  };
  const handleChangeImage = (e) => {
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  const handleIntroChange = () => {
    const hashtags = [
      `#intro:${intro}`,
      `#pet:${pet}`,
      `#gender:${gender}`,
      `#birthdate:${birthdate}`,
      `#location:${location}`,
    ];
    setInfo(hashtags.join(" "));
  };

  const submitJoin = () => {
    if (!isValidProfile()) {
      return;
    }

    const joinData = {
      user: {
        username: username,
        email: email,
        password: password,
        accountname: accountname,
        intro: info,
        image: imgSrc,
      },
    };

    join(joinData).then((response) => {
      if (response && response.status !== 422) {
        setShowModal(true);
      }
    });
  };

  const isValidEmailAndPassword = () => {
    return email.includes("@") && password.length >= 8;
  };

  const isValidProfile = () => {
    return username.length >= 2 && accountname.length >= 2;
  };

  return (
    <>
    <Container>
    <GlobalStyle/>

        <FormWrapper>
          <TitleWrap>이메일 회원가입</TitleWrap>

          {currentPage === "join" && (
            <>
                      <InputField>
            <FieldLabel>이메일</FieldLabel>
            <StyledInput
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={email}
              onChange={inputEmail}
            />
          </InputField>
          <InputField>
            <FieldLabel>비밀번호</FieldLabel>
            <StyledInput
              type="password"
              placeholder="비밀번호 입력해주세요."
              value={password}
              onChange={inputPassword }
            />
          </InputField> 
              <SubmitButton
                type="button"
                onClick={goToProfilePage}
                disabled={!isValidEmailAndPassword()}
              >
                다음
              </SubmitButton>
            </>
          )}

          {currentPage === "profile" && (
            <>
            <InputField>
            <FieldLabel>활동명</FieldLabel>
            <StyledInput
            type="text"
            placeholder="2 ~ 10자 이내여야 합니다."
            value={username}
            onChange={inputUsername}
            />
            </InputField>
            
            <InputField>
            <FieldLabel>계정 ID</FieldLabel>
            <StyledInput
            type="text"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            value={accountname}
            onChange={inputAccountname}
            />
            </InputField>

            <InputField>
            <FieldLabel>상태메시지</FieldLabel>
            <StyledInput
            type="text"
            placeholder="자신의 반려동물에 대해 소개해 주세요!"
            value={accountname}
            onChange={inputAccountname}
            />
            </InputField>

            <PetInfo 
    tagString={setInfo}
    pet={pet} setPet={setPet}
    gender={gender} setGender={setGender}
    birthdate={birthdate} setBirthdate={setBirthdate}
    location={location} setLocation={setLocation}
/>
        
            <SubmitButton
                type="button"
                onClick={submitJoin}
                disabled={!isValidProfile()}
            >
                반결고리 시작하기
            </SubmitButton>
            </>
        )}

          {showModal && (
            <Modal>
              <ModalContent>
                <TitleWrap>반결고리에 오신것을 환영합니다!</TitleWrap>
                <Button type="button" onClick={() => navigate("/login")}>
                  로그인
                </Button>
                <CloseButton>&times;</CloseButton>
              </ModalContent>
            </Modal>
          )}
        </FormWrapper>
    </Container>
    </>
  );
};

export default JoinPage;
