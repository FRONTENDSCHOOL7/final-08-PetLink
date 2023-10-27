import React, { useEffect, useState } from 'react'
import *as S from './PostList.style'
import moreIcon from '../../assets/image/icon- more-vertical.png'
import redHeartIcon from '../../assets/image/icon-heart-red.png'
import commentIcon from '../../assets/image/icon-comment.png'
import { Link} from 'react-router-dom'
import TabMenu from '../Common/TabMenu/TabMenu'
import { Container } from '../../Styles/reset.style'
import HeaderLayouts from '../Common/Header/Header'
import { Overlay } from '../Product/ProductDetail.style'
import BottomModal from '../Common/Modal/BottomModal'



export default function PostList(props) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [likeNum, setLikeNum] = useState(0)
   const onChangeNum = ()=>{
    setLikeNum(likeNum+1)
  }
  const onChangeModal=()=>{
    setIsModalOpen(true)
  }

  return (
      <>
           <Container>
              <HeaderLayouts title="반결고리" logo={true} search />
                  <PostListItem />  
           </Container>
              <TabMenu/>
      </>
     
  )
}

  export function PostListItem(props){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accountname, setAccountName] = useState('');
    const [imgUrl, setImgUrl] = useState(null)
    const [likeNum, setLikeNum] = useState(0)
    const onChangeNum = ()=>{
     setLikeNum(likeNum+1)
    }
    const onChangeModal=()=>{
      setIsModalOpen(true)
    }

   //  accountname 호출
  useEffect(() => {
    fetchAccountName();
  }, []);

  const fetchAccountName = async () => {
    try {
      const response = await fetch('https://api.mandarin.weniv.co.kr/user/myinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰을 포함시키기 위해 템플릿 리터럴 사용
        },
      });
      const data = await response.json();

        if (data.user) {
          setAccountName(data.user.accountname || '');
          setImgUrl(data.user.image || 'https://api.mandarin.weniv.co.kr/Ellipse.png'); // 프로필 이미지가 없으면 사용
      }
        }
        catch (error) {
        console.error('에러:', error);
        }
        return [accountname, imgUrl]
};

    return(
<>
        <S.UserInfo >
          <S.UserProfile>
            <Link to='#'><img src={imgUrl} alt='사용자 프로필 이미지'/></Link>
            <S.UserName >
                <p >애월읍에서 강아지들에게 유명한 곳</p>
                <span>{accountname} </span>
            </S.UserName> 
          </S.UserProfile>
          <button onClick={onChangeModal}><S.IconMore src={moreIcon} alt='신고하기 모달창 불러오기'/></button>
        </S.UserInfo>

{/* 컨텐츠 내용 */}
        <S.Content> 
            <a href='/post/detail'>
                 <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur quaerat ut fugit sequi. Temporibus illo nihil facere tempora deserunt?</p>
                <img src="https://via.placeholder.com/304x228" alt="포스팅 이미지"  />
            </a>
             <S.PostIcons>
                  <button onClick={props.onChangeNum}>
                    <img src={redHeartIcon} alt='하트 아이콘'/>
                    <span>{likeNum}</span>
                  </button>
                  <Link to='/post/detail' aria-label='댓글 남기기'  >
                    <img src={commentIcon} alt='채팅 아이콘' />
                    <span>1</span>
                  </Link>
            </S.PostIcons>
                <S.PostDate>2023년 10월 21일</S.PostDate>              
        </S.Content>

{/* 신고하기 모달 창 */}
     
        {isModalOpen &&(
          <>
            <Overlay onClick={()=> setIsModalOpen(false)}/>
            <BottomModal/>
          </>
        )}
</>

    )
    }