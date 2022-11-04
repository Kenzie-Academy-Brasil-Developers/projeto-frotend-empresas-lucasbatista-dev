export const openCreateDepartment = () => {
  const buttonOpen = document.querySelector("#openModalCreate");
  const buttonClose = document.querySelector("#closeModal");
  const modal = document.querySelector("#modalCreate");

  buttonOpen.onclick = function () {
    modal.showModal();
  };
  buttonClose.onclick = function () {
    modal.close();
  };
};
