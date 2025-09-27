import useFilmesComPag from "../hooks/useFilmesComPaginacao";
import useFilmeStore from "../util/filmeStore";

const PaginacaoFilmes = () => {
  const pagina = useFilmeStore((s) => s.pagina);
  const tamanho = useFilmeStore((s) => s.tamanho);
  const nome = useFilmeStore((s) => s.nome);
  const campo = useFilmeStore((s) => s.campo);
  const ordem = useFilmeStore((s) => s.ordem);  
  const setPagina = useFilmeStore((s) => s.setPagina);

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  const {
    data: resultadoPaginado,
    isPending: carregandoFilmes,
    error: errorFilmes,
  } = useFilmesComPag({ pagina, tamanho, nome, campo, ordem });

  if (carregandoFilmes) return <h6>Carregando...</h6>;
  if (errorFilmes) throw errorFilmes;

  const totalDePaginas = resultadoPaginado.totalDePaginas;

  if (totalDePaginas < 2) return null;

  const arrayDePaginas = [];

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className="page-item">
        <a
          onClick={() => tratarPaginacao(i)}
          className={pagina === i ? "page-link active" : "page-link"}
          href="#"
        >
          {i + 1}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="Paginação">
      <ul className="pagination">
        <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
          <a
            onClick={() => tratarPaginacao(pagina - 1)}
            className="page-link"
            href="#"
          >
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li
          className={
            pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a
            onClick={() => tratarPaginacao(pagina + 1)}
            className="page-link"
            href="#"
          >
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginacaoFilmes;
