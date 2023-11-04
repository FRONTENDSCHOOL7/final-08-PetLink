import React, { useState, useEffect } from "react";
import axios from "axios";
import * as DropdownComponents from "./Dropdown";
import TabMenu from "../Common/TabMenu/TabMenu";
import HeaderLayouts from '../../Components/Common/Header/Header'
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        setUsernameError("");
        setAccountnameError("");

    let formIsValid = true;

    if (!username.trim()) {
        setUsernameError("활동명을 입력하세요");
    } else {
        setUsernameError("");
    }
    if (!accountname.trim()) {
        setAccountnameError("계정 ID를 입력하세요");
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
    <GlobalStyle/>
    <Container>
    <HeaderLayouts logo={true} backTxt={true}/>
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
                    required
                    />
                    {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
                </InputGroup>
                <InputGroup>
                    <Styledlabel>계정 ID*</Styledlabel>
                    <StyledInput
                    type="text"
                    value={accountname}
                    onChange={(e) => setAccountname(e.target.value)}
                    required
                    />
                    {accountnameError && <div style={{ color: 'red' }}>{accountnameError}</div>}
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
}

export default ProfileEdit;