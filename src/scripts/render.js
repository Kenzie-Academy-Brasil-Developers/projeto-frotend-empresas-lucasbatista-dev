import {
  allCompanies,
  allDepartment,
  companiesBySector,
  deleteDepartment,
  deleteUser,
  dismissEmployee,
  editDepartment,
  getAllUsers,
  getAllUsersWithoutDepartment,
  getUsersInformation,
  hireEmployee,
  listAllDepartments,
  listAllDepartmentsByCompany,
  listCompanyDepartmentsByUser,
  listDepartmentsCoworkers,
  updateEmployeeInformation,
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
export const renderCompaniesCreate = async () => {
  const select = document.querySelector("#company_uuid");
  const options = await allCompanies();

  options.forEach((element) => {
    select.insertAdjacentHTML(
      "afterbegin",
      `
      <option name="company_uuid" value="${element.uuid}">${element.name}</option>
        
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
    companyName.innerText = element.companies.name;

    const divBtns = document.createElement("div");
    const btnEye = document.createElement("button");
    btnEye.addEventListener("click", async (e) => {
      e.preventDefault();

      const depName = document.querySelector("#departmentName");
      depName.innerText = element.name;
      const depDescription = document.querySelector("#depDescription");
      depDescription.innerText = element.description;
      const depCompany = document.querySelector("#depCompany");
      depCompany.innerText = element.companies.name;
      const modal = document.querySelector("#modalView");
      const buttonClose = document.querySelector(".closeModal");
      modal.showModal();
      buttonClose.onclick = function () {
        modal.close();
      };
      const select = document.querySelector("#user_uuid");
      const options = await getAllUsersWithoutDepartment(token);
      options.forEach((element) => {
        select.insertAdjacentHTML(
          "afterbegin",
          `
          <option value="${element.uuid}">${element.username}</option>
            
        `
        );
      });
      const ulviewUser = document.querySelector("#viewUser");
      const allUsersView = await getAllUsers(token);
      ulviewUser.innerHTML = "";

      allUsersView.forEach((user) => {
        if (user.department_uuid == element.uuid) {
          const tagLi = document.createElement("li");
          const userName = document.createElement("p");
          userName.classList = "userName";
          userName.innerText = user.username;
          const userLvl = document.createElement("p");
          userLvl.classList = "infoUser";
          userLvl.innerText = user.professional_level;
          const companyName = document.createElement("p");
          companyName.innerText = element.companies.name;
          const divBtn = document.createElement("div");
          divBtn.classList = "width100 flex justify-center";
          const btn = document.createElement("button");
          btn.addEventListener("click", async (e) => {
            e.preventDefault();
            await dismissEmployee(token, user.uuid);
            window.location.reload();
          });
          btn.classList = "btnWhiteRed";
          btn.innerText = "Desligar";

          divBtn.append(btn);
          tagLi.append(userName, userLvl, companyName, divBtn);

          ulviewUser.append(tagLi);
        }
      });

      const form = document.querySelector("#formHire");
      const elements = [...form.elements];

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((ele) => {
          if (ele.tagName == "SELECT") {
            body[ele.id] = ele.value;
            body["department_uuid"] = element.uuid;
          }
        });
        await hireEmployee(token, body);
        window.location.reload();
      });
    });
    const imgEye = document.createElement("img");
    imgEye.src = "../../assets/olho.png";
    btnEye.append(imgEye);

    const btnPencil = document.createElement("button");
    btnPencil.addEventListener("click", async (e) => {
      e.preventDefault();
      const modal = document.querySelector("#editDepartment");
      const buttonClose = document.querySelector(".closeEditModal");
      modal.showModal();
      buttonClose.onclick = function () {
        modal.close();
      };

      const form = document.querySelector("#formEditDepartment");

      const elements = [...form];

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};

        elements.forEach((element) => {
          if (element.tagName == "TEXTAREA") {
            body[element.id] = element.value;
          }
        });
        await editDepartment(token, body, element.uuid);
        window.location.reload();
      });
    });

    const pencilImg = document.createElement("img");
    pencilImg.src = "../../assets/caneta.png";
    btnPencil.append(pencilImg);

    const btnTrash = document.createElement("button");
    const trashImg = document.createElement("img");
    trashImg.src = "../../assets/lixeira.png";
    btnTrash.addEventListener("click", async (e) => {
      e.preventDefault();
      const modal = document.querySelector("#deleteDepartment");
      const buttonClose = document.querySelector("#closeDeleteDepartment");
      modal.showModal();
      buttonClose.onclick = function () {
        modal.close();
      };

      const nameDepartment = document.querySelector("#nameDeletedDepartment");
      nameDepartment.innerText = element.name;
      const deleteBtn = document.querySelector("#deleteBtn");
      deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await deleteDepartment(token, element.uuid);
        window.location.reload();
      });
    });

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

      ulList.innerHTML = "";
      getCompanyName.forEach((ele) => {
        if (ele.value == selectValue.value) {
          departments.forEach((element) => {
            const li = document.createElement("li");
            const departmentName = document.createElement("h3");
            departmentName.innerText = element.name;
            const description = document.createElement("p");
            description.innerText = element.description;
            const companyName = document.createElement("p");
            companyName.innerText = ele.innerText;

            const divBtns = document.createElement("div");
            const btnEye = document.createElement("button");
            btnEye.addEventListener("click", async (e) => {
              e.preventDefault();

              const depName = document.querySelector("#departmentName");
              depName.innerText = element.name;
              const depDescription = document.querySelector("#depDescription");
              depDescription.innerText = element.description;
              const depCompany = document.querySelector("#depCompany");
              depCompany.innerText = element.companies.name;
              const modal = document.querySelector("#modalView");
              const buttonClose = document.querySelector(".closeModal");
              modal.showModal();
              buttonClose.onclick = function () {
                modal.close();
              };
              const select = document.querySelector("#user_uuid");
              const options = await getAllUsersWithoutDepartment(token);
              options.forEach((element) => {
                select.insertAdjacentHTML(
                  "afterbegin",
                  `
                  <option value="${element.uuid}">${element.username}</option>
                    
                `
                );
              });
              const ulviewUser = document.querySelector("#viewUser");
              const allUsersView = await getAllUsers(token);
              ulviewUser.innerHTML = "";

              allUsersView.forEach((user) => {
                if (user.department_uuid == element.uuid) {
                  const tagLi = document.createElement("li");
                  const userName = document.createElement("p");
                  userName.classList = "userName";
                  userName.innerText = user.username;
                  const userLvl = document.createElement("p");
                  userLvl.classList = "infoUser";
                  userLvl.innerText = user.professional_level;
                  const companyName = document.createElement("p");
                  companyName.innerText = element.companies.name;
                  const divBtn = document.createElement("div");
                  divBtn.classList = "width100 flex justify-center";
                  const btn = document.createElement("button");
                  btn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    await dismissEmployee(token, user.uuid);
                    window.location.reload();
                  });
                  btn.classList = "btnWhiteRed";
                  btn.innerText = "Desligar";

                  divBtn.append(btn);
                  tagLi.append(userName, userLvl, companyName, divBtn);

                  ulviewUser.append(tagLi);
                }
              });

              const form = document.querySelector("#formHire");
              const elements = [...form.elements];

              form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const body = {};
                elements.forEach((ele) => {
                  if (ele.tagName == "SELECT") {
                    body[ele.id] = ele.value;
                    body["department_uuid"] = element.uuid;
                  }
                });
                await hireEmployee(token, body);
                window.location.reload();
              });
            });
            const imgEye = document.createElement("img");
            imgEye.src = "../../assets/olho.png";
            btnEye.append(imgEye);

            const btnPencil = document.createElement("button");
            btnPencil.addEventListener("click", async (e) => {
              e.preventDefault();
              const modal = document.querySelector("#editDepartment");
              const buttonClose = document.querySelector(".closeEditModal");
              modal.showModal();
              buttonClose.onclick = function () {
                modal.close();
              };

              const form = document.querySelector("#formEditDepartment");

              const elements = [...form];

              form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const body = {};

                elements.forEach((element) => {
                  if (element.tagName == "TEXTAREA") {
                    body[element.id] = element.value;
                  }
                });
                await editDepartment(token, body, element.uuid);
                window.location.reload();
              });
            });
            const pencilImg = document.createElement("img");
            pencilImg.src = "../../assets/caneta.png";
            btnPencil.append(pencilImg);

            const btnTrash = document.createElement("button");
            const trashImg = document.createElement("img");
            btnTrash.addEventListener("click", async (e) => {
              e.preventDefault();
              const modal = document.querySelector("#deleteDepartment");
              const buttonClose = document.querySelector(
                "#closeDeleteDepartment"
              );
              modal.showModal();
              buttonClose.onclick = function () {
                modal.close();
              };

              const nameDepartment = document.querySelector(
                "#nameDeletedDepartment"
              );
              nameDepartment.innerText = element.name;
              const deleteBtn = document.querySelector("#deleteBtn");
              deleteBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                await deleteDepartment(token, element.uuid);
                window.location.reload();
              });
            });

            trashImg.src = "../../assets/lixeira.png";
            btnTrash.append(trashImg);

            divBtns.append(btnEye, btnPencil, btnTrash);
            li.append(departmentName, description, companyName, divBtns);

            ulList.append(li);
          });
        }
      });
    }
  });
};

export const renderAllEmployes = async () => {
  const { token } = getUserTokenLocalStorage();
  const ulListUsers = document.querySelector("#listRegistredUsers");
  const allUsers = await getAllUsers(token);
  const allDepartment = await listAllDepartments(token);

  allUsers.forEach((element) => {
    if (element.username !== "ADMIN") {
      const departments = [...allDepartment];

      const getDepartmentName = () => {
        let depart = "Desempregado";

        departments.forEach((department) => {
          if (department.uuid == element.department_uuid) {
            depart = department.companies.name;
          }
        });
        return depart;
      };
      const tagLi = document.createElement("li");
      const userName = document.createElement("h3");
      userName.innerText = element.username;
      const userLvl = document.createElement("p");
      userLvl.innerText = element.professional_level;
      const companyName = document.createElement("p");
      companyName.innerText = getDepartmentName();
      const divBtns = document.createElement("div");
      const btnPencil = document.createElement("button");
      btnPencil.addEventListener("click", async (e) => {
        e.preventDefault();
        const modal = document.querySelector("#editUser");
        const buttonClose = document.querySelector(".closeEditModal");
        modal.showModal();
        buttonClose.onclick = function () {
          modal.close();
        };

        const form = document.querySelector("#formEditUser");
        const elements = [...form.elements];

        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const body = {};
          elements.forEach((element) => {
            if (element.tagName == "SELECT") {
              body[element.id] = element.value;
            }
          });
          await updateEmployeeInformation(token, element.uuid, body);
          window.location.reload();
        });
      });

      const imgPencil = document.createElement("img");
      imgPencil.src = "../../assets/caneta.png";
      const btnTrash = document.createElement("button");
      btnTrash.classList = "openDeleteModal";
      btnTrash.addEventListener("click", async (e) => {
        e.preventDefault();
        const modal = document.querySelector("#deleteUser");
        const buttonClose = document.querySelector(".closeDeleteModal");
        const nameUser = document.querySelector(".nameDeleteUser");
        nameUser.innerText = element.username;
        const deleteBtn = document.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          await deleteUser(token, element.uuid);
          window.location.reload();
        });
        modal.showModal();
        buttonClose.onclick = function () {
          modal.close();
        };
      });
      const imgTrash = document.createElement("img");
      imgTrash.src = "../../assets/lixeira.png";

      divBtns.append(btnPencil, btnTrash);
      btnPencil.append(imgPencil);
      btnTrash.append(imgTrash);
      tagLi.append(userName, userLvl, companyName, divBtns);

      ulListUsers.append(tagLi);
    }
  });
};
