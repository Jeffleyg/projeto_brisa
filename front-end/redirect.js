import getPoints from "./src/pages/map/point/getPoints";

export async function filterPoints() {
  const points = await getPoints();

  sessionStorage.setItem("points", JSON.stringify(points));

  window.location.href = "./src/pages/map/mapView.html";
}

// Adicione a função ao escopo global
globalThis.filterPoints = filterPoints;
