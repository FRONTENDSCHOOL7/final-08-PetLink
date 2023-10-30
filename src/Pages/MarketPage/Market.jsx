import React, { useEffect } from 'react'
import productImg from '../../assets/image/marketItem1.png'
import addBtn from '../../assets/image/icon-add.png'
import { useState } from 'react'
import { BtnAdd, BtnNav, Item, ItemContainer, NavMenu, StyledLink } from './Market.style'
import { Container, GlobalStyle} from '../../Styles/reset.style'
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import HeaderLayouts from '../../Components/Common/Header/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Market() {
  const navItems = ['강아지', '고양이', '기타']
  const [activeBtn, setActiveBtn] = useState('강아지');
  const [products, setProducts] = useState([]);
  const {accountname} = useParams(); // Url에서 accountname 파라미터 추출

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`https://api.mandarin.weniv.co.kr/products/${accountname}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const productsData = res.data.product || []
        
        const productsWithCategory = productsData.map(product => ({
          ...product,
          category: determineCategory(product)
        }));
        setProducts(productsWithCategory || []); // 상태 업데이트
      } catch(error) {
        console.error(error);
      }
    }
    if(accountname) {
      fetchProducts();
    }
  },[accountname]);

  const determineCategory = (product) => {
    if(product.itemName.includes('강아지')) {
      return '강아지';
    } else if (product.itemName.includes('고양이')) {
      return '고양이';
    }
    return '기타';
  }

  const filteredProducts = products.filter(product => product.category === activeBtn);
  
  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts title="반결장터" logo />
        <nav>
          <NavMenu>
            {navItems.map((navItem) => (
              <li key={navItem}>
                <BtnNav className={activeBtn === navItem ? 'active' : ''} onClick={()=>setActiveBtn(navItem)}>
                  {navItem}
                </BtnNav>
              </li>
            ))}
          </NavMenu>
        </nav>
        <ItemContainer>
          {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <StyledLink to={`/market/detail/${product.id}`} key={index}>
            <Item>
              <img src={product.itemImage} alt="상품" />
              <p className='item-title'>{product.itemName}</p>
              <strong className='item-price'>{product.price}</strong>
            </Item>
          </StyledLink>
          ))
          ) : (
            <p>상품이 없습니다.</p>
          )}
        </ItemContainer>
        <StyledLink to="/market/add-product">
          <BtnAdd>
            <img src={addBtn} alt="추가버튼" />
          </BtnAdd>
        </StyledLink>
        <TabMenu/>
      </Container>
    </>
  )
}
