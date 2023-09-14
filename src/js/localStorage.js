export const getUserFromLocalStorage = () => {
  const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
  let users = [];
  users =
    Array.isArray(usersFromLocalStorage) && usersFromLocalStorage.length > 1
      ? usersFromLocalStorage
      : [usersFromLocalStorage];

  return users;
};
