import React, { useState, useEffect } from "react";

function ProfilePage({ userInfo }) {
  const [userInfo, setUserInfo] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [newIntro, setNewIntro] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newAccountName, setNewAccountName] = useState("");
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [useraccountname, setUserAccountName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!userInfo || !userInfo.accountname) {
        setError("Account name is not provided.");
        return;
      }
      try {
        const response = await fetch(
          `https://api.mandarin.weniv.co.kr/profile/${userInfo.accountname}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile.");
        }

        const data = await response.json();
        setProfile(data.profile);
      } catch (error) {
        setError(error.message || "Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      setImgSrc(userInfo.image);
      setNewIntro(userInfo.intro);
      setNewUsername(userInfo.username);
      setNewAccountName(userInfo.accountname);
    }
  }, [userInfo]);

  useEffect(() => {
    if (profile) {
      setUserInfo(profile);
      setImgSrc(profile.image);
      setNewIntro(profile.intro);
      setNewUsername(profile.username);
      setNewAccountName(profile.accountname);
    }
  }, [profile]);

  const getMyInfo = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://api.mandarin.weniv.co.kr/user/myinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();

      if (json && json.user) {
        setUserAccountName(json.user.accountname);
        setUserInfo(json.user);
      } else {
        setError("Account information is not available."); // Error handling
      }
    } catch (error) {
      setError("Failed to fetch user info.");
      console.error(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

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

    return baseUrl + json.filename;
  };

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      setImgSrc(uploadedImageUrl);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    const updateUrl = "https://api.mandarin.weniv.co.kr/user";
    const payload = {
      user: {
        username: newUsername,
        accountname: newAccountName,
        intro: newIntro,
        image: imgSrc,
      },
    };

    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message || ""}`);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : userInfo ? (
        <div className="profile-content">
          <div className="profile-image-section">
            <img
              src={imgSrc || "default-image-path.jpg"}
              alt="Profile"
              className="profile-img"
            />
            <input
              type="file"
              onChange={handleChangeImage}
              className="upload-button"
            />
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <h2>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </h2>
            </div>
            <div className="detail-item">
              <p>
                @
                <input
                  type="text"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                />
              </p>
            </div>
            <div className="detail-item">
              <textarea
                value={newIntro}
                onChange={(e) => setNewIntro(e.target.value)}
              ></textarea>
            </div>
            <button onClick={updateProfile} className="update-button">
              Update Profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
