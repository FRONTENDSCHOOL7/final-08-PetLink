import React from 'react';
import { CommunityCategory, Container, GlobalStyle, Header, IconMapMark, IconSearch, IconShareInfoMap, IconUserProfile, InfoShareButton, MyLocation, PostReaction, PostSubTxt, PostTitle, ShareInfoMap, ShareInfoPost } from './Community.style';

import iconSearch from '../../assets/image/icon-search.png'
import iconMap from '../../assets/image/icon-map.png'
import shareInfoMap from '../../assets/image/img-share-info-map.png';
import userProfile from '../../assets/image/icon-basic-profile.png';
import userProfile2 from '../../assets/image/icon-test-user-profile.png';
import userProfile3 from '../../assets/image/icon-test-user-profile2.png';

export default function CommunityPage() {
  return (
    <Container>
      <GlobalStyle />

      {/* <!-- Header 공용 컴포넌트 추가 필요 --> */}
      <Header>
        <h1>커뮤니티</h1>
        <IconSearch src={iconSearch} alt="검색" />
        </Header>

      {/* <!-- main 시작 --> */}
      <main>
        <CommunityCategory>
          <InfoShareButton>정보 공유</InfoShareButton>
          <button className="walking-crew-btn">산책 크루</button>
          <button className="pet-care-btn">반려 돌보미</button>
          <button className="missing-report-btn">실종 신고</button>
        </CommunityCategory>

        <ShareInfoMap>
          <MyLocation>
            <IconMapMark src={iconMap} alt="위치표시" />
            <p>서울시 중구</p>
          </MyLocation>
          <IconShareInfoMap src={shareInfoMap} alt="정보공유 지도" />
        </ShareInfoMap>

        <ShareInfoPost>
          <a href="#">
            <IconUserProfile src={userProfile} alt="user-profile" />
            <PostTitle>
              <h2>광화문 24시 동물병원 추천!</h2>
                <PostSubTxt>
                  <p>김펫피</p>
                  <PostReaction>
                    <p>좋아요 0</p>
                    <p>댓글 0</p>
                  </PostReaction>
                </PostSubTxt>
            </PostTitle>
          </a>
        </ShareInfoPost>

        <ShareInfoPost>
          <a href="#">
            <IconUserProfile src={userProfile2} alt="user-profile" />
            <PostTitle>
              <h2>종각역 애견카페 추천드려요~</h2>
                <PostSubTxt>
                  <p>패션피플</p>
                  <PostReaction>
                    <p>좋아요 0</p>
                    <p>댓글 0</p>
                  </PostReaction>
                </PostSubTxt>
            </PostTitle>
          </a>
        </ShareInfoPost>

        <ShareInfoPost>
          <a href="#">
            <IconUserProfile src={userProfile3} alt="user-profile" />
            <PostTitle>
              <h2>시청역 강아지 동반 음식점</h2>
                <PostSubTxt>
                  <p>시츄사랑</p>
                  <PostReaction>
                    <p>좋아요 0</p>
                    <p>댓글 0</p>
                  </PostReaction>
                </PostSubTxt>
            </PostTitle>
          </a>
        </ShareInfoPost>
      </main>
      {/* <!-- main 끝 --> */}

      {/* <!-- NavBar 컴포넌트 추가 필요 --> */}
      <nav>

      </nav>
    </Container>
  );
}