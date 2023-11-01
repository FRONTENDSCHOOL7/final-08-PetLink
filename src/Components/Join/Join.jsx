import { useState } from "react"
import styles from './Join.style.css';

const JoinPage = ({handlePage})=>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountname, setAccountname] = useState("");
    const [imgSrc, setImgSrc] = useState("https://api.mandarin.weniv.co.kr/Ellipse.png")
    const [info, setInfo] = useState("");
    const [currentPage, setCurrentPage] = useState("join");
    const [showModal, setShowModal] = useState(false);

    const goToProfilePage = () => {
        setCurrentPage("profile");
    };

    const join = async (joinData)=>{
        const reqUrl = "https://api.mandarin.weniv.co.kr/user/";
        const res = await fetch(reqUrl,{
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify(joinData)
        });
        const json = await res.json();
        console.log(json);
    }
    
    const inputUsername = (e)=>{
        setUsername(e.target.value);
    }
    const inputEmail = (e)=>{
        setEmail(e.target.value);
    }
    const inputPassword = (e)=>{
        setPassword(e.target.value);
    }
    const inputAccountname = (e)=>{
        setAccountname(e.target.value);
    }
    const inputInfo = (e) =>{
        setInfo(e.target.value);
    }

    const uploadImage = async (imageFile)=>{
        const baseUrl = "https://api.mandarin.weniv.co.kr/"
        const reqUrl = baseUrl+"image/uploadfile";
        // 폼데이터 만들기
        const form = new FormData();
        // 폼데이터에 값 추가하기
        // 폼데이터.append("키","값")
        form.append("image", imageFile);
        // 폼바디에 넣어서 요청하기
        const res = await fetch(reqUrl,{
            method:"POST",
            body:form
        });
        const json = await res.json();
        console.log(baseUrl+json.filename);
        const imageUrl = baseUrl+json.filename;
        setImgSrc(imageUrl);
    }
    const handleChangeImage = (e)=>{
        // 파일 가져오기
        const imageFile = e.target.files[0];
        uploadImage(imageFile);        
    }
    const submitJoin = () => {
        if (!isValidProfile()) {
            return;
        }

        const joinData = {
            user: {
                username: username,
                email: email,
                password: password,
                accountname: accountname,
                intro: info,
                image: imgSrc
            }
        };
        
        join(joinData).then(() => {
            setShowModal(true);
        });
    };

    const isValidEmailAndPassword = () => {
        // Add your email and password validation logic here
        return email.includes('@') && password.length >= 8;
    };

    const isValidProfile = () => {
        // Add your username and accountname validation logic here
        return username.length >= 2 && accountname.length >= 2;
    };
    
    
    return (
        <>
            <button type="button" onClick={handlePage}>로그인페이지로 돌아가기</button>
    
            {currentPage === "join" && (
                <section>
                    <h2>이메일로 회원가입</h2>
                    <div>
                        <label htmlFor="emailInput">이메일</label>
                        <input value={email} onChange={inputEmail} type="email" id="emailInput" name="email" placeholder="이메일 주소를 알려주세요." />
                    </div>
                    <div>
                        <label htmlFor="passwordInput">비밀번호</label>
                        <input value={password} onChange={inputPassword} type="password" name="password" id="passwordInput" placeholder="비밀번호를 설정해 주세요." />
                    </div>
                    <button type="button" onClick={goToProfilePage} disabled={!isValidEmailAndPassword()}>다음</button>
                </section>
            )}
    
            {currentPage === "profile" && (
                <section>
                    <h2>프로필 설정</h2>
                    <label htmlFor="profileImg">
                        <img src={imgSrc} alt="" id="imagePre" />
                    </label>
                    <input type="file" onChange={handleChangeImage} id="profileImg" name="image" accept="image/*" />
                    <div>
                        <label htmlFor="userNameInput">사용자 이름</label>
                        <input value={username} onChange={inputUsername} type="text" id="userNameInput" name="username" placeholder="2~10자 이내여야 합니다." />
                    </div>
                    <div>
                        <label htmlFor="userIdInput">계정 ID</label>
                        <input value={accountname} onChange={inputAccountname} type="text" id="userIdInput" name="accountname" placeholder="영문, 숫자, 특수문자(,), (_)만 사용 가능합니다." />
                    </div>
                    <div>
                        <label htmlFor="userIntroInput">소개</label>
                        <input onChange={inputInfo} type="text" id="userIntroInput" name="intro" placeholder="자신과 판매할 상품에 대해 소개해 주세요." />
                    </div>
                    <button type="button" onClick={submitJoin} disabled={!isValidProfile()}>감귤마켓 시작하기</button>
                </section>
            )}
    
            {showModal && (
                <div className={styles.modal}>
                    <h2>반결고리에 오신 것을 환영합니다🎉</h2>
                    <div className={styles.hrContainer}>
                        <hr className={styles.hr} />
                        </div>
                        <button className={styles.modalButton} type="button" onClick={handlePage}>
                            <div>로그인하기</div>
                        </button>
                </div>
            )}
        </>
    );
}

export default JoinPage