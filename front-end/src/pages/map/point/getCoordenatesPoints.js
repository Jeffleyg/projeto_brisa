import addPoint from "./addPoint";

export default (vectorSource, points) => {
  for (const coordenate of points) {
    const location = coordenate.location.coordinates;
    const persona = {
      name: coordenate.name,
      id: coordenate.id,
      cep: coordenate.zip,
      bairro: coordenate.neighborhood,
      cidade: coordenate.city,
    };
    const point = addPoint(location, persona);

    vectorSource.addFeature(point);
  }
};
