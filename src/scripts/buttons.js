export const redirectLoginPage = () => {
  const btnLogin = document.querySelectorAll(".btnWhiteLogin");

  btnLogin.forEach((btn) => {
    btn.onclick = () => {
      window.location.replace("./src/pages/login/index.html");
    };
  });
};
export const redirectRegisterPage = () => {
  const btnRegister = document.querySelectorAll(".btnBlueRegister");

  btnRegister.forEach((btn) => {
    btn.onclick = () => {
      window.location.replace("./src/pages/register/index.html");
    };
  });
};
export const redirectHomePage = () => {
  const btnLogin = document.querySelectorAll(".btnWhiteHome");

  btnLogin.forEach((btn) => {
    btn.onclick = () => {
      window.location.replace("../../../index.html");
    };
  });
};
export const redirectLoginPage2 = () => {
  const btnLogin = document.querySelectorAll(".btnBlueLogin");

  btnLogin.forEach((btn) => {
    btn.onclick = () => {
      window.location.replace("../login/index.html");
    };
  });
};
export const redirectRegisterPage2 = () => {
  const btnRegister = document.querySelectorAll(".btnBlueRegister2");

  btnRegister.forEach((btn) => {
    btn.onclick = () => {
      window.location.replace("../register/index.html");
    };
  });
};

export const redirectRegisterPage3 = () => {
  const btnRegister = document.querySelectorAll(".btnWhiteRegister");

  btnRegister.forEach((btn) => {
    btn.onclick = () => {
      window.location.replace("../register/index.html");
    };
  });
};

export const logout = () => {
  const btnLogout = document.querySelector("#btnLogout");

  btnLogout.onclick = () => {
    localStorage.removeItem("user");
    window.location.replace("../../../index.html");
  };
};
