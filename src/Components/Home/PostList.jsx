import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as S from "./PostList.style";
import moreIcon from "../../assets/image/icon-more-vertical.png";
import redHeartIcon from "../../assets/image/icon-heart-red.png";
import heartIcon from "../../assets/image/icon-heart.png";
import commentIcon from "../../assets/image/icon-comment.png";
import TabMenu from "../Common/TabMenu/TabMenu";
import { Container, SubContainer } from "../../Styles/reset.style";
import HeaderLayouts from "../Common/Header/Header";
import { Overlay } from "../Product/ProductDetail.style";
import BottomModal from "../Common/Modal/BottomModal";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function PostList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 10;
  const navigate = useNavigate();
  
  useEffect(() => {
    loadCachedPosts()
    fetchPostList();
    window.addEventListener("scroll", handleScroll)

    return()=>{
      window.removeEventListener("scroll", handleScroll)
    }
  }, [currentPage]);

const loadCachedPosts = () =>{
  const cachedPosts = localStorage.getItem("cachedPosts")
  if(cachedPosts){
    setPosts(JSON.parse(cachedPosts))
  }
}

const cachePosts = (newPosts) =>{
  localStorage.setItem("cachedPosts", JSON.stringify(newPosts))
}


  const fetchPostList = async () => {
    setIsLoading(true)
    let loadedPosts = []
    let page = 1
    try {
      while(loadedPosts.length<postsPerPage){
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post?limit=${postsPerPage}&skip=${(page - 1) * postsPerPage}`, 
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error ('Network response was not ok')
      }

      const data = await response.json();
       // result.posts에서 author.intro에 #bangyeolgori가 포함된 게시글만 필터링
const filteredPosts = data.posts.filter((post)=>
post.author && post.author.intro && post.author.intro.includes('#bangyeolgori')
)
loadedPosts.push(...filteredPosts)
if(data.posts.length< postsPerPage){
  break; // 더 이상 로드할 데이터가 없을 경우, 루프 종료
}     
page ++
      }


setPosts((prevPosts) => [...prevPosts, ...loadedPosts.slice(0, postsPerPage)]);
setIsLoading(false);


    } catch (error) {
      console.error("에러:", error);
      setIsLoading(false);
    }
  };


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight || isLoading
    ) return;
    fetchNextPage();
  };
  const fetchNextPage = async () => {
    setIsLoading(true);
    try {
      while (true) {
        const skip = (currentPage - 1) * postsPerPage;
        const response = await fetch(
          `https://api.mandarin.weniv.co.kr/post?limit=${postsPerPage}&skip=${skip}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.posts && data.posts.length > 0) {
          const filteredPosts = data.posts.filter((post) =>
            post.author.intro.includes("#bangyeolgori")
          );
          
          if (filteredPosts.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
            setCurrentPage(currentPage + 1);
            break; // 충분한 게시글이 로드되면 while loop를 종료합니다.
          } else {
            setCurrentPage(currentPage + 1); // 충분한 게시글이 로드되지 않았다면 다음 페이지를 시도합니다.
          }
        } else {
          break; // 더 이상 로드할 게시글이 없다면 while loop를 종료합니다.
        }
      }
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post._id}`);
  };
  const onChangeModal = () => {
    setIsModalOpen(true);
  };


  return (
    <>
      <Container>
        <HeaderLayouts title="반결고리" logo={true} search />
      <SubContainer>
          {posts.map((post, index) => (
            <div key={index}>
              <PostListItem
                post={post}
                onProfileClick={() => navigate(`/profile/${post.author._id}`)}
                onChangeModal={props.onChangeModal} />
            </div>
          ))}
      </SubContainer>
      <TabMenu />
      </Container>
    </>
  );
}

export function PostListItem({ post }) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState([]);
  const [accountname, setAccountName] = useState("");
  const [username, setUserName] = useState("");
  const [userImg, setUserImg] = useState(null);
  const [contentImgUrl, setContentImgUrl] = useState(null);
  const [content, setContent] = useState("");
  const [likeNum, setLikeNum] = useState(0);
  const [date, setDate] = useState("");
  const [liked, setLiked] = useState(false);
  const [userAccountName, setUserAccountName] = useState(false);

  
  const fetchMyProfile = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data) {
          const userAccountName = data.user.accountname
        setUserAccountName(userAccountName)
        // console.log(userAccountName)
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };


  const navigate = useNavigate();


  const handlePostClick = (post) => {
    navigate(`/post/${post._id}`);
  };

  useEffect(() => {
    console.log(post);
    if (post.author.intro && post.author.intro.includes("#bangyeolgori")) {
      setAccountName(post.author.accountname || "");
      setUserName(post.author.username || "");
      setUserImg(
        post.author.image);
      setContentImgUrl(post.image || "");
      
      let contentText = "";
    try {
      const contentData = JSON.parse(post.content || "{}");
      contentText = contentData.contentText || "";
    } catch (error) {
      console.error("Error parsing content JSON:", error);
    }

    setContent(contentText);
      setDate(post.createdAt || "");
      setLikeNum(post.likes || 0); // 초기 좋아요 수 설정
      setLiked(post.liked || false); // 사용자의 좋아요 상태 설정
    }
    fetchMyProfile()
  }, [post]);

  const handleLikeClick = async () => {
    if (liked) {
      setLikeNum(likeNum - 1);
    } else {
      setLikeNum(likeNum + 1);
    }
    setLiked(!liked);
  };

  const onChangeModal = () => {

    const isMyPost = accountname === userAccountName
    let modalOptions = []

    if(isMyPost){
      modalOptions = [
        { action: "수정하기", alertText: "수정하시겠습니까?" },
        { action: "삭제하기", alertText: "삭제하시겠습니까?" },
      ];

    }else {
      modalOptions = [
        { action: "신고하기", alertText: "신고하시겠습니까?" },
      ];
    }
    setIsModalOpen(true);
    setReportOptions(modalOptions); // modalOptions 배열을 state로 설정
  };

  return (
    <>
      <S.UserInfo>
          <Link
            to={`/profile/${post.author.accountname}`}
            state={{ selectedPost: post }}
          >
        <S.UserProfile>
            <img src={userImg || defaultUserImg} alt="사용자 프로필 이미지" />
          <S.UserName>
            <p>{username}</p>
            <span>{accountname}</span>
          </S.UserName>
        </S.UserProfile>
          </Link>
        <button onClick={onChangeModal}>
          <S.IconMore src={moreIcon} alt="신고하기 모달창 불러오기" />
        </button>
      </S.UserInfo>

      <S.Content>
        <Link to={`/post/${post._id}`} state={{ selectedPost: post }}>
          <p>{content}</p>
          {contentImgUrl && <img src={contentImgUrl} alt="포스팅 이미지" />}
        </Link>
        <S.PostIcons>
          <button onClick={handleLikeClick}>
            <img  src={liked ? redHeartIcon : heartIcon} alt="하트 아이콘" />
            <span>{likeNum}</span>
          </button>
          <Link to={`/post/${post._id}`} state={{ selectedPost: post }}>
            <img src={commentIcon} alt="댓글 개수" />
            <span>1</span>
          </Link>
        </S.PostIcons>
        <S.PostDate>{formatDate(date)}</S.PostDate>
      </S.Content>

      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal setIsModalOpen={setIsModalOpen} reports={reportOptions}/>
        </>
      )}
    </>
  );
}
