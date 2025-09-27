import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_ITEM_CARRINHO } from "../util/constants";
 
 
import useAPI from "./useAPI";
import type ItemCarrinho from "../interfaces/ItemCarrinho";

const useAlterarItemCarrinho = () => {
  const { alterar } = useAPI<ItemCarrinho>(URL_ITEM_CARRINHO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemCarrinho: ItemCarrinho) => alterar(itemCarrinho),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["itens-carrinho"],
      }),
  });
};

export default useAlterarItemCarrinho;