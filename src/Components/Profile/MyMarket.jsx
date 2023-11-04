import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, GlobalStyle, SubContainer } from '../../Styles/reset.style';
import styled from 'styled-components'

const extractProductName = (itemName) => {
  const match = itemName.match(/productName:\s*(.*?)\s*\n/);
  return match ? match[1] : '';
};

const MyMarket = ({ accountname, token }) => { // Ensure you pass the `token` prop to this component
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const goToProductDetail = (productId) => {
  navigate(`/market/detail/${productId}`);
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const endpoint = `https://api.mandarin.weniv.co.kr/product/${accountname}`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });
        console.log('Response data:', response.data);
        setProducts(response.data.product);
      } catch (error) {
        console.error('Fetching products failed:', error);
        setError(error);
        setProducts([]); // Set to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [accountname, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ContentContainer>
      <GlobalStyle />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product.id} onClick={() => goToProductDetail(product.id)}>
            <ProductImage src={product.itemImage} alt={product.itemName} />
            <h3>{extractProductName(product.itemName)}</h3>
          </ProductCard>
        ))}
      </ProductsContainer>
    </ContentContainer>
  );
};


export default MyMarket;

// 스타일 컴포넌트

const ContentContainer = styled(Container)`
  min-height: auto; // Override the 100vh to auto
  // Add more styles if needed
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  margin: 0;
  padding: 30px 0 0 30px;
  }
`;

const ProductCard = styled.div`
  min-width: 200px;
  text-align: center;
  margin-bottom: 0;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 140px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;
