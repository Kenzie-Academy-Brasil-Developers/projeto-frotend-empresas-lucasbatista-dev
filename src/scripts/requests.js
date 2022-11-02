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
    return response;
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

    // console.log(response);

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

    const response = await request.json();

    console.log(response);

    return response;
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

    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserInformation(token) {
  try {
    const request = await fetch(`${baseUrl}/users/profile`, {
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
