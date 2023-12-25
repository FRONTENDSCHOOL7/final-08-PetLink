import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as DropdownComponents from "./Dropdown";
import TabMenu from "../Common/TabMenu/TabMenu";
import HeaderLayouts from "../../Components/Common/Header/Header";
import { GlobalStyle, Container, SubContainer } from "../../Styles/reset.style";
import {
  Title,
  ProfileImage,
  ImageUpbtn,
  ImageWrap,
  InputGroup,
  EditWrap,
  StyledInput,
  Styledpetinfo,
  SubBtn,
  PetInfo,
} from "./Profile.style";
import { Errormessage } from "./ProfileEdit.style";
import { FieldLabel } from "../Login/LoginForm.style";

function convertInfoToTags(intro, pet, gender, birthdate, location) {
  // intro = `#intro:${intro ? intro.replace(/^(#intro:)+/, "") : ""}`;
  intro = `#intro:${intro || ""}`;
  pet = `#pet:${pet || ""}`;
  gender = `#gender:${gender || ""}`;
  birthdate = `#birthdate:${birthdate || ""}`;
  location = `#location:${location || ""}`;
  return [intro, pet, gender, birthdate, location, "#bangyeolgori"]
    .filter(Boolean)
    .join(" ");
}

async function checkAccountNameAvailability(accountname, currentAccountName) {
  // 현재 사용자의 accountname과 입력된 accountname이 같다면, 중복 검사 생략
  if (accountname === currentAccountName) {
    return true;
  }

  try {
    const token = localStorage.getItem("your_token_key");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };

    const requestBody = {
      user: {
        accountname: accountname,
      },
    };

    const response = await axios.post(
      "https://api.mandarin.weniv.co.kr/user/accountnamevalid",
      requestBody,
      config
    );

    return response.data.message === "사용 가능한 계정ID 입니다.";
  } catch (error) {
    console.error("Error checking account name availability:", error);
    return false;
  }
}

function ProfileEdit() {
  const [username, setUsername] = useState("");
  const [accountname, setAccountname] = useState("");
  const [intro, setIntro] = useState("");
  const [pet, setPet] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [accountnameError, setAccountnameError] = useState("");
  const [currentAccountname, setCurrentAccountname] = useState("");
  const navigate = useNavigate();
  
  // 수정 버튼 활성화
  const isEnabled = username.trim() && accountname.trim();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api.mandarin.weniv.co.kr/user/myinfo",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : null,
              "Content-type": "application/json",
            },
          }
        );
        console.log("API response:", response.data);
  
        if (response.data && response.data.user) {
          const user = response.data.user;
          const tags = user.intro ? user.intro.split(" ") : [];
          const extractedTags = tags.reduce((acc, tag) => {
            const [key, value] = tag.split(":");
            acc[key] = value || "";
            return acc;
          }, {});
  
          setUsername(user.username);
          setAccountname(user.accountname);
          setCurrentAccountname(user.accountname);
          setIntro(extractedTags['#intro'] || "");
          setPet(extractedTags['#pet'] || "");
          setGender(extractedTags['#gender'] || "");
          setBirthdate(extractedTags['#birthdate'] || "");
          setLocation(extractedTags['#location'] || "");
          setImage(user.image);
          setPreviewImage(user.image);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchData();
  }, []);  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleBlur = (field) => async (event) => {
    const value = event.target.value.trim();
    if (field === "username") {
      if (!value) {
        setUsernameError("활동명을 입력하세요.");
      } else {
        setUsernameError("");
      }
    } else if (field === "accountname") {
      if (!value) {
        setAccountnameError("계정 ID를 입력하세요.");
      } else if (value === currentAccountname) {
        setAccountnameError(""); // 현재 accountname과 동일하면 에러 표시 안함
      } else {
        // 중복 검사
        const isAvailable = await checkAccountNameAvailability(value);
        if (!isAvailable) {
          setAccountnameError("이미 사용중인 계정 ID입니다.");
        } else {
          setAccountnameError("");
        }
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formIsValid = true;

    // username 및 accountname 필드 검사
    if (!username.trim()) {
      setUsernameError("활동명을 입력하세요.");
      formIsValid = false;
    }
    if (!accountname.trim()) {
      setAccountnameError("계정 ID를 입력하세요.");
      formIsValid = false;
    }

    if (!formIsValid, !isEnabled) {
      return;
    }

    const token = localStorage.getItem("token");
    let imageUrl = image;
    if (image && typeof image !== "string") {
      imageUrl = await imageUpload(image);
      if (!imageUrl) {
        console.error("Failed to upload image.");
        return;
      }
    }

    const taggedIntro = convertInfoToTags(intro, pet, gender, birthdate, location);


    const userData = {
      username,
      accountname,
      intro: taggedIntro,
      image: imageUrl,
    };

    try {
      const response = await axios.put(
        "https://api.mandarin.weniv.co.kr/user",
        { user: userData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.user) {
        console.log("Profile updated successfully:", response.data.user);
        navigate('/profile');
      } else {
        console.error(
          "Update error:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Update error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // 프로필 사진 업로드
  async function imageUpload(file) {
    const url = "https://api.mandarin.weniv.co.kr";
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(url + "/image/uploadfile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.filename) {
        return url + "/" + data.filename;
      } else {
        console.error("Image upload failed:", data);
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // 활동명 2 ~ 10자 제한
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
  

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderLayouts logo={true} backTxt={true} />
        <SubContainer>
        <Title>프로필 수정</Title>
        <form onSubmit={handleSubmit}>
          <ImageWrap>
            {previewImage ? (
              <ProfileImage src={previewImage} alt="Profile Preview" />
            ) : (
              <ProfileImage src={image} alt="Profile" />
            )}
            <ImageUpbtn uploaded={!!previewImage}>
              <input type="file" onChange={handleImageChange} />
            </ImageUpbtn>
          </ImageWrap>
          <EditWrap>
        <InputGroup>
          <FieldLabel>활동명</FieldLabel>
          <StyledInput
            type="text"
            value={username}
            minLength="2"
            maxLength="10"
            onChange={inputUsername}
            onBlur={handleBlur("username")}
            required
          />
        {usernameError && <Errormessage>{usernameError}</Errormessage>}
      </InputGroup>
            <InputGroup>
            <FieldLabel>상태메시지</FieldLabel>
            <StyledInput
              value={intro}
              placeholder="자신의 반려동물에 대해 소개해 주세요!"
              onChange={(e) => {
                const newValue = e.target.value.replace(/^#intro:/, "");
                if (!newValue.includes("accountname")) {
                  setIntro(newValue);
                }
              }}
            />
          </InputGroup>
              <Styledpetinfo>반려동물 정보등록</Styledpetinfo>
            <PetInfo>
              <InputGroup>
                <label>종류</label>
                <DropdownComponents.DropdownSelect
                  value={pet}
                  onChange={(e) => setPet(e.target.value)}
                  options={DropdownComponents.petOptions}
                />
              </InputGroup>
              <InputGroup>
                <label>성별</label>
                <DropdownComponents.DropdownSelect
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  options={DropdownComponents.genderOptions}
                />
              </InputGroup>
              <InputGroup>
                <label>생일</label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <label>위치</label>
                <DropdownComponents.DropdownSelect
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  options={DropdownComponents.locationOptions}
                />
              </InputGroup>
            </PetInfo>
          </EditWrap>
            <SubBtn disabled={!isEnabled} type="submit">프로필 수정</SubBtn>
        </form>
        </SubContainer>
        <TabMenu />
      </Container>
    </>
  );
}

export default ProfileEdit;
