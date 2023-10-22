import React from 'react';
import './css/style.css';
import './css/reset.css';
import iconSearch from '../../assets/images/icon-search.png'
import iconMap from '../../assets/images/icon-map.png'
import shareInfoMap from '../../assets/images/img-share-info-map.png';
import userProfile from '../../assets/images/icon-basic-profile.png';


export default function CommunityPage() {
  return (
    <div className="container">

      {/* <!-- Header 공용 컴포넌트 추가 필요 --> */}
      <header className="header">
        <h1>커뮤니티</h1>
        <img className="icon-search" src={iconSearch} alt="검색" />
      </header>

      {/* <!-- main 시작 --> */}
      <main>
        <div className="community-category">
          <button className="info-share-btn">정보 공유</button>
          <button className="walking-crew-btn">산책 크루</button>
          <button className="pet-care-btn">반려 돌보미</button>
          <button className="missing-report-btn">실종 신고</button>
        </div>

        <div className="share-info-map">
          <div className="my-location">
            <img className="icon-map-mark" src={iconMap} alt="위치표시" />
            <p>서울시 중구</p>
          </div>
          <img className="icon-share-info-map" src={shareInfoMap} alt="정보공유 지도" />
        </div>

        <article className="share-info-post">
          <a href="#">
            <img className="icon-user-profile" src={userProfile} alt="user-profile" />
            <div>
              <h2>광화문 24시 동물병원 추천!</h2>
                <div className="post-sub-txt">
                <p>김펫피</p>
                <p>좋아요 0 댓글 0</p>
                </div>
            </div>
          </a>
        </article>
      </main>
      {/* <!-- main 끝 --> */}

      {/* <!-- NavBar 컴포넌트 추가 필요 --> */}
      <nav>

      </nav>
    </div>
  );
}