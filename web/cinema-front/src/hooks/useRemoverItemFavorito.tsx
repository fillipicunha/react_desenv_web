import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_ITEM_FAVORITO } from "../util/constants";
import type ItemFavorito from "../interfaces/ItemFavorito";
import useAPI from "./useAPI";
 

const useRemoverItemFavorito = () => {
  const { remover } = useAPI<ItemFavorito>(URL_ITEM_FAVORITO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => remover(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["itens-favorito"],
      }),
  });
};

export default useRemoverItemFavorito;