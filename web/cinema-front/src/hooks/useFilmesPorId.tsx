import { useQuery } from "@tanstack/react-query";
import useAPIFilme from "./useAPIFilme";

const useFilmePorId = (id?: string) => {
  const { recuperarFilmePorId } = useAPIFilme();
  
  return useQuery({
    queryKey: ["filmes", id],
    queryFn: () => recuperarFilmePorId(id),
    staleTime: 10_000,
    enabled: !!id,  
  });
};

export default useFilmePorId;
