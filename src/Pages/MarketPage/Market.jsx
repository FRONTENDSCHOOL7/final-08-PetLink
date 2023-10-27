import React from 'react'
import productImg from '../../assets/image/marketItem1.png'
import addBtn from '../../assets/image/icon-add.png'
import { useState } from 'react'
import { BtnAdd, BtnAddWrap, BtnNav, Item, ItemContainer, NavMenu, PageTitle, StyledLink } from './Market.style'
import { GlobalStyle, Container } from '../../Styles/reset.style'
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import HeaderLayouts from '../../Components/Common/Header/Header'

export default function Market() {
  const navItems = ['강아지', '고양이', '기타']
  const [activeBtn, setActiveBtn] = useState('강아지');

  const itemsData = {
    '강아지': [
      {img: productImg, title: '강아지 옷', price: '25,000원'},
      {img: productImg, title: '강아지 장난감', price: '20,000원'},
      {img: productImg, title: '강아지 모자', price: '15,000원'},
      {img: productImg, title: '강아지 간식', price: '10,000원'},
    ],
    '고양이': [
      {img: productImg, title: '고양이 옷', price: '25,000원'},
      {img: productImg, title: '고양이 장난감', price: '20,000원'},
      {img: productImg, title: '고양이 모자', price: '15,000원'},
      {img: productImg, title: '고양이 간식', price: '10,000원'},
    ],
    '기타': [
      {img: productImg, title: '햄스터 옷', price: '25,000원'},
      {img: productImg, title: '햄스터 장난감', price: '20,000원'},
      {img: productImg, title: '햄스터 모자', price: '15,000원'},
      {img: productImg, title: '햄스터 간식', price: '10,000원'},
    ]
  }
  
  const items = itemsData[activeBtn];
  
  return (
    <>
      <GlobalStyle/>
      <Container>
        {/* <PageTitle>반결장터</PageTitle> */}
        <HeaderLayouts title="반결장터" logo={true} />
        <nav>
          <NavMenu>
            {navItems.map((navItem) => (
              <li key={navItem}>
                <BtnNav className={activeBtn === navItem ? 'active' : ''} onClick={()=>setActiveBtn(navItem)}>{navItem}</BtnNav>
              </li>
            ))}
          </NavMenu>
        </nav>
        <div className='item-container-wrapper'>
          <ItemContainer>
            {items.map((item, index)=> (
              <StyledLink to="/market/detail" key={index}>
                <Item>
                  <img src={item.img} alt="상품" />
                  <p className='item-title'>{item.title}</p>
                  <strong className='item-price'>{item.price}</strong>
                </Item>
              </StyledLink>
            ))}
          </ItemContainer>
          <StyledLink to="/market/add-product">
              <BtnAdd>
                <img src={addBtn} alt="추가버튼" />
              </BtnAdd>
          </StyledLink>
        </div>
        <TabMenu/>
      </Container>
    </>
  )
}
