import { useQuery } from "@tanstack/react-query";
 
import { URL_ITEM_FAVORITO } from "../util/constants";   
import type ItemFavorito from "../interfaces/ItemFavorito";
import useAPI from "./useAPI";


const useItensFavorito = () => {
  const { recuperar } = useAPI<ItemFavorito>(URL_ITEM_FAVORITO);
  
  return useQuery({
    queryKey: ["itens-favoritos"],
    queryFn: () => recuperar(),
    staleTime: 10_000,
  });
};

export default useItensFavorito;