import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as DropdownComponents from "./Dropdown";
import TabMenu from "../Common/TabMenu/TabMenu";
import { GlobalStyle, Container } from "../../Styles/reset.style";
import { Title, ProfileImage, ImageUpbtn, ImageWrap, InputGroup, EditWrap, StyledInput, Styledlabel, Styledpetinfo, SubBtn, PetInfo } from "./Profile.style";

const apiBaseURL = "https://api.mandarin.weniv.co.kr";

// Refactored function for readability
const convertInfoToTags = (intro, pet, gender, birthdate, location) =>
  `#intro:${intro} #pet:${pet} #gender:${gender} #birthdate:${birthdate} #location:${location}`;

const extractInfoFromTags = (tagString) =>
  tagString.split(" #").reduce((info, tag) => {
    const [key, value] = tag.split(":");
    // info[key] = value;
    info[key.replace('intro', '').trim()] = value;
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
            <ProfileImage src={previewImage || profile.image} alt="Profile Preview" />
            <ImageUpbtn uploaded={!!previewImage}>
              <input type="file" onChange={handleImageChange} />
            </ImageUpbtn>
          </ImageWrap>
          <EditWrap>
            <InputGroup>
              <Styledlabel>활동명*</Styledlabel>
              <StyledInput
                type="text"
                value={profile.username}
                onChange={handleChange}
                name="username"
                required
              />
            </InputGroup>
            <InputGroup>
              <Styledlabel>계정 ID*</Styledlabel>
              <StyledInput
                type="text"
                value={profile.accountname}
                onChange={handleChange}
                name="accountname"
                required
              />
            </InputGroup>
            <InputGroup>
              <Styledlabel>상태메시지</Styledlabel>
              <StyledInput
                type="text"
                value={profile.intro.replace('#intro:','').trim()} // 이 부분을 수정합니다.
                onChange={handleChange}
                name="intro"
              />
            </InputGroup>
            <PetInfo>
              <Styledpetinfo>반려동물 정보등록</Styledpetinfo>
              <div>
                <label>반려동물</label>
                <DropdownComponents.DropdownSelect
                  value={profile.pet}
                  onChange={handleChange}
                  options={DropdownComponents.petOptions}
                  name="pet"
                />
              </div>
              <div>
                <label>성별</label>
                <DropdownComponents.DropdownSelect
                  value={profile.gender}
                  onChange={handleChange}
                  options={DropdownComponents.genderOptions}
                  name="gender"
                />
              </div>
              <div>
                <label>생일</label>
                <input
                  type="date"
                  value={profile.birthdate}
                  onChange={handleChange}
                  name="birthdate"
                />
              </div>
              <div>
                <label>위치</label>
                <DropdownComponents.DropdownSelect
                  value={profile.location}
                  onChange={handleChange}
                  options={DropdownComponents.locationOptions}
                  name="location"
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