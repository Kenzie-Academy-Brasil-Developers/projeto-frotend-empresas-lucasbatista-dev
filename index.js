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

// ------------------------------> Requisições

// allDepartment();

// companiesBySector();

// allCompanies();

// login({
//   email: "lucas@mail.com",
//   password: "1234",
// });

// registerUser({
//   username: "lucas1",
//   password: "1234",
//   email: "lucas1@mail.com",
//   professional_level: "sênior",
// });

// typeOfUser(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzg2NTk2M2MtMzZkNS00YmViLWJlMmYtNDI2ODNiZTJlYTQ0IiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY5MTc5MzIsImV4cCI6MTY2Nzc4MTkzMiwic3ViIjoiW29iamVjdCBVbmRlZmluZWRdIn0.zS0QPz6SBanZN6pCVDL028SphZIwy9osySmBumUsegA"
// );

// getUsersInformation(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMDVmNzcwNmEtOGJmZi00NjA0LWEzMjEtYjVmYzQzNjE4YTQ1IiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjcyNjYyNDgsImV4cCI6MTY2ODEzMDI0OCwic3ViIjoiW29iamVjdCBVbmRlZmluZWRdIn0.1sV0sOjiOKspW3TdJxNd0f_vvLn9G-FUVm9R4JWcgz0"
// );

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
