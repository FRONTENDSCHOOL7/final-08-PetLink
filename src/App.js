import React, { useState } from "react";
import JoinPage from "./Components/JoinPage";
import LoginPage from "./Components/LoginPage";
import ProfilePage from "./Components/ProfilePage";

function App() {
    const [page, setPage] = useState('login'); // updated state to handle multiple pages
    const [info, setInfo] = useState("");

    const handlePage = (newPage) => {
        setPage(newPage);
    }

    const getMyInfo = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
        const res = await fetch(
            "https://api.mandarin.weniv.co.kr/user/myinfo",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        const json = await res.json();
        console.log(json);
        setInfo(JSON.stringify(json))
    }

    return (
        <div>
            <button type="button" onClick={getMyInfo}>내 정보 불러오기</button>
            <button type="button" onClick={() => handlePage('profile')}>Profile Page</button>
            {info}

            {page === 'login' && <LoginPage handlePage={() => handlePage('join')} />}
            {page === 'join' && <JoinPage handlePage={() => handlePage('login')} />}
            {page === 'profile' && <ProfilePage />} {/* Adding ProfilePage to the rendering logic */}
        </div>
    );
}

export default App;