import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_ITEM_FAVORITO } from "../util/constants";
import type ItemFavorito from "../interfaces/ItemFavorito";
import useAPI from "./useAPI";
 

const useCadastrarItemFavorito = () => {
  const { cadastrar } = useAPI<ItemFavorito>(URL_ITEM_FAVORITO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemFavorito: ItemFavorito) => cadastrar(itemFavorito),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["itens-favoritos"],
      }),
  });
};

export default useCadastrarItemFavorito;