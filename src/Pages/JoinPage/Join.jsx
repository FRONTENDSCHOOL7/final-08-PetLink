import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyle, Container, SubContainer } from "../../Styles/reset.style";
import {
  PetInfo,
  StyledPetInfo,
  ImageWrap,
  ImageUpBtn,
  ProfileImage,
  SelectInfo,
  SelectInfoItem,
  Overlay,

} from "../../Components/Join/JoinPage.style";
import {
  TitleWrap,
  SubmitButton,
  InputField,
  StyledInput,
  FieldLabel,
  Label,
} from "../../Components/Login/LoginForm.style";
import PopupModal from '../../Components/Common/Modal/PopupModal'
import * as DropdownComponents from "../../Components/Profile/Dropdown";
import HeaderLayouts from "../../Components/Common/Header/Header";

const JoinPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accountnameError, setAccountnameError] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(false); // 이메일 중복체크
  const [password, setPassword] = useState("");
  const [accountname, setAccountname] = useState("");
  const [intro, setIntro] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://api.mandarin.weniv.co.kr/1698644803298.jpg"
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [info, setInfo] = useState("");
  const [currentPage, setCurrentPage] = useState("join");
  const [showModal, setShowModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAccountNameValid, setIsAccountNameValid] = useState(false);
  const [pet, setPet] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [location, setLocation] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [usernameError, setUsernameError] = useState('');
  const convertInfoToTags = () => {
    return `#bangyeolgori`;
  };
  
  // 텍스 빠질
  const handleUsernameBlur = () => {
    setUsernameTouched(true);
  };
  
  const handleStartBanGyeol = () => {
    setIsModalOpen(true);
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const accountNameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!email || !emailRegex.test(email))
      errors.email = "잘못된 이메일 형식입니다.";
    if (!password || password.length < 6)
      errors.password = "비밀번호는 6자 이상이어야 합니다.";
    if (!accountname || !accountNameRegex.test(accountname))
      errors.accountname = "영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const goToProfilePage = () => {
    setCurrentPage("profile");
  };

  const validateAccountname = (accountname) => {
    const accountNameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!accountNameRegex.test(accountname)) {
      setAccountnameError("영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.");
      setIsAccountNameValid(false); // Set account name as invalid
    } else {
      setAccountnameError("");
      setIsAccountNameValid(true); // Set account name as valid
    }
  };

  // 이메일 중복체크
  const checkEmailAvailability = async (email) => {
    setEmailError(""); // 이메일 에러 메시지 초기화

    if (!email) {
      return;
    }

    const reqUrl = "https://api.mandarin.weniv.co.kr/user/emailvalid";
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: { email } }),
    });

    const data = await res.json();

    if (res.ok) {
      setEmailError(data.message); // API 응답 메시지를 에러 메시지로 설정
    } else {
      setEmailError("이메일 검증 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 입력 필드에 포커스가 이동하면 이메일 검증
  const handlePasswordFocus = async () => {
    await checkEmailAvailability(email);
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

  // 활동명
  const inputUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  
    if (newUsername.length > 0 && newUsername.length < 2) {
      setUsernameError('2글자 이상 입력하세요.');
    } else if (newUsername.length > 10) {
      setUsernameError('10자 이내여야 합니다.');
    } else {
      setUsernameError('');
    }
  };

  const extractIntro = () => {
    const match = info.match(/#intro:([^#]*)/);
    return match ? match[1].trim() : "";
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

  // 계정 이름 중복체크
  const checkAccountNameAvailability = async (accountname) => {
    const accountNameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!accountNameRegex.test(accountname)) {
      setAccountnameError("영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.");
      return;
    }

    const reqUrl = "https://api.mandarin.weniv.co.kr/user/accountnamevalid";
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: { accountname } }),
    });

    const data = await res.json();

    if (res.ok) {
      setAccountnameError(data.message); // API 응답 메시지를 에러 메시지로 설정
    } else {
      setAccountnameError("계정 이름 검증 중 오류가 발생했습니다.");
    }
  };

  // 활동명 입력 필드에 포커스가 이동하면 계정 이름 검증
  const handleUsernameFocus = async () => {
    await checkAccountNameAvailability(accountname);
  };

  const handleIntroChange = (e) => {
    const introValue = e ? e.target.value : intro;
    setIntro(introValue);
  
    const hashtags = [
      `#intro:${introValue || ''}`,
      `#pet:${pet || ''}`,
      `#gender:${gender || ''}`,
      `#birthdate:${birthdate || ''}`,
      `#location:${location || ''}`,
      `#bangyeolgori`
    ].join(" ").trim();
  
    setInfo(hashtags);
  };

  useEffect(() => {
    handleIntroChange();
  }, []);

  const handleSubmit = async () => {
    const reqUrl = "https://api.mandarin.weniv.co.kr/user/";
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (res.ok) {
      setCurrentPage("profile");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  const submitJoin = () => {
    console.log("Starting the join process"); // 회원가입 과정 시작

    if (!validateForm()) {
      console.log("Validation Error: Form is not valid."); // 유효성 검사 에러
      return;
    }

    console.log("Form is valid. Proceeding to join."); // 유효성 검사 통과, 회원가입 진행

    if (!/^[a-zA-Z0-9_.]+$/.test(accountname)) {
      console.log("Validation Error: Account name is not valid."); // 계정 이름 유효성 검사 에러
      setAccountnameError("영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.");
      return;
    }
  
    console.log("Form is valid. Proceeding to join.");

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
        console.log("Join successful."); // 회원가입 성공
        setShowModal(true);
      } else {
        console.log("Join Error: An error occurred during the join process."); // 회원가입 중 에러 발생
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
      <GlobalStyle />
      <Container>
        <HeaderLayouts back={true} />
        {/* <FormWrapper> */}

          {currentPage === "join" && (
            <>
            <TitleWrap>이메일로 회원가입</TitleWrap>
              <SubContainer>
                <InputField>
                  <FieldLabel>이메일</FieldLabel>
                  <StyledInput
                    type="email"
                    placeholder="이메일 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <span style={{ fontSize:"14px", color: "red" }}>{emailError}</span>
                  )}
                </InputField>
                <InputField>
                <FieldLabel>비밀번호</FieldLabel>
                <StyledInput
                  type="password"
                  placeholder="비밀번호 입력해주세요."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // Call validateForm function here if you want to validate as the user types
                  }}
                  onFocus={handlePasswordFocus} // 비밀번호 필드에 포커스가 가면 이메일 검증 실행
                />
                {password.length > 0 && password.length < 6 && (
                  <span style={{ fontSize: "14px", color: "red" }}>비밀번호 6자 미만입니다.</span>
                )}
              </InputField>
  
                <SubmitButton
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValidEmailAndPassword()}
                >
                  다음
                </SubmitButton>
              </SubContainer>
            </>
          )}

          {currentPage === "profile" && (
            <>
            <TitleWrap>프로필 설정</TitleWrap>
              {/* 새로운 레이아웃 */}
              <SubContainer>
                <ImageWrap>
                    {previewImage ? (
                    <ProfileImage src={previewImage} alt="Profile Preview" />
                    ) : (
                    <ProfileImage src={imgSrc} alt="Profile" />
                    )}
                    <ImageUpBtn uploaded={!!previewImage}>
                    <input type="file" onChange={handleChangeImage} />
                    </ImageUpBtn>
                </ImageWrap>
                <InputField>
                <FieldLabel>활동명</FieldLabel>
                <StyledInput
                  type="text"
                  placeholder="2 ~ 10자 이내여야 합니다."
                  minLength="2"
                  maxLength="10"
                  value={username}
                  onChange={inputUsername}
                />
                {usernameError && (
                  <span style={{ fontSize: "14px", color: "red" }}>{usernameError}</span>
                )}
              </InputField>
                <InputField>
                  <FieldLabel>계정 ID</FieldLabel>
                  <StyledInput
                    type="text"
                    placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                    onChange={(e) => {
                      setAccountname(e.target.value);
                      validateAccountname(e.target.value);
                    }}
                    onBlur={handleUsernameFocus} // 계정 이름 필드에서 포커스가 떠나면 계정 이름 검증 실행
                  />
                  {accountnameError && (
                    <span style={{ fontSize:"14px", color: "red" }}>{accountnameError}</span>
                  )}
                </InputField>
                <InputField>
                  <Label>상태메시지</Label>
                  <StyledInput
                    type="text"
                    placeholder="자신의 반려동물에 대해 소개해 주세요!"
                    value={intro}
                    onChange={handleIntroChange}
                  />
                </InputField>
                <PetInfo>
                <StyledPetInfo>반려동물 정보등록</StyledPetInfo>
                <SelectInfo>
                  <SelectInfoItem>
                    <label>종류</label>
                    <DropdownComponents.DropdownSelect
                      value={pet}
                      onChange={(e) => {
                        setPet(e.target.value);
                        handleIntroChange();
                      }}
                      options={DropdownComponents.petOptions}
                    />
                  </SelectInfoItem>

                  <SelectInfoItem>
                    <label>성별</label>
                    <DropdownComponents.DropdownSelect
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        handleIntroChange();
                      }}
                      options={DropdownComponents.genderOptions}
                    />
                  </SelectInfoItem>

                  <SelectInfoItem>
                    <label>생일</label>
                    <input
                      type="date"
                      value={birthdate}
                      onChange={(e) => {
                        setBirthdate(e.target.value);
                        handleIntroChange();
                      }}
                    />
                  </SelectInfoItem>

                  <SelectInfoItem>
                    <label>위치</label>
                    <DropdownComponents.DropdownSelect
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        handleIntroChange();
                      }}
                      options={DropdownComponents.locationOptions}
                    />
                  </SelectInfoItem>
                </SelectInfo>

                </PetInfo>
                <SubmitButton
                type="button"
                onClick={() => {
                  if (isValidProfile() && isAccountNameValid) {
                    submitJoin();
                    handleStartBanGyeol();
                  }
                }}
                disabled={!isValidProfile() || !isAccountNameValid}
              >
                반결고리 시작하기
              </SubmitButton>
              </SubContainer>
            </>
          )}

        {/* 모달창 */}
        {isModalOpen &&(
          <>
            <Overlay onClick={()=> setIsModalOpen(false)}/>
            <PopupModal 
              isVisible={isModalOpen}
              setIsVisible={setIsModalOpen}
              alertText="반결고리에 오신 것을 환영합니다🎉"
              confirmText="로그인하기"
              onConfirm={handleLogin}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default JoinPage;
