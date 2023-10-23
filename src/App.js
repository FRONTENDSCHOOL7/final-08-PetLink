import React, { useState } from "react";
import SplashScreen from "./Components/Common/Splash";
import MainLoginPage from "./Components/LoginPage/MainLoginPage"; 
import JoinPage from "./Components/JoinPage/JoinPage_dev";
import LoginPage from "./Components/LoginPage/LoginPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage"

function App() {
    const [page, setPage] = useState('mainLogin');
    const [userInfo, setUserInfo] = useState(null); // userInfo 상태 추가
    const [splashEnded, setSplashEnded] = useState(false);

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
        setUserInfo(json); // userInfo 상태를 업데이트합니다.
    }

    return (
        <div>
            {!splashEnded && <SplashScreen duration={3000} onEnd={() => setSplashEnded(true)} />}

            {splashEnded && (
                <>
                    <button type="button" onClick={getMyInfo}>내 정보 불러오기</button>
                    <button type="button" onClick={() => handlePage('profile')}>Profile Page</button>
                    {userInfo && JSON.stringify(userInfo)}

                    {page === 'mainLogin' && <MainLoginPage handlePage={handlePage} />}
                    {page === 'login' && <LoginPage handlePage={() => handlePage('join')} />}
                    {page === 'join' && <JoinPage handlePage={() => handlePage('login')} />}
                    {page === 'profile' && <ProfilePage userInfo={userInfo} />}
                </>
            )}
        </div>
    );
}

export default App;