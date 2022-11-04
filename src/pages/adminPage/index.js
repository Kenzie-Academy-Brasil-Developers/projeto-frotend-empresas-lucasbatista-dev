import { logout } from "../../scripts/buttons.js";
import { getUserTokenLocalStorage } from "../../scripts/localStorage.js";
import { openCreateDepartment } from "../../scripts/openModal.js";
import {
  renderCompaniesAdminPage,
  renderDepartamentsByCompany,
} from "../../scripts/render.js";
import {
  allCompanies,
  getAllUsers,
  getAllUsersWithoutDepartment,
  listAllDepartments,
} from "../../scripts/requests.js";
logout();

const { token } = getUserTokenLocalStorage();

openCreateDepartment();

// console.log(await getAllUsers(token));
// console.log(await getAllUsersWithoutDepartment(token));
// console.log(await listAllDepartments(token));
// console.log(await allCompanies());
console.log(await getAllUsers(token));

//------------------------Renderizar options
await renderCompaniesAdminPage();
await renderDepartamentsByCompany();
