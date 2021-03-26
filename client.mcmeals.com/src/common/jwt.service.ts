const TOKEN_KEY = "token";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const destroyToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };