export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => {
  return !!getUser();
};

export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
