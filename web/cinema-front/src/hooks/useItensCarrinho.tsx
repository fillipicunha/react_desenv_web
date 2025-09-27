import { useQuery } from "@tanstack/react-query";
 
import { URL_ITEM_CARRINHO } from "../util/constants";   
import type ItemCarrinho from "../interfaces/ItemCarrinho";
import useAPI from "./useAPI";
 

const useItensCarrinho = () => {
  const { recuperar } = useAPI<ItemCarrinho>(URL_ITEM_CARRINHO);
  
  return useQuery({
    queryKey: ["itens-carrinho"],
    queryFn: () => recuperar(),
    staleTime: 10_000,
  });
};

export default useItensCarrinho;