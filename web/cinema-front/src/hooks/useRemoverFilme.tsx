import { useMutation, useQueryClient } from "@tanstack/react-query";
 
import { URL_FILME } from "../util/constants";
import type { Filme } from "../interfaces/Filme";
import useAPI from "./useAPI";
 

const useRemoverFilme = () => {
  const { remover } = useAPI<Filme>(URL_FILME);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => remover(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["filmes"],
      }),
  });
};

export default useRemoverFilme;
