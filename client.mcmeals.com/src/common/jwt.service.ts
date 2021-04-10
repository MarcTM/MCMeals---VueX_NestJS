const TOKEN_KEY = "Bearer";

// Get bearer / token from localstorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


// Save bearer / token in localstorage
export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};


// Delete bearer / token from localstorage
export const destroyToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };