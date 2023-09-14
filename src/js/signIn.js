import { getUserFromLocalStorage } from "./localStorage";
import Notiflix from "notiflix";

const refs = {
  signInForm: document.querySelector(".form__signin"),
  signInBtn: document.querySelector(".signin-btn"),
};

refs.signInForm.addEventListener("submit", onClickSubmitSignIn);

function onClickSubmitSignIn(e) {
  e.preventDefault();
  let email = e.currentTarget.elements.email.value;
  let password = e.currentTarget.elements.password.value;

  if (email === "" || password === "") {
    return Notiflix.Notify.failure("Please fill in all fields");
  }

  let users = getUserFromLocalStorage();

  //if localStorage is empty
  if (!users[0]) {
    return Notiflix.Notify.failure(`We dont have user with name : ${email}`);
  }

  //is valid email?
  const filterUserByEmail = users.filter((el) => el.email === email);

  if (filterUserByEmail.length === 0) {
    return Notiflix.Notify.failure(`We dont have user with name : ${email}`);
  }

  // //is valid password?
  if (
    filterUserByEmail.length >= 1 &&
    filterUserByEmail[0].password !== password
  ) {
    return Notiflix.Notify.failure(
      `The password is not valid for user : ${email}`
    );
  }

  //do we have user with this data?
  const isAvailableUser = users.some(
    (el) => el.email === email && el.password === password
  );
  return isAvailableUser
    ? Notiflix.Notify.success("Yeees,you are sign in. Here should be next step")
    : null;

  refs.signUpForm.reset();
}
