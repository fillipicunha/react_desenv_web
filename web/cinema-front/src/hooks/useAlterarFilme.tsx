import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_FILME } from "../util/constants";
import type { Filme } from "../interfaces/Filme";
import useAPI from "./useAPI";
 
   

const useAlterarFilme = () => {
  const { alterar } = useAPI<Filme>(URL_FILME);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (filme: Filme) => alterar(filme),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["filmes"],
      }),
  });
};

export default useAlterarFilme;
