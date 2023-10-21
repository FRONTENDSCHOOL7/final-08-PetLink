import { useState, useEffect } from "react"

function LoginPage({ handlePage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (emailValid && pwValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [emailValid, pwValid]); // emailValid와 pwValid 상태가 변경될 때마다 이 훅을 실행합니다.
    

    const login = async (email, password)=>{
        const baseUrl = "https://api.mandarin.weniv.co.kr";
        const reqPath = "/user/login";
        const reqUrl = baseUrl+reqPath
        
        const loginData = {
            "user":{
                "email":email,
                "password":password
            }
        };
        try {
            // 로그인해서 token꺼내기~!
            const res = await fetch(reqUrl,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(loginData)
            });
            const json = await res.json();
            console.log(json);

            const token = json.user.token;
            console.log(token);
            // 로컬스토리지에 토큰 저장하기.
            localStorage.setItem("token",token);

            handlePage('profile'); // 로그인이 성공했을 때 페이지 상태를 변경
        } catch (error) {
            alert("로그인에 실패했습니다!")
        }
        
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };
        
    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = /^.{8,}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    };        

    const submitLogin = async (e) => {
        e.preventDefault();
        if (!emailValid || !pwValid) {
            alert('Please enter a valid email and password.');
        } else {
            await login(email, password);
        }
    };

    return (
        <div className="page">
            <div className="titleWrap">로그인</div>
            <form onSubmit={submitLogin}>
                <div className="contentWrap">
                    {/* Email Input */}
                    <div className="inputTitle">이메일 주소</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            type="text"
                            placeholder="이메일 입력"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="inputTitle" style={{ marginTop: "26px" }}>비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            type="password"
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>

                    {/* Error Messages */}
                    {/* ... (error messages logic remains the same) */}
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" disabled={notAllow} className="bottomButton">확인</button>
                    <button type="button" onClick={handlePage} className="bottomButton">회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;