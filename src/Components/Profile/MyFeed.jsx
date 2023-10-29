import React, { useState } from 'react'
import styled from 'styled-components';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import HeartIcon from '../../assets/image/icon-heart.png';
import userImg from '../../assets/image/icon-basic-profile.png';
import allbumIcon from '../../assets/image/icon-post-album-on.png';
import listIcon from '../../assets/image/icon-post-list-off.png';
import commentIcon from '../../assets/image/icon-comment.png';
import { Container } from '../../Styles/reset.style';

const MyFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container>
        <Layer>
        <viewBtn><BtnImg src={allbumIcon} alt="" /></viewBtn>
        <viewBtn><BtnImg src={listIcon} alt="" /></viewBtn>
        </Layer>
         <UserInfo>
        <UserProfile>
            <UserImg src={userImg} alt='사용자 프로필 이미지' />
          <UserName>
            <NameTxt>username</NameTxt>
            <UserId>accountname</UserId>
          </UserName>
        </UserProfile>
        <MoreBtn >
          <IconMore src={moreIcon} alt='수정/삭제' />
        </MoreBtn>
      </UserInfo>

      {/* 컨텐츠 내용 */}
      <ContentBox>
          <ContentTxt className='text'>content</ContentTxt>
          <ContentImg src="https://via.placeholder.com/304x228 " alt="포스팅 이미지" />
        <IconBox>
          <IconBtn >
            <IconBtnImg src={HeartIcon} alt='하트 아이콘' />
            <IconCount>0</IconCount>
          </IconBtn>
          <IconBtn >
            <IconBtnImg src={commentIcon} alt='댓글 개수' />
            <IconCount>1</IconCount>
            </IconBtn >
         </IconBox>
        <PostDate>date</PostDate>
      </ContentBox>

      {/* 신고하기 모달 창 */}
      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
        </>
      )}
    </Container>
  )
}

export default MyFeed

export const Layer = styled.div`
    height: 44px;
    margin-top:27px ;
    padding: 10px;
    display: flex;
    justify-content:flex-end;
    gap: 16px;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    cursor: pointer;
`
export const viewBtn = styled.button`
    width: 26px;
    height: 26px;
`
export const BtnImg = styled.img`
    width: 100%;
     height: 100%;
`
export const UserInfo = styled.div`
  margin:  20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserProfile = styled.div`
  display: flex;
  gap: 12px;
`
export const UserImg = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: top;
`

export const UserName =styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 4px;
    cursor: pointer;
`
export const UserId = styled.span`
    font-size:12px ;
    font-weight: 400;
`
export const NameTxt = styled.p`
    font-size:14px ;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
export const MoreBtn = styled.button`
    width: 18px;
    height: 18px;
`
export const IconMore = styled.img`
  width: 18px;
  height: 18px;
  margin-top: 4px;
  cursor: pointer;
`

export const ContentBox = styled.div`
  margin: 0 16px 16px 54px;
`

export const ContentTxt = styled.p`
    font-size: 14px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`
export const ContentImg = styled.img`
    border-radius: 10px;
    width: 304px;
    object-fit: cover;
    margin-top: 16px;
`

export const IconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start; 
    gap: 17px;
`
export const IconBtn = styled.button`
    cursor: pointer;
`
export const IconBtnImg = styled.img`
      vertical-align: text-bottom;
    width: 15px;
    height: 15px;
    margin-right: 6px;
`

export const IconCount = styled.span`
    font-size: 12px;
    margin-left: 6px;
    cursor: pointer;
`
export const PostDate = styled.div`
  font-size: 12px;
  margin-top: 16px;
`;



