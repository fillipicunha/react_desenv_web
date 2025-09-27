import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_ITEM_FAVORITO } from "../util/constants";
 
 
import useAPI from "./useAPI";
import type ItemFavorito from "../interfaces/ItemFavorito";

const useAlterarItemFavorito = () => {
  const { alterar } = useAPI<ItemFavorito>(URL_ITEM_FAVORITO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemFavorito: ItemFavorito) => alterar(itemFavorito),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["itens-favoritos"],
      }),
  });
};

export default useAlterarItemFavorito;