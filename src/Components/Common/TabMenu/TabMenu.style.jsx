import { Link } from 'react-router-dom'
import styled  from 'styled-components'

export const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 390px; // Container의 최대 너비와 동일
    /* left: 50%;
    transform: translateX(-50%); // 중앙 정렬 */
    height: 60px;
    background-color:#6C9BD1 ;
    overflow-x: auto;
    display: flex;

    // 태블릿 화면
    @media (min-width: 768px) {
        max-width: 768px;
    }
`

export const NavLink = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    min-width: 50px;
    overflow: hidden;
    font-size: 10px;
    color: #fff;
    text-decoration: none;
    transition: 0.1s ease-in-out;
    padding: 12px 0 5px;

    &:hover,
    &.active {
        background-color: #004E98;
        cursor: pointer;
    }

`
export const NavText = styled.span`
margin-top: 4px;
font-size: 10px;
color: #fff;

@media (min-width: 768px) {
        font-size: 12px;
    }
`

export const NavImg = styled.img`
width:24px ;
height: 24px;

@media (min-width: 768px) {
        width: 30px; // 더 큰 화면에서 아이콘 크기 증가
        height: 30px;
    }
`
