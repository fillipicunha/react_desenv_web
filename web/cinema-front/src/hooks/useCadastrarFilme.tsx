import { useMutation, useQueryClient } from "@tanstack/react-query";
 
 
 
import useAPI from "./useAPI";
import type { Filme } from "../interfaces/Filme";
import { URL_FILME } from "../util/constants";

const useCadastrarFilme = () => {
  const { cadastrar } = useAPI<Filme>(URL_FILME);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (filme: Filme) => cadastrar(filme),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["filmes"],
      }),
  });
};

export default useCadastrarFilme;
