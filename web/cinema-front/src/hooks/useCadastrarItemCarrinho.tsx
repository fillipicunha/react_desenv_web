import { useMutation, useQueryClient } from "@tanstack/react-query";
 
import { URL_ITEM_CARRINHO } from "../util/constants";
import useAPI from "./useAPI";
import type ItemCarrinho from "../interfaces/ItemCarrinho";
 

const useCadastrarItemCarrinho = () => {
  const { cadastrar } = useAPI<ItemCarrinho>(URL_ITEM_CARRINHO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemCarrinho: ItemCarrinho) => cadastrar(itemCarrinho),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["itens-carrinho"],
      }),
  });
};

export default useCadastrarItemCarrinho;