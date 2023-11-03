import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as DropdownComponents from "./Dropdown";
import TabMenu from "../Common/TabMenu/TabMenu";
import { GlobalStyle, Container } from "../../Styles/reset.style";
import { Title, ProfileImage, ImageUpbtn, ImageWrap, InputGroup, EditWrap, StyledInput, Styledlabel, Styledpetinfo, SubBtn, PetInfo } from "./Profile.style";

function convertInfoToTags(intro, pet, gender, birthdate, location) {
    intro = intro ? `#intro:${intro.replace(/^(#intro:)+/, '')}` : '';
    pet = pet ? `#pet:${pet}` : '';
    gender = gender ? `#gender:${gender}` : '';
    birthdate = birthdate ? `#birthdate:${birthdate}` : '';
    location = location ? `#location:${location}` : '';
    return [intro, pet, gender, birthdate, location, '#bangyeolgori'].filter(Boolean).join(' ');
}

function extractInfoFromTags(tagString) {
    const info = {};
    const cleanedTagString = tagString.replace(/ undefined/g, '');
    const tags = cleanedTagString.split(" #");

    tags.forEach((tag) => {
        const [key, value] = tag.includes(':') ? tag.split(":") : [tag, ''];
        if (key && value) {
            info[key.trim()] = value.trim();
        } else if (key) {
            info[key.trim()] = true;
        }
    });

    return info;
  }, {});

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    username: "",
    accountname: "",
    intro: "",
    pet: "",
    gender: "",
    birthdate: "",
    location: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProfileData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseURL}/user/myinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });

      if (response.data && response.data.user) {
        const user = response.data.user;
        const extractedInfo = extractInfoFromTags(user.intro);
        setProfile({
          ...user,
          intro: extractedInfo.intro || '',
          ...extractedInfo,
        });
        setPreviewImage(user.image);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    setProfile((prevState) => ({ ...prevState, image: file }));
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const imageUpload = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${apiBaseURL}/image/uploadfile`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.filename ? `${apiBaseURL}/${data.filename}` : null;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      let imageUrl = profile.image;
      if (profile.image && !(typeof profile.image === "string")) {
        imageUrl = await imageUpload(profile.image);
        if (!imageUrl) {
          console.error("Failed to upload image.");
          return;
        }
      }

      const taggedIntro = convertInfoToTags(
        profile.intro,
        profile.pet,
        profile.gender,
        profile.birthdate,
        profile.location
      );

      const userData = {
        username: profile.username,
        accountname: profile.accountname,
        intro: taggedIntro,
        image: imageUrl,
      };

      try {
        const response = await axios.put(
          `${apiBaseURL}/user`,
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
        }
      } catch (error) {
        console.error(
          "Update error:",
          error.response ? error.response.data : error.message
        );
      }
    },
    [profile, imageUpload]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>프로필 수정</Title>
        {/* <HeaderLayouts title="반결장터" logo={true} /> */}
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
                    required
                    />
                </InputGroup>
                <InputGroup>
                    <Styledlabel>계정 ID*</Styledlabel>
                    <StyledInput
                    type="text"
                    value={accountname}
                    onChange={(e) => setAccountname(e.target.value)}
                    required
                    />
                </InputGroup>
                <InputGroup>
                    <Styledlabel>상태메시지</Styledlabel>
                    <StyledInput
                    value={intro}
                    onChange={(e) => {
                    // 사용자가 입력한 값에서 #intro: 태그를 제거하고 상태를 업데이트합니다.
                        const newValue = e.target.value.replace(/^#intro:/, '');
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
};

export default ProfileEdit;