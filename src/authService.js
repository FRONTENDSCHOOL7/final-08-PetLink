const TOKEN_KEY = 'token';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  const token = getToken();
  console.log('Stored token:', token);
  return !!token; // 토큰의 존재 유무에 따라 로그인 상태 반환
};