import { dummyAdmin } from "../data/dummyAdmin.js"

const API_URL = "https://6957da9df7ea690182d34812.mockapi.io/users";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || []
}

export const saveUser = (user) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
}

export const loginUser = async (email, password) => {
  const res = await fetch(API_URL);
  const users = await res.json();

  return users.find(
    (user) => user.email === email && user.password === password
  );
};

// SET USER LOGIN
export const setLoggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

// GET USER LOGIN
export const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : null;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("loggedInUser");
};

// UPDATE USER DI MOCKAPI
export const updateUser = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  return await res.json();
};