import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as S from './PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import { Link, useNavigate } from 'react-router-dom';
import TabMenu from '../Common/TabMenu/TabMenu';
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';

export default function PostList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json"
        },
      });
      const data = await response.json();
console.log(data)
      if (data.posts) {
        setPosts(data.posts);
      }else{
        setPosts([])
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };
const handlePostClick = (post)=>{
  // setSelectedPost(post)
  navigate(`/post/${post._id}`);
}

  return (
    <>
      <Container>
        <HeaderLayouts title="반결고리" logo={true} search />
        {posts.map((post, index) => (
          <div key={index} onClick={() => handlePostClick(post)}>
            <PostListItem post={post} />
          </div>
        ))}
      </Container>
      <TabMenu />
    </>
  );
}

export function PostListItem({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountname, setAccountName] = useState('');
  const [username, setUserName] = useState('');
  const [userImg, setUserImg] = useState(null);
  const [contentImgUrl, setContentImgUrl] = useState(null);
  const [content, setContent] = useState('');
  const [likeNum, setLikeNum] = useState(0);
  const [date, setDate] = useState('');
  const navigate = useNavigate()

  const handlePostClick = (post)=>{
    navigate(`/post/${post._id}`);
  }
  useEffect(() => {
    if(post){
    setAccountName(post.author.accountname || '');
    setUserName(post.author.username || '');
    setUserImg(post.author.image || 'https://api.mandarin.weniv.co.kr/Ellipse.png');
    setContentImgUrl(post.image || '');
    setContent(post.content || '');
    setDate(post.createdAt || '');
  }
  }, [post]);

  const onChangeNum = () => {
    setLikeNum(likeNum + 1);
  };

  const onChangeModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <S.UserInfo>
        <S.UserProfile>
        <Link to={`/post/detail`} state={{ selectedPost: post }}>
            <img src={userImg} alt='사용자 프로필 이미지' />
          </Link>
          <S.UserName>
            <p>{username}</p>
            <span>{accountname}</span>
          </S.UserName>
        </S.UserProfile>
        <button onClick={onChangeModal}>
          <S.IconMore src={moreIcon} alt='신고하기 모달창 불러오기' />
        </button>
      </S.UserInfo>

      {/* 컨텐츠 내용 */}
      <S.Content>
      <Link to={`/post/detail`} state={{ selectedPost: post }}>
          <p className='text'>{content}</p>
          {contentImgUrl && <img src={contentImgUrl} alt="포스팅 이미지" />}
        </Link>
        <S.PostIcons>
          <button onClick={()=>setLikeNum(likeNum+1)}>
            <img src={redHeartIcon} alt='하트 아이콘' />
            <span>{likeNum}</span>
          </button>
          <Link to={`/post/detail`} state={{ selectedPost: post }}>
            <img src={commentIcon} alt='댓글 개수' />
            <span>1</span>
          </Link>
        </S.PostIcons>
        <S.PostDate>{date}</S.PostDate>
      </S.Content>

      {/* 신고하기 모달 창 */}
      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
        </>
      )}
    </>
  );
}

