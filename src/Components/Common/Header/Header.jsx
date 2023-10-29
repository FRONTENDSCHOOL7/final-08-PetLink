import React from 'react'
import *as S from './Header.style'
import backIcon from '../../../assets/image/icon-arrow-left.png'
import searchIcon from '../../../assets/image/icon-search.png'
import moreBtn from '../../../assets/image/icon-more-vertical.png'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'


export default function HeaderLayouts(props){
  const navigate = useNavigate()
  const handleBack = ()=>{
  navigate(-1)
    }
    return(
        <S.HeaderLayout>
        {props.title && (
            <S.HeaderTitle>{props.title}</S.HeaderTitle>
          )}
          {props.back && (
            <S.HeaderButton onClick={handleBack}>
              <img src={backIcon} alt="뒤로가기" />
            </S.HeaderButton>
          )}
          {props.search && (
            <S.StyledLink to='/search'>
              <img src={searchIcon} alt="검색하기" />
            </S.StyledLink>
          )}
            {props.searchInput && (
            <>
            <S.HeaderButton onClick={handleBack}><img src={backIcon} alt="'뒤로가기'" /></S.HeaderButton>
            <S.SearchInput type="keyword" placeholder='계정 검색' />
            </>
          )}
            {props.backTxt && (
            <S.HeaderBackTxtContainer>
              <S.HeaderBackTxt>
                <S.HeaderBackBtn onClick={handleBack}>
                  <img src={backIcon} alt="뒤로가기" />
                </S.HeaderBackBtn>
                <S.HeaderTxt>
                  <h3>{props.txt}</h3>
                </S.HeaderTxt>
              </S.HeaderBackTxt>
              {props.onModalToggle && (
              <S.HeaderMoreBtn onClick={props.onModalToggle}>
                <img src={moreBtn} alt="모달 열기" />
              </S.HeaderMoreBtn>
              )}
            </S.HeaderBackTxtContainer>
            )}
        </S.HeaderLayout>
      );
    }
