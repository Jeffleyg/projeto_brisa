import { get } from "../../../external/httpRequest";

export default async function getPoints(filterFields) {
  const { data } = await get("/coordenates", filterFields);

  return data.points ?? [];
}
