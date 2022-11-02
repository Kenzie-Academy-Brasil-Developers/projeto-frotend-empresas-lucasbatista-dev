import {
  redirectHomePage,
  redirectLoginPage,
  redirectRegisterPage,
} from "../../scripts/buttons.js";
import { registerUser } from "../../scripts/requests.js";

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

redirectLoginPage();
redirectRegisterPage();
redirectHomePage();

// ------------------------------> Registro de Usuário

const eventRegister = () => {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT" || element.tagName == "SELECT") {
        body[element.id] = element.value;
        element.value = "";
      }
    });

    await registerUser(body);
  });
};
eventRegister();
