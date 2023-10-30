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

      setIsModalOpen(false); // 초기화
      setLikeNum(0); // 초기화

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
    </>
  );
}

export default function PostList(props) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // 페이지당 게시글 수
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostList();
  }, [currentPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoading) {
        setIsLoading(true);
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchPostList = async () => {
    try {
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

      if (data.posts) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const fetchNextPage = async () => {
    try {
      const skip = currentPage * postsPerPage;
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

      if (data.posts) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setCurrentPage((prevPage) => prevPage + 1);
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
            <PostListItem
              post={post}
              onProfileClick={() => navigate(`/profile/${post.author._id}`)}
            />
          </div>
        ))}
      </Container>
      <TabMenu />
      {isLoading && <div>Loading...</div>}
    </>
  );
}