import { getUserFromLocalStorage } from "./localStorage";

import Notiflix from "notiflix";

const refs = {
  signUpBtn: document.querySelector(".signup-btn"),
  signUpForm: document.querySelector(".form__signup"),
};

refs.signUpForm.addEventListener("submit", onClickSubmitSignUp);

function onClickSubmitSignUp(e) {
  e.preventDefault();
  let email = e.currentTarget.elements.email.value;
  let password = e.currentTarget.elements.password.value;

  if (email === "" || password === "") {
    return Notiflix.Notify.failure("Please fill in all fields");
  }

  let user = { email: email, password: password };

  //We can use FormData if we have more input
  // const formData = new FormData(e.currentTarget);
  // formData.forEach((x, y) => {
  //   user[y] = x;
  // });

  setUserToLocalStorage(user);
  refs.signUpForm.reset();
}

function setUserToLocalStorage(user) {
  let users = getUserFromLocalStorage();

  //1. If localStorage empty
  if (!users[0]) {
    localStorage.setItem("users", JSON.stringify(user));
    return;
  }
  //2.If we have users in localStorage
  const isIncludeUser = users.some((el) => el.email === user.email);
  if (isIncludeUser) {
    Notiflix.Notify.warning("Sorry, but this user already exists");
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
}
