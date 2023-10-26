import React from 'react';
import { useState } from 'react'
import { GlobalStyle } from '../../Styles/reset.style'
import { CommunityCategory, Container, Header, IconMapMark, IconSearch, IconShareInfoMap, IconUserProfile, InfoShareButton, MyLocation, PostReaction, PostSubTxt, PostTitle, ShareInfoMap, ShareInfoPost, BtnAdd } from './Community.style';

import iconSearch from '../../assets/image/icon-search.png'
import iconMap from '../../assets/image/icon-map.png'
import shareInfoMap from '../../assets/image/img-share-info-map.png';
import walkingCrewMap from '../../assets/image/img-walking-crew-map.png';
import missingReportMap from '../../assets/image/img-missing-report-map.png';
import userProfile from '../../assets/image/icon-basic-profile.png';
import userProfile2 from '../../assets/image/icon-test-user-profile.png';
import userProfile3 from '../../assets/image/icon-test-user-profile2.png';
import addBtn from '../../assets/image/icon-add.png'

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('정보 공유');

  const contentData = {
    '정보 공유': {
      mapImage: shareInfoMap,
      posts: [
      {
        profileImage: userProfile,
        title: '광화문 24시 동물병원 추천!',
        author: '김펫피',
        likes: 0,
        comments: 0
      },
      {
        profileImage: userProfile2, // 이미지와 내용을 원하는 대로 수정하세요.
        title: '종각역 애견카페 추천드려요!',
        author: '애견카페러버',
        likes: 5,
        comments: 2
      },
      {
        profileImage: userProfile3, // 이미지와 내용을 원하는 대로 수정하세요.
        title: '시청역 강아지 동반 음식점',
        author: '펫피플',
        likes: 3,
        comments: 1
      }
    ]
    },

    '산책 크루': {
      mapImage: walkingCrewMap,  // 이미지 경로를 수정해주세요.
      posts: [
      {
        profileImage: userProfile2,
        title: '내일 오후 8시 광화문 산책 같이하실 분~',
        author: '산책매니아',
        likes: 0,
        comments: 0
      },
      {
        profileImage: userProfile3,
        title: '대형견 산책 함께 하실 분~',
        author: '리트리버',
        likes: 0,
        comments: 0
      },
      {
        profileImage: userProfile,
        title: '힙지로 산책 크루 모집합니다!',
        author: '홍길동',
        likes: 0,
        comments: 0
      }
    ]
    },
    
    '반려 돌보미': {
      mapImage: shareInfoMap,  // 이미지 경로를 수정해주세요.
      posts: [
      {
        profileImage: userProfile3,
        title: '광화문/종각/시청/을지로 반려동물 대신 봐드려요~',
        author: '김시루',
        likes: 0,
        comments: 0
      },
      {
        profileImage: userProfile,
        title: '내일 하루만 강아지 돌봐주실 분ㅠ',
        author: '박감자',
        likes: 0,
        comments: 0
      },
      {
        profileImage: userProfile2,
        title: '내일 하루만 강아지 돌봐주실 분ㅠ',
        author: '김뽀삐',
        likes: 0,
        comments: 0
      }
    ]
    },

    '실종 신고': {
      mapImage: missingReportMap,  // 이미지 경로를 수정해주세요.
      posts: [
      {
        profileImage: userProfile3,
        title: '강아지를 찾습니다ㅠㅠ(광화문 근처)',
        author: '중구시민',
        likes: 0,
        comments: 0
      },
      {
        profileImage: userProfile2,
        title: '시청역 근처에서 돌아다니는 시츄 보신 분!!',
        author: '김시츄',
        likes: 0,
        comments: 0
      }
    ]
    },
  };

  const currentContent = contentData[activeCategory];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>커뮤니티</h1>
          <IconSearch src={iconSearch} alt="검색" />
        </Header>

        <main>
          <CommunityCategory>
          <button className={activeCategory === '정보 공유' ? 'active' : ''} 
          onClick={() => setActiveCategory('정보 공유')}>정보 공유</button>

          <button className={activeCategory === '산책 크루' ? 'active' : ''}
          onClick={() => setActiveCategory('산책 크루')}>산책 크루</button>

          <button className={activeCategory === '반려 돌보미' ? 'active' : ''}
          onClick={() => setActiveCategory('반려 돌보미')}>반려 돌보미</button>
          
          <button className={activeCategory === '실종 신고' ? 'active' : ''}
          onClick={() => setActiveCategory('실종 신고')}>실종 신고</button>
          </CommunityCategory>

          <ShareInfoMap>
            <MyLocation>
              <IconMapMark src={iconMap} alt="위치표시" />
              <p>서울시 중구</p>
            </MyLocation>
            <IconShareInfoMap src={currentContent.mapImage} alt="지도 이미지" />
          </ShareInfoMap>

          {currentContent.posts.map((post, index) => (
            <ShareInfoPost key={index}>
              <a href="#">
                <IconUserProfile src={post.profileImage} alt="user-profile" />
                <PostTitle>
                  <h2>{post.title}</h2>
                  <PostSubTxt>
                    <p>{post.author}</p>
                    <PostReaction>
                      <p>좋아요 {post.likes}</p>
                      <p>댓글 {post.comments}</p>
                    </PostReaction>
                  </PostSubTxt>
                </PostTitle>
              </a>
            </ShareInfoPost>
            
          ))}
            <BtnAdd><img src={addBtn} alt="추가버튼" /></BtnAdd>
        </main>
        <nav>
          {/* NavBar 컴포넌트 추가 필요 */}
        </nav>

      </Container>
    </>
  );
}