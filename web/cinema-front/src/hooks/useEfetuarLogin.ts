 


//import type TokenResponse from "../interfaces/TokenResponse";

/*async function efetuarLogin(usuario: Usuario): Promise<TokenResponse> {
  const resposta = await fetch("http://localhost:8080/api/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!resposta.ok) {
    throw new Error("Usuário ou senha inválidos");
  }

  return resposta.json();
}

export default function useEfetuarLogin() {
  return useMutation({
    mutationFn: efetuarLogin
  });
}*/

/*
async function efetuarLogin(usuario: Usuario): Promise<Usuario> {
  const resposta = await fetch("http://localhost:8080/api/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!resposta.ok) {
    throw new Error("Usuário ou senha inválidos");
  }

  return resposta.json();
}

export default function useEfetuarLogin() {
  return useMutation({
    mutationFn: efetuarLogin
  });
}
*/

import { useMutation } from "@tanstack/react-query";
 
import useAPIAutenticacao from "./useAPIAutenticacao";
import type Usuario from "../interfaces/Usuario";
 

const useEfetuarLogin = () => {
    const { login } = useAPIAutenticacao();
  
    return useMutation({
      mutationFn: (usuario: Usuario) => login(usuario),
    });
  };
  
export default useEfetuarLogin;