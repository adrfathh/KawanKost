import { dummyAdmin } from "../data/dummyAdmin.js"
import { dummyUser } from "../data/dummyUser.js"

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || []
}

export const saveUser = (user) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
}

export const loginUser = (email, password) => {
  if (
    email === dummyAdmin.email &&
    password === dummyAdmin.password
  ) {
    return dummyAdmin;
  }

  if (
    email === dummyUser.email &&
    password === dummyUser.password
  ) {
    return dummyUser;
  }

  const users = getUsers();
  return users.find(
    (u) => u.email === email && u.password === password
  );
};

export const setLoggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user))
}

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"))
}

export const logout = () => {
  localStorage.removeItem("loggedInUser")
}