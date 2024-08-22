import "ol/ol.css";
import { Overlay } from "ol";
import getCoordenatesPoints from "./point/getCoordenatesPoints";
import { mapconfig } from "./mapConfig";
import { vectorCreate } from "./vectorCreate";

const points = JSON.parse(sessionStorage.getItem("points"));
const initialPoint = JSON.parse(sessionStorage.getItem("initialPoint")) ?? [
  -43.25747587604714,
  -22.811305750000002,
];

const { vectorSource, vectorLayer } = vectorCreate();

const map = mapconfig(vectorLayer, initialPoint);
getCoordenatesPoints(vectorSource, points);

const element = document.getElementById("popup");
const popup = new Overlay({
  element: element,
  positioning: "bottom-center",
  stopEvent: false,
});
map.addOverlay(popup);

// Add overlay button to the map
const overlayButtonElement = document.getElementById("overlayButton");
overlayButtonElement.addEventListener("click", () => {
  globalThis.location.href = "../filter/filterPage.html";
});

// Show the popup on marker click
map.on("click", function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (!feature) {
    return;
  }
  const coordinates = feature.getGeometry().getCoordinates();
  popup.setPosition(coordinates);

  // Content of the popup
  const body = document.getElementById("popup-body");
  body.innerHTML = `<h3 class="client-name">${feature.get("name")}</h3>
  <small class="client-cep">CEP: ${feature.get("cep")}</small>
  <button class="btn-estatistica">Ver Detalhes</button>`;

  sessionStorage.setItem(
    "personInfo",
    JSON.stringify({
      id: feature.get("id"),
      nome: feature.get("name"),
      bairro: feature.get("bairro"),
      cidade: feature.get("cidade"),
    }),
  );

  const statisticButton = document.querySelector(".btn-estatistica");
  statisticButton.addEventListener("click", () => {
    globalThis.location.href = "../dashboard/dashboardPage.html";
  });
});

// Logic to close the popup
const closeButton = document.querySelector(".btn-close");
closeButton.addEventListener("click", () => {
  popup.setPosition(undefined);
});
