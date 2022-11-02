import { allCompanies, allDepartment, companiesBySector } from "./requests.js";

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
