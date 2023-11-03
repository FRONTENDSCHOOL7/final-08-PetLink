import React, { useEffect } from 'react'
import addBtn from '../../assets/image/icon-add.png'
import { useState } from 'react'
import { BtnAdd, BtnNav, Item, ItemContainer, NavMenu, StyledLink } from './Market.style'
import { Container, GlobalStyle} from '../../Styles/reset.style'
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import HeaderLayouts from '../../Components/Common/Header/Header'
import axios from 'axios'

export default function Market() {
  const navItems = ['강아지', '고양이', '기타']
  const [activeBtn, setActiveBtn] = useState('강아지');
  const [products, setProducts] = useState([]);

  console.log("render")

  useEffect(() => {
    fetchProducts();
  },[])

  // 상품 데이터 가져오는 비동기 함수 정의
  const fetchProducts = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`https://api.mandarin.weniv.co.kr/product/?limit=999&skip=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Fetched Products:", res.data.product); // API에서 가져온 상품 데이터 로깅
      // 가져온 데이터로 상태 업데이트
      const processedProducts = processProductsData(res.data.product);
      console.log("Processed Products:", processedProducts); // 처리된 상품 데이터 로깅
      setProducts(processedProducts); // 상태 업데이트
    } catch(error) {
      console.error("Error", error);
    }
  }

  // 상품 데이터 처리하는 함수
  const processProductsData = (productsData) => {
    return productsData.map(product => {
      const { category, formattedProductName, pureProductName, description } = determineCategory(product);
      return {
        ...product,
        id: product._id,
        category,
        formattedProductName,
        pureProductName,
        description
      };
    })
  }

  // 상품 카테고리 결정하는 함수
  const determineCategory = (product) => {
    let category;
    let formattedProductName = product.itemName;
    let description = "";

    // 상품 이름에 따라 카테고리 결정
    if(product.itemName.includes('bg_dogs')) {
      category = '강아지';
      formattedProductName = formattedProductName.replace('bg_dogs ', '');
    } else if (product.itemName.includes('bg_cats')) {
      category = '고양이';
      formattedProductName = formattedProductName.replace('bg_cats ', '');
    } else if (product.itemName.includes('bg_etc.')) {
      category = '기타';
      formattedProductName = formattedProductName.replace('bg_etc. ', '');
    }

    // 상품명에서 productName 값만 추출
    let pureProductName = "";
    if (formattedProductName.includes('productName:')) {
      pureProductName = formattedProductName.split('productName:')[1].split('category:')[0].trim();

      if (formattedProductName.includes('description:')) {
        const descParts = formattedProductName.split('description:');
        if (descParts.length > 1) {
          description = descParts[1].trim(); // description: 이후의 문자열을 description으로 설정
        }
      }
    } else {
      pureProductName = formattedProductName;
    }

    return { category, formattedProductName, pureProductName, description };
  }

  // 현재 선택된 카테고리에 해당하는 상품만 필터링
  const filteredProducts = products.filter(product => product.category === activeBtn);
  
  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts title="반결장터" logo />

        <NavigationMenu navItems={navItems} activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>
        <ProductsDisplay products={filteredProducts} />
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

const NavigationMenu = ({navItems, activeBtn, setActiveBtn}) => (
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
)

const ProductsDisplay = ({products}) => (
  <ItemContainer>
    {products.length > 0 ? (
    products.map((product) => {
      console.log("Product State:", { pureProductName: product.pureProductName, description: product.description });
      return(
        <StyledLink 
        to={`/market/detail/${product._id}`}
        state={{ pureProductName: product.pureProductName, description: product.description }}
        key={product._id}
      >
      <Item>
        <img src={product.itemImage} alt="상품" />
        <p className='item-title'>{product.pureProductName}</p>
        <strong className='item-price'>{Number(product.price).toLocaleString()} 원</strong>
      </Item>
    </StyledLink>
    )
    })
    ) : (
      <p>등록된 상품이 없습니다.</p>
    )}
  </ItemContainer>
)