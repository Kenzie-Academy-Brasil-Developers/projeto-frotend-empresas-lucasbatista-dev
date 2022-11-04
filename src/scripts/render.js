import {
  allCompanies,
  allDepartment,
  companiesBySector,
  getUsersInformation,
  listAllDepartments,
  listAllDepartmentsByCompany,
  listCompanyDepartmentsByUser,
  listDepartmentsCoworkers,
} from "./requests.js";
import { getUserTokenLocalStorage } from "./localStorage.js";

//---------------------------- HOMEPAGE
export const renderCompanies = async () => {
  const ul = document.querySelector("ul");
  const renderEmpty = await allCompanies();
  renderEmpty.forEach((element) => {
    ul.insertAdjacentHTML(
      `afterbegin`,
      `
      <li>
      <h3>${element.name}</h3>
      <div>
        <p>${element.opening_hours} horas</p>
        <span>${element.sectors.description}</span>
      </div>
    </li>    
    `
    );
  });
  const selectValue = document.querySelector("#select-section");

  selectValue.addEventListener("change", async function () {
    const ul = document.querySelector("ul");

    if (selectValue.value == "Todos") {
      ul.innerHTML = "";

      const companies = await allCompanies();

      companies.forEach((element) => {
        ul.insertAdjacentHTML(
          `afterbegin`,
          `
          <li>
          <h3>${element.name}</h3>
          <div>
            <p>${element.opening_hours} horas</p>
            <span>${element.sectors.description}</span>
          </div>
        </li>    
        `
        );
      });
    } else {
      ul.innerHTML = "";
      const companies = await companiesBySector(selectValue.value);
      companies.forEach((element) => {
        ul.insertAdjacentHTML(
          `afterbegin`,
          `
          <li>
          <h3>${element.name}</h3>
          <div>
            <p>${element.opening_hours} horas</p>
            <span>${element.sectors.description}</span>
          </div>
        </li>    
        `
        );
      });
    }
  });
};

export const renderDepartment = async () => {
  const select = document.querySelector("#optionAll");
  select.innerText = "Todos";

  select.innerHTML = "";

  const options = await allDepartment();

  options.forEach((element) => {
    select.insertAdjacentHTML(
      "beforebegin",
      `
      <option value="${element.description}">${element.description}</option>
        
    `
    );
  });
};

//---------------------------- User Page

export const renderUserInfo = async () => {
  const sectionUserInfo = document.querySelector(".userInfo");
  const tokenUser = getUserTokenLocalStorage();
  const token = tokenUser.token;

  const userInformation = await getUsersInformation(token);

  const divUser = document.createElement("div");
  const nameUser = document.createElement("h2");
  const email = document.createElement("p");
  const lvl = document.createElement("p");
  const kindWork = document.createElement("p");
  const changeInfo = document.createElement("button");

  divUser.classList = "flex column gap12";
  changeInfo.classList = "divIcon";
  changeInfo.id = "openModal";

  const buttonClose = document.querySelector("#closeModal");
  const modal = document.querySelector("#modalNav");

  changeInfo.onclick = function () {
    modal.showModal();
  };
  buttonClose.onclick = function () {
    modal.close();
  };

  nameUser.innerText = userInformation.username;
  email.innerText = `E-mail: ${userInformation.email}`;
  lvl.innerText = userInformation.professional_level;
  kindWork.innerText = userInformation.kind_of_work;

  divUser.append(nameUser, email);
  sectionUserInfo.append(divUser, lvl, kindWork, changeInfo);

  return sectionUserInfo;
};
export const renderUserDepartmensAndCoworkers = async () => {
  const sectionContainer = document.querySelector("main");
  const { token } = getUserTokenLocalStorage();
  const userInfo = await getUsersInformation(token);

  if (userInfo.department_uuid == null) {
    sectionContainer.insertAdjacentHTML(
      "beforeend",
      `
      <section class="userCompany">
        <p>Você ainda não foi contratado</p>
      </section>
    `
    );
  } else {
    const userCompanyDepartments = await listCompanyDepartmentsByUser(token);
    const userCompanyCoworkers = await listDepartmentsCoworkers(token);

    const myObject = Object.assign({}, userCompanyCoworkers);

    const coworkers = myObject[0].users;

    const departmentInfo = userCompanyDepartments.departments.find(
      (element) => element.uuid == userInfo.department_uuid
    );

    const container = document.querySelector(".containerCompany");
    const containerCoworkers = document.querySelector("#listCoworkers");

    const companySection = document.createElement("section");
    companySection.classList = "companyInfo";

    const companyDiv = document.createElement("div");
    companyDiv.classList = "flex gap6";

    const companyName = document.createElement("p");
    companyName.innerText = userCompanyDepartments.name;

    const span = document.createElement("span");
    span.innerText = "-";

    const departmentName = document.createElement("p");
    departmentName.innerText = departmentInfo.name;

    companyDiv.append(companyName, span, departmentName);
    companySection.append(companyDiv);
    container.append(companySection);

    coworkers.forEach((element) => {
      containerCoworkers.insertAdjacentHTML(
        "afterbegin",
        `
        <li>
        <h3>${element.username}</h3>
        <p>${element.professional_level}</p>
      </li>
      
      
      `
      );
    });
  }
};

//---------------------------- Admin Page
export const renderCompaniesAdminPage = async () => {
  const select = document.querySelector("#selectCompany");
  // select.innerText = "Todos";
  // select.innerHTML = "";

  const options = await allCompanies();

  options.forEach((element) => {
    select.insertAdjacentHTML(
      "beforebegin",
      `
      <option value="${element.uuid}">${element.name}</option>
        
    `
    );
  });
};

export const renderDepartamentsByCompany = async () => {
  const { token } = getUserTokenLocalStorage();
  const ulList = document.querySelector("#ulDepartments");
  const selectValue = document.querySelector("#select-section");
  // console.log(selectValue);
  const allDepartment = await listAllDepartments(token);

  allDepartment.forEach((element) => {
    const li = document.createElement("li");
    const departmentName = document.createElement("h3");
    departmentName.innerText = element.name;
    const description = document.createElement("p");
    description.innerText = element.description;
    const companyName = document.createElement("p");
    companyName.innerText = "teste";

    const divBtns = document.createElement("div");
    const btnEye = document.createElement("button");
    const imgEye = document.createElement("img");
    imgEye.src = "../../assets/olho.png";
    btnEye.append(imgEye);

    const btnPencil = document.createElement("button");
    const pencilImg = document.createElement("img");
    pencilImg.src = "../../assets/caneta.png";
    btnPencil.append(pencilImg);

    const btnTrash = document.createElement("button");
    const trashImg = document.createElement("img");
    trashImg.src = "../../assets/lixeira.png";
    btnTrash.append(trashImg);

    divBtns.append(btnEye, btnPencil, btnTrash);
    li.append(departmentName, description, companyName, divBtns);

    ulList.append(li);
  });

  selectValue.addEventListener("change", async function () {
    const departments = await listAllDepartmentsByCompany(
      token,
      selectValue.value
    );

    if (departments.length == 0) {
      ulList.innerHTML = "";
    } else {
      const getCompanyName = [...selectValue];
      console.log(getCompanyName);
      ulList.innerHTML = "";
      departments.forEach((element) => {
        const li = document.createElement("li");
        const departmentName = document.createElement("h3");
        departmentName.innerText = element.name;
        const description = document.createElement("p");
        description.innerText = element.description;
        const companyName = document.createElement("p");
        companyName.innerText = "teste";

        const divBtns = document.createElement("div");
        const btnEye = document.createElement("button");
        const imgEye = document.createElement("img");
        imgEye.src = "../../assets/olho.png";
        btnEye.append(imgEye);

        const btnPencil = document.createElement("button");
        const pencilImg = document.createElement("img");
        pencilImg.src = "../../assets/caneta.png";
        btnPencil.append(pencilImg);

        const btnTrash = document.createElement("button");
        const trashImg = document.createElement("img");
        trashImg.src = "../../assets/lixeira.png";
        btnTrash.append(trashImg);

        divBtns.append(btnEye, btnPencil, btnTrash);
        li.append(departmentName, description, companyName, divBtns);

        ulList.append(li);
      });
    }
  });
};
