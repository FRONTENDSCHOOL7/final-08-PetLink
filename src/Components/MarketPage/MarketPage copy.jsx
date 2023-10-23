import React, { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import logoError from '../../assets/images/marketItem1.png';
import addBtn from '../../assets/images/icon-add.png'
import { AddBtn, Item, MainContainer, NavMenu, PageTitle } from './MarketPageStyle';
import ProductDetail from './ProductDetail';


function Product({items}) {
  return (
    <MainContainer>
      {items.map((item, index) => (
        <Link to={`/product/${index}`} key={index}>
          <Item>
            <img src={logoError} alt="상품이미지"/>
            <p className='item-title'>{item.title}</p>
            <strong className='item-price'>{item.price}원</strong>
          </Item>
        </Link>
      ))}
    </MainContainer>
  )
}
function Dogs() {
  const dogItems = [
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"},
    {title: "강아지 옷", price: "25,000"}
  ]
  return(
    <Product items={dogItems}/>
  )
}
function Cats() {
  const catItems = [
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"},
    {title: "고양이 옷", price: "20,000"}
  ]
  return(
    <Product items={catItems}/>
  )
}
function Others() {
  const otherItems = [
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"},
    {title: "햄스터 장난감", price: "15,000"}
  ]
  return(
    <Product items={otherItems}/>
  )
}

function NavBtn({to, children}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return(
    <Link to={to}>
      <NavBtn className={isActive ? 'active' : ''}>
        {children}
      </NavBtn>
    </Link>
  )
}

function MarketContent() {
  const navigate = useNavigate(); // 다른 페이지로 이동
  const location = useLocation(); // 현재 페이지 위치에 대한 정보 제공

  useEffect(()=>{
    if(location.pathname === "/") {
      navigate("/dogs")
    }
  },[location, navigate]);

  return (
        <div>
          <PageTitle>반결장터</PageTitle>
          <nav>
            <NavMenu>
              <li>
                <NavBtn to="/dogs">강아지</NavBtn>
              </li>
              <li>
                <NavBtn to="/cats">고양이</NavBtn>
              </li>
              <li>
                <NavBtn to="/others">기타</NavBtn>
              </li>
            </NavMenu>
          </nav>
          <Routes>
            <Route path="/dogs" element={<Dogs/>}/>
            <Route path="/cats" element={<Cats/>}/>
            <Route path="/others" element={<Others/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}/>
          </Routes>
          <AddBtn>
            <img src={addBtn} alt="" />
          </AddBtn>
        </div>
  )
}

export default function MarketPage() {
  return(
    <MarketContent />
  )
}
