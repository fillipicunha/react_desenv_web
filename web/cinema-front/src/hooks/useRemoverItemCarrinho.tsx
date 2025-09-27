import { useMutation, useQueryClient } from "@tanstack/react-query";
 
import { URL_ITEM_CARRINHO } from "../util/constants";
import type ItemCarrinho from "../interfaces/ItemCarrinho";
import useAPI from "./useAPI";
 

const useRemoverItemCarrinho = () => {
  const { remover } = useAPI<ItemCarrinho>(URL_ITEM_CARRINHO);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => remover(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["itens-carrinho"],
      }),
  });
};

export default useRemoverItemCarrinho;