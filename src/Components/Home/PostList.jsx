import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as S from "./PostList.style";
import moreIcon from "../../assets/image/icon-more-vertical.png";
import redHeartIcon from "../../assets/image/icon-heart-red.png";
import heartIcon from "../../assets/image/icon-heart.png";
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

export default function PostList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data.posts) {
        setPosts(data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post._id}`);
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
              onChangeModal={props.onChangeModal} />
          </div>
        ))}
      </Container>
      <TabMenu />
    </>
  );
}

export function PostListItem({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountname, setAccountName] = useState("");
  const [username, setUserName] = useState("");
  const [userImg, setUserImg] = useState(null);
  const [contentImgUrl, setContentImgUrl] = useState(null);
  const [content, setContent] = useState("");
  const [likeNum, setLikeNum] = useState(0);
  const [date, setDate] = useState("");
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handlePostClick = (post) => {
    navigate(`/post/${post._id}`);
  };

  useEffect(() => {
    if (post) {
      setAccountName(post.author.accountname || "");
      setUserName(post.author.username || "");
      setUserImg(
        post.author.image || "https://api.mandarin.weniv.co.kr/Ellipse.png"
      );
      setContentImgUrl(post.image || "");
      setContent(post.content || "");
      setDate(post.createdAt || "");
      setLikeNum(post.likes || 0); // 초기 좋아요 수 설정
      setLiked(post.liked || false); // 사용자의 좋아요 상태 설정
    }
  }, [post]);

  const handleLikeClick = async () => {
    // API 호출 또는 데이터 업데이트를 수행하도록 변경해야 합니다.
    // 이 예제에서는 liked 상태만 토글하여 시뮬레이션합니다.
    if (liked) {
      setLikeNum(likeNum - 1);
    } else {
      setLikeNum(likeNum + 1);
    }
    setLiked(!liked);
  };

  const onChangeModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <S.UserInfo>
        <S.UserProfile>
          <Link
            to={`/profile/${post.author.accountname}`}
            state={{ selectedPost: post }}
          >
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
          <button onClick={handleLikeClick}>
            <img  src={liked ? redHeartIcon : heartIcon} alt="하트 아이콘" />
            <span>{likeNum}</span>
          </button>
          <Link to={`/post/detail/${post._id}`} state={{ selectedPost: post }}>
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
