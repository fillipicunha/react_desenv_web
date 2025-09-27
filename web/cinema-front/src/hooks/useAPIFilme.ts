import axios, { type AxiosRequestConfig } from "axios";
import CustomError from "../util/CustomError";
import { URL_BASE, URL_FILME } from "../util/constants";
import type { Filme } from "../interfaces/Filme";
import type ResultadoPaginado from "../interfaces/resultadoPaginado";
 
 

const useAPIFilme = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  const recuperarFilmesPorSlugDoGenero = (slug?: string) =>
    axiosInstance
      .get<Filme[]>(URL_FILME + (slug ? "/slugGenero/" + slug : ""))
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          throw new CustomError(error.response.data.message, error.response.data.errorCode);
        } else if (error.request) {
          throw error;
        } else {
          throw error;
        }
      });

  const recuperarFilmesPaginadosPorSlugDoGenero = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<ResultadoPaginado<Filme>>(URL_FILME + "/genero/paginacao", config)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          throw new CustomError(error.response.data.message, error.response.data.errorCode);
        } else if (error.request) {
          throw error;
        } else {
          throw error;
        }
      });

  const recuperarFilmePorId = (id?: string) =>
    axiosInstance
      .get<Filme>(URL_FILME + "/" + id)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          throw new CustomError(error.response.data.message, error.response.data.errorCode);
        } else if (error.request) {
          throw error;
        } else {
          throw error;
        }
      });

  return {
    recuperarFilmesPorSlugDoGenero,
    recuperarFilmesPaginadosPorSlugDoGenero,
    recuperarFilmePorId
  };
};

export default useAPIFilme;
