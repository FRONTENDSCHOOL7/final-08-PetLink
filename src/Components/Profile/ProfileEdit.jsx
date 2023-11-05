import React, { useState, useEffect } from "react";
import axios from "axios";
import * as DropdownComponents from "./Dropdown";
import TabMenu from "../Common/TabMenu/TabMenu";
import HeaderLayouts from "../../Components/Common/Header/Header";
import { GlobalStyle, Container } from "../../Styles/reset.style";
import {
  Title,
  ProfileImage,
  ImageUpbtn,
  ImageWrap,
  InputGroup,
  EditWrap,
  StyledInput,
  Styledlabel,
  Styledpetinfo,
  SubBtn,
  PetInfo,
} from "./Profile.style";
import { Errormessage } from "./ProfileEdit.style";

function convertInfoToTags(intro, pet, gender, birthdate, location) {
  intro = intro ? `#intro:${intro.replace(/^(#intro:)+/, "")}` : "";
  pet = pet ? `#pet:${pet}` : "";
  gender = gender ? `#gender:${gender}` : "";
  birthdate = birthdate ? `#birthdate:${birthdate}` : "";
  location = location ? `#location:${location}` : "";
  return [intro, pet, gender, birthdate, location, "#bangyeolgori"]
    .filter(Boolean)
    .join(" ");
}

function extractInfoFromTags(tagString) {
  const info = {};
  const cleanedTagString = tagString.replace(/ undefined/g, "");
  const tags = cleanedTagString.split(" #");

  tags.forEach((tag) => {
    const [key, value] = tag.includes(":") ? tag.split(":") : [tag, ""];
    if (key && value) {
      info[key.trim()] = value.trim();
    } else if (key) {
      info[key.trim()] = true;
    }
  });

  return info;
}

// 계정ID 중복확인
// async function checkAccountNameAvailability(accountname) {
//     try {
//       const token = localStorage.getItem('token'); //
//         const config = {
//             headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-type': 'application/json'
//             }
//         };

//         const requestBody = {
//             user: {
//             accountname: accountname
//             }
//         };

//         const response = await axios.post('https://api.mandarin.weniv.co.kr/user/accountnamevalid', requestBody, config);

//         return response.data.message === "사용 가능한 계정ID 입니다.";

//         } catch (error) {
//         console.error("Error checking account name availability:", error);
//         return false;
//         }
//     }

async function checkAccountNameAvailability(accountname, currentAccountName) {
  // 현재 사용자의 accountname과 입력된 accountname이 같다면, 중복 검사를 생략합니다.
  if (accountname === currentAccountName) {
    return true; // 중복 검사를 생략하고 사용 가능하다고 가정합니다.
  }

  try {
    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem("your_token_key"); // 'your_token_key'는 실제 키 값으로 대체해야 합니다.

    // 요청 헤더에 인증 토큰과 Content-Type을 설정합니다.
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };

    // 요청 본문을 설정합니다.
    const requestBody = {
      user: {
        accountname: accountname,
      },
    };

    // POST 요청을 보냅니다.
    const response = await axios.post(
      "https://api.mandarin.weniv.co.kr/user/accountnamevalid",
      requestBody,
      config
    );

    // 응답으로 받은 메시지를 확인하여 사용 가능 여부를 반환합니다.
    return response.data.message === "사용 가능한 계정ID 입니다.";
  } catch (error) {
    console.error("Error checking account name availability:", error);
    // 에러 발생 시 사용 불가능으로 간주합니다.
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

        if (response.data && response.data.user) {
          const user = response.data.user;
          setUsername(user.username);
          setAccountname(user.accountname);
          setCurrentAccountname(user.accountname);
          const extractedInfo = extractInfoFromTags(user.intro);
          setIntro(extractedInfo.intro);
          setPet(extractedInfo.pet);
          setGender(extractedInfo.gender);
          setBirthdate(extractedInfo.birthdate);
          setLocation(extractedInfo.location);
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

    if (!formIsValid) {
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

    const taggedIntro = convertInfoToTags(
      intro,
      pet,
      gender,
      birthdate,
      location
    );

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

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderLayouts logo={true} backTxt={true} />
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
              <Styledlabel>활동명*</Styledlabel>
              <StyledInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={handleBlur("username")}
                required
              />
              {usernameError && <Errormessage>{usernameError}</Errormessage>}
            </InputGroup>
            <InputGroup>
              <Styledlabel>계정 ID*</Styledlabel>
              <StyledInput
                type="text"
                value={accountname}
                onChange={(e) => setAccountname(e.target.value)}
                onBlur={handleBlur("accountname")}
                required
              />
              {accountnameError && (
                <Errormessage>{accountnameError}</Errormessage>
              )}
            </InputGroup>
            <InputGroup>
              <Styledlabel>상태메시지</Styledlabel>
              <StyledInput
                value={intro}
                onChange={(e) => {
                  // 사용자가 입력한 값에서 #intro: 태그를 제거하고 상태를 업데이트합니다.
                  const newValue = e.target.value.replace(/^#intro:/, "");
                  setIntro(newValue);
                }}
              />
            </InputGroup>
            <PetInfo>
              <Styledpetinfo>반려동물 정보등록</Styledpetinfo>
              <div>
                <label>반려동물</label>
                <DropdownComponents.DropdownSelect
                  value={pet}
                  onChange={(e) => setPet(e.target.value)}
                  options={DropdownComponents.petOptions}
                />
              </div>
              <div>
                <label>성별</label>
                <DropdownComponents.DropdownSelect
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  options={DropdownComponents.genderOptions}
                />
              </div>
              <div>
                <label>생일</label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div>
                <label>위치</label>
                <DropdownComponents.DropdownSelect
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  options={DropdownComponents.locationOptions}
                />
              </div>
            </PetInfo>
            <SubBtn type="submit">프로필 수정</SubBtn>
          </EditWrap>
        </form>
        <TabMenu />
      </Container>
    </>
  );
}

export default ProfileEdit;
