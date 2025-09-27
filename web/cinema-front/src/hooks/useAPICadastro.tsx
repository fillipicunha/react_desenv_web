
import axios from "axios";
import { URL_BASE } from "../util/constants"; 
 
import CustomError from "../util/CustomError";
import type Usuario from "../interfaces/Usuario";

 
const URL_USUARIOS = "/usuarios";

const useAPICadastro = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  /**
   * Função que envia os dados de um novo usuário para a API.
   * @param usuario Objeto contendo conta e senha do novo usuário.
   */
  const cadastro = (usuario: Usuario) =>
    axiosInstance
      .post(URL_USUARIOS, usuario) // Faz o POST para o endpoint de cadastro
      .then((res) => res.data)
      .catch((error) => {
        // O tratamento de erro pode ser similar, mas talvez você queira
        // tratar erros específicos de cadastro, como "Conta já existe".
        if (error.response) {
          // Exemplo: um erro de validação (422) pode ocorrer se a conta já existir
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
      
  // Retorna apenas a função de cadastro
  return { cadastro };
};

export default useAPICadastro;
