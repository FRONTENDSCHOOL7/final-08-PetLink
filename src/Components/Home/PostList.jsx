import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as S from "./PostList.style";
import moreIcon from "../../assets/image/icon-more-vertical.png";
import redHeartIcon from "../../assets/image/icon-heart-red.png";
import heartIcon from "../../assets/image/icon-heart.png";
import commentIcon from "../../assets/image/icon-comment.png";
import TabMenu from "../Common/TabMenu/TabMenu";
import { Container, GlobalStyle, SubContainer } from "../../Styles/reset.style";
import HeaderLayouts from "../Common/Header/Header";
import { Overlay } from "../Product/ProductDetail.style";
import BottomModal from "../Common/Modal/BottomModal";
import axios from 'axios';
import Loading from "../Common/Modal/Loading";

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
    loadCachedPosts();
    fetchPostList(); // 최초에 10개의 게시물을 불러옴

    // 스크롤 이벤트 리스너 설정
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight || isLoading
      ) return;
      fetchNextPage(); // 스크롤이 바닥에 닿으면 다음 페이지를 불러옴
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const loadCachedPosts = () => {
    const cachedPosts = localStorage.getItem('cachedPosts');
    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts));
    }
  };


  const fetchPostList = async () => {
    setIsLoading(true);
  
    try {
      const response = await axios.get(
        `https://api.mandarin.weniv.co.kr/post`,
        {
          params: { limit: postsPerPage, skip: (currentPage - 1) * postsPerPage },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      const data = response.data;
  
      // 필터링된 게시글만 가져오기
      const filteredPosts = data.posts.filter((post) =>
        post.author && post.author.intro && post.author.intro.includes('#bangyeolgori')
      );
      
      setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('에러:', error);
      setIsLoading(false);
    }
  };


  const fetchNextPage = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  return (
    <>
    <GlobalStyle/>
      <Container>
        <HeaderLayouts title="반결고리" logo={true} search />
        <SubContainer>
          {posts.length === 0 ? (
            <Loading/>
          ) : (
            posts.map((post, index) => (
              <div key={index}>
                <PostListItem
                  post={post}
                  onProfileClick={() => navigate(`/profile/${post.author._id}`)}
                  onChangeModal={props.onChangeModal} />
              </div>
            ))
          )}
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
  const [likeCount, setLikeCount] = useState(0);
  const [date, setDate] = useState("");
  const [liked, setLiked] = useState(false);
  const [userAccountName, setUserAccountName] = useState(false);
  // const location = useLocation();
  // const { selectedPost } = location.state;
  const { postId } = useParams();
  const navigate = useNavigate();

  // 게시물 삭제 함수
  const deletePost = async (postId) => {
    console.log('deletePost is called with id:', postId)
    try {
      await axios.delete(`https://api.mandarin.weniv.co.kr/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      alert('삭제되었습니다.');
      navigate('/home');
    } catch (error) {
      // 에러 처리
    }
  };



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





  // const handlePostClick = (post) => {
  //   navigate(`/post/${post._id}`);
  // };

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
      setLikeCount(post.likes || 0); // 초기 좋아요 수 설정
      setLiked(post.liked || false); // 사용자의 좋아요 상태 설정
    }
    fetchMyProfile()
  }, [post]);

  const handleLikeClick = async () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const onChangeModal = () => {

    const isMyPost = accountname === userAccountName
    let modalOptions = []

    if(isMyPost){
      modalOptions = [
        { action: "수정하기", alertText: "수정하시겠습니까?"  , onSelect: () => navigate(`/post/edit/${post._id}`)},
        { action: "삭제하기", alertText: "삭제하시겠습니까?" , onSelect: () => deletePost(post._id )},
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
                <S.UserImg src={userImg || defaultUserImg} alt="사용자 프로필 이미지" />
              <S.UserName>
                <S.NameTxt>{username}</S.NameTxt>
                <S.Account>@{accountname}</S.Account>
              </S.UserName>
            </S.UserProfile>
              </Link>
            <button onClick={onChangeModal}>
              <S.IconMore src={moreIcon} alt="신고하기 모달창 불러오기" />
            </button>
          </S.UserInfo>
    
          <S.Content>
            <Link to={`/post/${post._id}`} state={{ selectedPost: post }}>
              <S.ContentTxt>{content}</S.ContentTxt>
              {contentImgUrl && <S.ContentImg src={contentImgUrl} alt="포스팅 이미지" />}
            </Link>
            <S.PostIcons>
              <S.IconBtn onClick={handleLikeClick}>
                <S.IconImg  src={liked ? redHeartIcon : heartIcon} alt="하트 아이콘" />
                <S.Count>{likeCount}</S.Count>
              </S.IconBtn>
              <Link to={`/post/${post._id}`} state={{ selectedPost: post }}>
                <S.IconBtn>
                  <S.IconImg src={commentIcon} alt="댓글 개수" />
                  <S.Count>1</S.Count>
                </S.IconBtn>
              </Link>
            </S.PostIcons>
            <S.PostDate>{formatDate(date)}</S.PostDate>
          </S.Content>
            {isModalOpen && (
              <>
                <Overlay onClick={() => setIsModalOpen(false)} />
                <BottomModal 
                setIsModalOpen={setIsModalOpen} 
                reports={reportOptions}  
                onDelete={() => deletePost(post._id)}/>
              </>
            )}
   </>
 
  );
}
