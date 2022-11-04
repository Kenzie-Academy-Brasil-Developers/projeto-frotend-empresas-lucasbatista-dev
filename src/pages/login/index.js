import {
  redirectHomePage,
  redirectRegisterPage2,
  redirectRegisterPage3,
} from "../../scripts/buttons.js";
import { login, typeOfUser } from "../../scripts/requests.js";

const openMenu = () => {
  const buttonOpen = document.querySelector("#openModal");
  const buttonClose = document.querySelector("#closeModal");
  const modal = document.querySelector("#modalNav");

  buttonOpen.onclick = function () {
    modal.show();
  };
  buttonClose.onclick = function () {
    modal.close();
  };
};
openMenu();
// ------------------------------> Funções de clique
redirectHomePage();
redirectRegisterPage2();
redirectRegisterPage3();

// ------------------------------> Envio do token e Login de Usuário

const eventLogin = () => {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT") {
        body[element.id] = element.value;
        element.value = "";
      }
    });
    const loginUser = await login(body);
    console.log(loginUser);

    await typeOfUser(loginUser);
  });
};
eventLogin();
