import { useMutation } from "@tanstack/react-query";
import type UsuarioCadastro from "../interfaces/usuarioCadastro";
import useAPICadastro from "./useAPICadastro";
 


const useEfetuarCadastro = () => {
  // Pega a função 'cadastro' do nosso hook de API
  const { cadastro } = useAPICadastro();

  // Configura a mutação do React Query
  return useMutation({
    // A função da mutação espera um objeto do tipo UsuarioCadastro
    // e o passa para a nossa função de API.
    mutationFn: (usuario: UsuarioCadastro) => cadastro(usuario),
  });
};

export default useEfetuarCadastro;