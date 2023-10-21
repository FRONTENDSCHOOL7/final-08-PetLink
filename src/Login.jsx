import React, { useEffect, useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

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
    }, [emailValid, pwValid]);

    const handleLogin = async () => {
        try {
            const res = await fetch("https://api.mandarin.weniv.co.kr/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: { email, password: pw } }),
            });
    
            const data = await res.json();
    
            if (data.status === 422) {
                setError(data.message); 
            } else if (data.user) {
                setError(null);
                alert('로그인에 성공했습니다.');
            }
        } catch (err) {
            console.error(err);
            setError('로그인에 실패했습니다.');
        }
    };
    

    const onClickConfirmButton = async () => {
        if (!email || !pw) {
            alert('이메일 또는 비밀번호를 입력해주세요.');
        } else {
            await handleLogin();
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };
        
    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^.{8,}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    };    
    
    return (
        <div className="page">
            <div className="titleWrap">
                로그인
            </div>

            <div className="contentWrap">
                <div className="inputTitle">이메일 주소</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        type="text"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => handleEmail(e)}
                    />
                </div>
                {!emailValid && email.length > 0 && (
                    <div className="errorMessageWrap">
                        올바른 이메일을 입력해주세요.
                    </div>
                )}

            <div className="inputTitle" style={{ marginTop: "26px" }}>
                비밀번호
            </div>
            <div className="inputWrap">
                <input
                    className="input"
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                    value={pw}
                    onChange={(e) => handlePw(e)}
                />
            </div>
            {!pwValid && pw.length > 0 && (
                <div className="errorMessageWrap">
                    영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                </div>
            )}

            {error && (
                <div className="errorMessageWrap">
                    {error}
                </div>
            )}
            </div>

            <div>
                <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                    확인
                </button>
            </div>
        </div>
    );
}