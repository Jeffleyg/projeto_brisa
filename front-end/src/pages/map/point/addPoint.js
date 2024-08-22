import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import pointStyle from "./pointStyle";

export default (point, persona) => {
  const ponto = new Point(fromLonLat(point));

  const pointFeature = new Feature({
    geometry: ponto,
    name: persona.name,
    id: persona.id,
    cep: persona.cep,
    bairro: persona.bairro,
    cidade: persona.cidade,
  });

  pointFeature.setStyle(pointStyle);

  return pointFeature;
};
