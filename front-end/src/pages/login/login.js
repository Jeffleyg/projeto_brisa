const existsToken = sessionStorage.getItem("token");

if (existsToken) {
  globalThis.location.href = "../filter/filterPage.html";
}

import { login } from "../../external/httpRequest";
const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", executeLogin);

export function executeLogin(event) {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  event.preventDefault();
  login({ username, password }).then(({ token }) => {
    let tokenized = null;
    if (token) {
      tokenized = JSON.stringify(token);
      globalThis.location.href = "../filter/filterPage.html";
    }
    sessionStorage.setItem("token", tokenized);
  });
}
