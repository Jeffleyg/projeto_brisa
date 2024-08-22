import { AxiosError } from "axios";
import { createApi } from "./axiosDefault";

export async function login(body) {
  const api = createApi();
  const { data, status } = await api.post("/login", body);

  if (status >= 400) {
    alert(data.toString());
    return null;
  }

  return data;
}

export async function get(url, params = {}) {
  const api = createApi();
  const request = await api.get(url, { params: params }).catch((e) => e);

  if (request instanceof AxiosError) {
    return {
      success: false,
      error: request,
      data: [],
    };
  }

  return {
    success: true,
    data: request.data,
  };
}
