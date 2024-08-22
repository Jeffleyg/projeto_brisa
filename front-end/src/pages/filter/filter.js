import getPoints from "../map/point/getPoints";

document.getElementById("formFilter").addEventListener("submit", filterResults);

document.getElementById("logoutButton").addEventListener("click", logout);

export function filterResults(event) {
  $("#filterButton").attr("disabled", "disabled");
  $("#filterButton").addClass("loading");

  const filterFields = {
    segment: document.getElementById("segment").value,
    company: document.getElementById("company").value,
    city: document.getElementById("city").value,
    neighborhood: document.getElementById("neighborhood").value,
  };

  event.preventDefault();
  getPoints(filterFields)
    .then((points) => {
      if (points?.length === 0) {
        alert(
          "Nenhum ponto encontrado para os filtros selecionados, confira os filtros digitados e tente novamente",
        );
        throw Error();
      }
      sessionStorage.setItem("points", JSON.stringify(points));

      $("#filterButton").removeClass("loading");
      $("#filterButton").removeAttr("disabled");

      globalThis.location.href = "../map/mapPage.html";
    })
    .catch((e) => {
      $("#filterButton").removeClass("loading");
      $("#filterButton").removeAttr("disabled");
      console.log(e);
    });
}

export function logout(event) {
  event.preventDefault();

  sessionStorage.setItem("token", "");
  globalThis.location.href = "../login/loginPage.html";
}
