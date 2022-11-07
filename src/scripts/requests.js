import { toast } from "./toast.js";

const baseUrl = "http://localhost:6278";
const headers = {
  "Content-Type": "application/json",
};

// ------------------------------> Rotas que não utilizam token
export async function registerUser(body) {
  try {
    const request = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (request.ok) {
      toast("Sucesso!", "Usuário criado com sucesso!");

      setTimeout(() => {
        window.location.href = "../login/index.html";
      }, 4000);
    } else {
      toast("Erro!", "E-mail ou senha inválidos");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function login(body) {
  try {
    const request = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const response = await request.json();
    localStorage.setItem("user", JSON.stringify(response));

    return response.token;
  } catch (err) {
    console.log(err);
  }
}

export async function allCompanies() {
  try {
    const request = await fetch(`${baseUrl}/companies`, {
      method: "GET",
      headers: headers,
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function allDepartment() {
  try {
    const request = await fetch(`${baseUrl}/sectors`, {
      method: "GET",
      headers: headers,
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function companiesBySector(sector) {
  try {
    const request = await fetch(`${baseUrl}/companies/${sector}`, {
      method: "GET",
      headers: headers,
    });

    const response = await request.json();

    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

// ------------------------------>

// ------------------------------> Verificar tipo de usuário

export async function typeOfUser(token) {
  try {
    const request = await fetch(`${baseUrl}/auth/validate_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (request.ok) {
      const response = await request.json();
      if (response.is_admin) {
        toast("Sucesso!", "Login de admin");

        setTimeout(() => {
          window.location.href = "../adminPage/index.html";
        }, 4000);
      } else if (response.is_admin == false) {
        toast("Sucesso!", "Login de usuário");

        setTimeout(() => {
          window.location.href = "../userPage/index.html";
        }, 4000);
      }
    } else {
      toast("Erro!", "E-mail ou senha inválido");
    }

    // console.log(response.is_admin);
    // console.log(request);
  } catch (err) {
    console.log(err);
  }
}

// ------------------------------> Funcionários

export async function getUsersInformation(token) {
  try {
    const request = await fetch(`${baseUrl}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserInformation(body, token) {
  try {
    const request = await fetch(`${baseUrl}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function listDepartmentsCoworkers(token) {
  try {
    const request = await fetch(`${baseUrl}/users/departments/coworkers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();

    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function listCompanyDepartmentsByUser(token) {
  try {
    const request = await fetch(`${baseUrl}/users/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();

    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

// ------------------------------> Rotas ADMIN

export async function getAllUsers(token) {
  try {
    const request = await fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUsersWithoutDepartment(token) {
  try {
    const request = await fetch(`${baseUrl}/admin/out_of_work`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function updateEmployeeInformation(token, userId, body) {
  try {
    const request = await fetch(`${baseUrl}/admin/update_user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(token, userId) {
  try {
    const request = await fetch(`${baseUrl}/admin/delete_user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // const response = await request.json();

    // console.log(response);

    return request;
  } catch (err) {
    console.log(err);
  }
}

// ------------------------------> Rotas ADMIN - Empresa

export async function registerCompany(token, body) {
  try {
    const request = await fetch(`${baseUrl}/companies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

// --------------------------> Rotas ADMIN - Departamentos

export async function listAllDepartments(token) {
  try {
    const request = await fetch(`${baseUrl}/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function listAllDepartmentsByCompany(token, companyId) {
  try {
    const request = await fetch(`${baseUrl}/departments/${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function createDepartment(token, body) {
  try {
    const request = await fetch(`${baseUrl}/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function hireEmployee(token, body) {
  try {
    const request = await fetch(`${baseUrl}/departments/hire/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function dismissEmployee(token, userId) {
  try {
    const request = await fetch(`${baseUrl}/departments/dismiss/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // const response = await request.json();

    // console.log(response);

    return request;
  } catch (err) {
    console.log(err);
  }
}

export async function editDepartment(token, body, departmentId) {
  try {
    const request = await fetch(`${baseUrl}/departments/${departmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    // const response = await request.json();

    // console.log(response);

    return request;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDepartment(token, departmentId) {
  try {
    const request = await fetch(`${baseUrl}/departments/${departmentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // const response = await request.json();

    // console.log(response);

    return request;
  } catch (err) {
    console.log(err);
  }
}
