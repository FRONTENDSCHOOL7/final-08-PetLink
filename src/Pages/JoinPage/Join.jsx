import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  FormWrapper,
  Logo,
  Input,
  Button,
  Modal,
  ModalContent,
  CloseButton,
  TitleWrap,
  SubmitButton,
  InputField,
  StyledInput,
  FieldLabel,
} from "../../Components/Join/JoinPage.style";

const JoinPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountname, setAccountname] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://api.mandarin.weniv.co.kr/Ellipse.png"
  );
  const [info, setInfo] = useState("");
  const [currentPage, setCurrentPage] = useState("join");
  const [showModal, setShowModal] = useState(false);

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
      <Wrapper>
        <FormWrapper>
          <Logo>이메일 회원가입</Logo>

          {currentPage === "join" && (
            <>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={inputEmail}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={inputPassword}
              />
              <SubmitButton
                type="button"
                onClick={goToProfilePage}
                disabled={!isValidEmailAndPassword()}
              >
                Next
              </SubmitButton>
            </>
          )}

          {currentPage === "profile" && (
            <>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={inputUsername}
              />
              <Input
                type="text"
                placeholder="Account Name"
                value={accountname}
                onChange={inputAccountname}
              />
              <Input
                type="text"
                placeholder="Introduction"
                value={info}
                onChange={inputInfo}
              />
              <SubmitButton
                type="button"
                onClick={submitJoin}
                disabled={!isValidProfile()}
              >
                Join
              </SubmitButton>
            </>
          )}

          {showModal && (
            <Modal>
              <ModalContent>
                <TitleWrap>반결고리에 오신것을 환영합니다!</TitleWrap>
                <Button type="button" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <CloseButton>&times;</CloseButton>
              </ModalContent>
            </Modal>
          )}
        </FormWrapper>
      </Wrapper>
    </>
  );
};

export default JoinPage;
