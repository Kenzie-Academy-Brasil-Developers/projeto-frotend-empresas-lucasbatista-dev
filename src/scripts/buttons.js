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
