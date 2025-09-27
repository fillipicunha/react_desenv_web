import axios from "axios";
import { URL_AUTENTICACAO, URL_BASE } from "../util/constants";
 
import CustomError from "../util/CustomError";
import type Usuario from "../interfaces/Usuario";
import type TokenResponse from "../interfaces/TokenResponse";

const useAPIAutenticacao = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  const login = (usuario: Usuario) =>
    axiosInstance
      .post<TokenResponse>(URL_AUTENTICACAO + "/login", usuario)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          if (error.response.data.errorCode === 422) {
            throw new CustomError(
              error.response.data.message,
              error.response.data.errorCode,
              Object.values(error.response.data.map)
            );
          }

          throw new CustomError(error.response.data.message, error.response.data.errorCode);
        } else if (error.request) {
          throw error;
        } else {
          throw error;
        }
      });
  return { login };
};

export default useAPIAutenticacao;