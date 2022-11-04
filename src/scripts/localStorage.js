export const getUserTokenLocalStorage = () => {
  const userToken = JSON.parse(localStorage.getItem("user"));

  return userToken;
};
