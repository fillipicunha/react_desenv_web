import { useQuery } from "@tanstack/react-query";
import { URL_FILME } from "../util/constants";
import useAPI from "./useAPI";
import type { Filme } from "../interfaces/Filme";
 

interface QueryString {
  pagina: number;
  tamanho: number;
  nome: string;
  campo: string;
  ordem: string;
}

const useFilmesComPaginacao = (query: QueryString) => {
  const { recuperarPagina } = useAPI<Filme>(URL_FILME);

  return useQuery({
    queryKey: ["filmes", "paginacao", query],
    queryFn: () =>
      recuperarPagina({
        params: {
          ...query,
        },
      }),
    staleTime: 10_000,
  });
};

export default useFilmesComPaginacao;
