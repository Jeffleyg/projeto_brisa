import { get } from "../../external/httpRequest";

export default async function getStatistics(personId, initialDate, finalDate) {
  const { data } = await get("/statistics", {
    clientId: personId,
    initialDate: initialDate,
    finalDate: finalDate,
  });

  return data ?? {};
}
