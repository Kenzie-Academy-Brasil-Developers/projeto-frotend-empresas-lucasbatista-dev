import { getUserTokenLocalStorage } from "./localStorage.js";
import { renderCompaniesCreate } from "./render.js";
import { createDepartment } from "./requests.js";

export const openCreateDepartment = () => {
  const buttonOpen = document.querySelector("#openModalCreate");
  const buttonClose = document.querySelector("#closeModalCreate");
  const modal = document.querySelector("#modalCreate");
  const { token } = getUserTokenLocalStorage();

  buttonOpen.onclick = function () {
    modal.showModal();
    renderCompaniesCreate();

    const form = document.querySelector("#formCreateDepartment");
    const elements = [...form.elements];

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const body = {};

      elements.forEach((element) => {
        if (element.tagName == "INPUT" || element.tagName == "SELECT") {
          body[element.id] = element.value;
        }
      });
      await createDepartment(token, body);
      window.location.reload();
    });
  };
  buttonClose.onclick = function () {
    modal.close();
  };
};
