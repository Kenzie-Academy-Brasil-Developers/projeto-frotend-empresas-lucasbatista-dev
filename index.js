// ------------------------------> Imports

import {
  redirectLoginPage,
  redirectRegisterPage,
} from "./src/scripts/buttons.js";
import { renderCompanies, renderDepartment } from "./src/scripts/render.js";
import {
  allCompanies,
  allDepartment,
  companiesBySector,
  getUsersInformation,
  login,
  registerUser,
  typeOfUser,
} from "./src/scripts/requests.js";

// ------------------------------>

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

// ------------------------------> Chamando renderizações

await renderCompanies();
await renderDepartment();

// ------------------------------> Funções de clique
redirectLoginPage();
redirectRegisterPage();
