// 토큰을 로컬 스토리지에 저장
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// 토큰을 로컬 스토리지에서 불러오는 함수
export const getToken = () => {
  return localStorage.getItem('token');
};

// 토큰을 로컬 스토리지에서 삭제
export const removeToken = () => {
  localStorage.removeItem('token');
};

// 계정 이름을 로컬 스토리지에 저장
export const saveAccountName = (accountname) => {
  localStorage.setItem('accountname', accountname);
};

// 계정 이름을 로컬 스토리지에서 불러오는 함수
export const getAccountName = () => {
  return localStorage.getItem('accountname');
};

// 계정 이름을 로컬 스토리지에서 삭제
export const removeAccountName = () => {
  localStorage.removeItem('accountname');
};