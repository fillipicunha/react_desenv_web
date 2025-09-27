import { useQuery } from "@tanstack/react-query";
 
import { URL_BASE } from "../util/constants";  // Substituí URL_BASE por URL_FILME
import type { Filme } from "../interfaces/Filme";
import useAPI from "./useAPI";
        // Certifique-se de que a interface existe

const useFilmes = () => {
  const { recuperar } = useAPI<Filme>(URL_BASE);
  
  return useQuery({
    queryKey: ["filmes"],
    queryFn: () => recuperar(),
    staleTime: 10_000,
  });
};

export default useFilmes;
