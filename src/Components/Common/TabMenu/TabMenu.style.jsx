import { Link } from 'react-router-dom'
import styled  from 'styled-components'

export const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color:#6C9BD1 ;
    overflow-x:auto ;
    display: flex;
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

    &:hover{
        background-color: #004E98;
        cursor: pointer;
    }

`
export const NavText = styled.span`
margin-top: 4px;
font-size: 10px;
color: #fff;
`

export const NavImg = styled.img`
 width:24px ;
 height: 24px;
`
