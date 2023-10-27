import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Modal, Wrapper, FormWrapper, Logo, Input, Button } from '../../Components/Join/JoinPage.style';


const JoinPage = ()=>{
    const navigate = useNavigate();
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

    const join = async (joinData) => {
        const reqUrl = "https://api.mandarin.weniv.co.kr/user/";
        const res = await fetch(reqUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(joinData)
        });
        const json = await res.json();
    
        if (res.status === 422) { // 상태 코드가 422인 경우
            alert(json.message); // 오류 메시지를 알림
        } else {
            console.log(json);
        }

        return res;
    };
    
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
    
        join(joinData).then((response) => {
            if (response && response.status !== 422) { // 상태 코드가 422가 아닌 경우
                setShowModal(true); // 환영 메시지를 표시
            }
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
            {/* <button type="button" onClick={handlePage}>로그인페이지로 돌아가기</button> */}
    
            <Wrapper>
        <FormWrapper>
            <Logo>이메일 회원가입</Logo>
            
            {/* Email and Password Section */}
            {currentPage === "join" && (
                <>
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={inputEmail} 
                    />
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={inputPassword} 
                    />
                    <Button type="button" onClick={goToProfilePage} disabled={!isValidEmailAndPassword()}>
                        Next
                    </Button>
                </>
            )}

            {/* Profile Information Section */}
            {currentPage === "profile" && (
                <>
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={inputUsername} 
                    />
                    <Input 
                        type="text" 
                        placeholder="Account Name" 
                        value={accountname} 
                        onChange={inputAccountname} 
                    />
                    <Input 
                        type="text" 
                        placeholder="Introduction" 
                        value={info} 
                        onChange={inputInfo} 
                    />
                    <Button type="button" onClick={submitJoin} disabled={!isValidProfile()}>
                        Join
                    </Button>
                </>
            )}

            {/* Conditional Modal Display */}
            {showModal && (
                <Modal>
                    <h2>반결고리에 오신것을 환영합니다!</h2>
                    <Button type="button" onClick={() => navigate('/login')}> 
                        Login
                    </Button>
                </Modal>
            )}
        </FormWrapper>
    </Wrapper>
    </>
    );
}

export default JoinPage