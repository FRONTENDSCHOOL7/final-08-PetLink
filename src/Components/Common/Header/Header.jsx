import React from 'react'
import *as S from './Header.style'
import backIcon from '../../../assets/image/icon-arrow-left.png'
import searchIcon from '../../../assets/image/icon-search.png'
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
            <Link to='/search' >
              <S.SearchImg src={searchIcon} alt="검색하기" />
            </Link>
          )}
            {props.searchInput && (
            <>
            <S.HeaderButton onClick={handleBack}><img src={backIcon} alt="'뒤로가기'" /></S.HeaderButton>
            <S.SearchInput type="keyword" placeholder='계정 검색' />
            </>
          )}
            {props.backTxt && (
            <S.HeaderFollowButton onClick={handleBack}>
              <img src={backIcon} alt="뒤로가기" />
              <h3>{props.txt}</h3>
            </S.HeaderFollowButton>
              )}
        </S.HeaderLayout>
      );
    }



