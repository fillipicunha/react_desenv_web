import { useInfiniteQuery } from "@tanstack/react-query";
 
import useAPIFilme from "./useAPIFilme";
import type ResultadoPaginado from "../interfaces/resultadoPaginado";
import type { Filme } from "../interfaces/Filme";
 

interface QueryString {
  tamanho: number;
  slug?: string;
}

const useFilmesPaginadosPorSlugDoGenero = (query: QueryString) => {
  const { recuperarFilmesPaginadosPorSlugDoGenero } = useAPIFilme();

  return useInfiniteQuery<ResultadoPaginado<Filme>>({
    queryKey: ["filmes", "genero", "paginacao", query],
    queryFn: ({ pageParam }) =>
      recuperarFilmesPaginadosPorSlugDoGenero({
        params: {
          pagina: pageParam,
          ...query,
        },
      }),
    initialPageParam: 0,
    staleTime: 10_000,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.paginaCorrente < lastPage.totalDePaginas - 1
        ? lastPage.paginaCorrente + 1
        : undefined;
    },
  });
};

export default useFilmesPaginadosPorSlugDoGenero;
