import { logout } from "../../scripts/buttons.js";
import { getUserTokenLocalStorage } from "../../scripts/localStorage.js";
import {
  renderUserDepartmensAndCoworkers,
  renderUserInfo,
} from "../../scripts/render.js";
import { updateUserInformation } from "../../scripts/requests.js";
// renderUserInfo();

renderUserInfo();

const eventEditPerfil = () => {
  const form = document.querySelector("form");

  const elements = [...form.elements];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT") {
        body[element.id] = element.value;
      }
    });

    const tokenUser = getUserTokenLocalStorage();
    const token = tokenUser.token;
    await updateUserInformation(body, token);
    window.location.reload();
  });
};
eventEditPerfil();
logout();

await renderUserDepartmensAndCoworkers();
