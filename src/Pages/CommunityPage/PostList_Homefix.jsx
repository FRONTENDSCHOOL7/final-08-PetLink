import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./PostList.style";
import moreIcon from "../../assets/image/icon-more-vertical.png";
import redHeartIcon from "../../assets/image/icon-heart-red.png";
import commentIcon from "../../assets/image/icon-comment.png";
import TabMenu from "../Common/TabMenu/TabMenu";
import { Container } from "../../Styles/reset.style";
import HeaderLayouts from "../Common/Header/Header";
import { Overlay } from "../Product/ProductDetail.style";
import BottomModal from "../Common/Modal/BottomModal";
import Bangyeolgori from "../../API/Bangyeolgori";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function PostListItem({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [contentImgUrl, setContentImgUrl] = useState(null);
  const [accountname, setAccountName] = useState("");
  const [username, setUserName] = useState("");
  const [userImg, setUserImg] = useState(null);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${post._id}`);
  };

  useEffect(() => {
    if (post) {
      const { author, image, content, createdAt } = post;
      const accountname = author.accountname || "";
      const username = author.username || "";
      const userImg =
        author.image ||
        "https://api.mandarin.weniv.co.kr/1698653743844.jpg";

      setIsModalOpen(false);
      setLikeNum(0);

      setContentImgUrl(image);
      setAccountName(accountname);
      setUserName(username);
      setUserImg(userImg);
      setContent(content || "");
      setDate(createdAt || "");
    }
  }, [post]);

  const onChangeNum = () => {
    setLikeNum((prevLikeNum) => prevLikeNum + 1);
  };

  const onChangeModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <S.UserInfo>
        <S.UserProfile>
          <Link to={`/profile/${accountname}`} state={{ selectedPost: post }}>
            <img src={userImg} alt="사용자 프로필 이미지" />
          </Link>
          <S.UserName>
            <p>{username}</p>
            <span>{accountname}</span>
          </S.UserName>
        </S.UserProfile>
        <button onClick={onChangeModal}>
          <S.IconMore src={moreIcon} alt="신고하기 모달창 불러오기" />
        </button>
      </S.UserInfo>

      <S.Content>
        <Link to={`/post/${post._id}`} state={{ selectedPost: post }}>
          <p className="text">{content}</p>
          {contentImgUrl && <img src={contentImgUrl} alt="포스팅 이미지" />}
        </Link>

        <S.PostIcons>
          <button onClick={onChangeNum}>
            <img src={redHeartIcon} alt="하트 아이콘" />
            <span>{likeNum}</span>
          </button>
          <Link
            to={`/post/detail/${post._id}`}
            state={{ selectedPost: post }}
          >
            <img src={commentIcon} alt="댓글 개수" />
            <span>1</span>
          </Link>
        </S.PostIcons>
        <S.PostDate>{formatDate(date)}</S.PostDate>
      </S.Content>

      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
        </>
      )}

      <Bangyeolgori post={post} />
    </>
  );
}

export default function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const postsPerPage = 10;
    const navigate = useNavigate();
    
    useEffect(() => {
      loadCachedPosts();
      fetchPostList();
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [currentPage]);
  
    const loadCachedPosts = () => {
      const cachedPosts = localStorage.getItem("cachedPosts");
      if (cachedPosts) {
        setPosts(JSON.parse(cachedPosts));
      }
    };
  
    const cachePosts = (newPosts) => {
      localStorage.setItem("cachedPosts", JSON.stringify(newPosts));
    };
  
    const fetchPostList = async () => {
      setIsLoading(true);
      let loadedPosts = [];
      let page = 1;
    
      try {
        while (loadedPosts.length < postsPerPage) {
          const response = await fetch(
            `https://api.mandarin.weniv.co.kr/post?limit=${postsPerPage}&skip=${(page - 1) * postsPerPage}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json",
              },
            }
          );
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log("Fetched data from API:", result); // API에서 가져온 데이터를 콘솔에 출력
    
          // result.posts에서 author.intro에 #bangyeolgori가 포함된 게시글만 필터링
          const filteredPosts = result.posts.filter((post) => 
            post.author && post.author.intro && post.author.intro.includes("#bangyeolgori")
          );
    
          loadedPosts.push(...filteredPosts);
    
          if (result.posts.length < postsPerPage) {
            break; // 더 이상 로드할 데이터가 없을 경우, 루프 종료
          }
    
          page++;
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

  return (
    <>
      <Container>
        <HeaderLayouts title="반결고리" logo={true} search />
        {posts.map((post, index) => (
          <div key={index}>
            <PostListItem post={post} />
          </div>
        ))}
      </Container>
      <TabMenu />
      {isLoading && <div style={{
    position: 'fixed', // or 'absolute'
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000, // Make sure it is in front of other elements
}}>
    Loading...
</div>}
    </>
  );
}
