import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import profileIcon from '../../assets/image/icon-basic-profile.png';
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';

export default function PostDetail(props) {
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState(''); 
  const location = useLocation();
  const { selectedPost } = location.state;

  const onChangeModal = () => {
    setIsModalOpen(true);
  };


  if (!selectedPost) {
    return <div>게시글을 불러오는 중...</div>;
  }

  // 게시글 작성 함수
  const postComment = async () => {
    try {
      const response = await fetch('https://api.mandarin.weniv.co.kr/post', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          post: {
            content: comment,
            image:selectedPost.author?.image || '',  // 이미지 URL을 이곳에 추가 (이미지가 없다면 빈 문자열)
          },
        }),
      });

      if (response.status === 200) {
        // 게시 성공
        const data = await response.json();
        // 새로운 게시물 정보를 사용하거나 처리할 수 있습니다.
        console.log('게시 성공:', data);
        setComment('')
      } else {
        // 게시 실패
        console.error('게시 실패');
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <Container>
      <HeaderLayouts back search />
      <S.UserInfo>
        <S.UserProfile>
          <img src={selectedPost.author?.image} alt='사용자 프로필 이미지' />
          <S.UserName>
            <p>{selectedPost.author?.username}</p>
            <p>{selectedPost.author?.accountname}</p>
          </S.UserName>
        </S.UserProfile>
          <button onClick={onChangeModal}><S.IconMore src={moreIcon}/></button>
      </S.UserInfo>
      <S.Content>
        <p className='text'>{selectedPost.content}</p>
        {selectedPost.image && <img src={selectedPost.image} alt="포스팅 이미지" />}
      <S.PostIcons>
        <button onClick={() => setLikeNum(prev => prev + 1)}>
          <img src={redHeartIcon} alt='좋아요 버튼' />
          <span>{likeNum}</span>
        </button>
        <button onClick={() => setIsModalOpen(true)}>
          <img src={commentIcon} alt='댓글 개수' />
          <span>0</span>
        </button>
      </S.PostIcons>
      </S.Content>
      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
        </>
      )}
      <CommentList  
        onChangeModal={onChangeModal}
        userImage={selectedPost.author?.image}
        username={selectedPost.author?.username}
        date={selectedPost.date}
        comment={comment}
      />
      <WriteComment 
      comment={comment} 
      setComment={setComment}
       postComment={postComment} />
    </Container>
  );
}

export function CommentList(props) {
  if (!props.comment) {
    return null; // Do not render if there's no comment
  }
  return (
    <S.CommentBox>
      <S.UserInfo>
        <div>
          <a href='#'>
            <img src={props.userImage || profileIcon} alt='사용자 프로필 이미지' />
          </a>
          <p>{props.username} <span>· {props.date}</span></p>
        </div>
        <button onClick={props.onChangeModal}>
          <img src={moreIcon} alt='신고하기 모달창 불러오기' />
        </button>
      </S.UserInfo>
      <S.CommentTxt>{props.comment}</S.CommentTxt>
    </S.CommentBox>
  );
}

export function WriteComment({ comment, setComment,postComment  }) {
  const [accountname, setAccountName] = useState("");
  const [username, setUserName] = useState("");
  const [userImg, setUserImg] = useState(null);
useEffect(()=>{
  fetchMyProfile()
},[])


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
console.log(data)
      if (data) {
        setAccountName(data.user.accountname || "");
        setUserName(data.user.username || "");
        setUserImg(
          data.user.image || "https://api.mandarin.weniv.co.kr/Ellipse.png"
        );
      } 
    } catch (error) {
      console.error("에러:", error);
    }
  };


const handlePostComment = async ()=>{
  try{
    const response = await fetch("https://api.mandarin.weniv.co.kr/post",{
      method: "POST",
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body:JSON.stringify({
        post: {
          content: comment,
          image: userImg, // 사용자 이미지
        },
      })
    })

    if(response.status === 200){
      const data = await response.json()
      console.log('게시성공:', data)
    }else{
      console.log('게시 실패')
    }
  }catch(error){
    console.log('에러', error)
  }
}

  return (
    <S.InputForm>
      <div>
        <img src={userImg} alt="사용자 프로필" />
        <input 
          type="text" 
          id="comment-input" 
          placeholder="댓글 입력하기..." 
          onChange={e => setComment(e.target.value)} 
          value={comment || ''} 
        />
      </div>
      <button
      type="submit" 
      disabled={!comment || comment.trim().length === 0}
      onClick={postComment}
      >게시</button>
    </S.InputForm>
  );
}

