import useFilmesComPaginacao from "../hooks/useFilmesComPaginacao";
//import deleteIcon from "../assets/icones/database_delete.png";
import useFilmeStore from "../util/filmeStore";
import useRemoverFilme from "../hooks/useRemoverFilme";
import neutro from "../assets/icones/sort-order-16.png";
import up from "../assets/icones/sort-order-up-16.png"
import down from "../assets/icones/sort-order-down-16.png"
import "../assets/css/TabelaDeFilmes.css";
import type { Filme } from "../interfaces/Filme";
 

const TabelaDeFilmes = () => {
  const pagina = useFilmeStore(s => s.pagina);
  const tamanho = useFilmeStore(s => s.tamanho);
  const nome = useFilmeStore(s => s.nome);
  const campo = useFilmeStore(s => s.campo);
  const ordem = useFilmeStore(s => s.ordem);

  const setPagina = useFilmeStore(s => s.setPagina);
  const setCampo = useFilmeStore(s => s.setCampo);
  const setOrdem = useFilmeStore(s => s.setOrdem);
  const setFilmeSelecionado = useFilmeStore(s => s.setFilmeSelecionado);

  const { mutate: removerFilme } = useRemoverFilme();

  const tratarRemocao = (id: number) => {
    removerFilme(id);
    setPagina(0);
  }

  const {
    data: resultadoPaginado,
    isPending: carregandoFilmes,
    error: errorFilmes,
  } = useFilmesComPaginacao({ pagina, tamanho, nome, campo, ordem });

  const ordena = (campoSelecionado: string) => {
    if (campo === campoSelecionado) {
      setOrdem(ordem === 'asc' ? 'desc' : 'asc');
    } else {
      setCampo(campoSelecionado);
      setOrdem('desc');
    }
    setPagina(0);
  }

  const icone = (campoSelecionado: string) => {
    if (campo === campoSelecionado) {
      return ordem === 'asc' ? <img src={up} alt="Ascendente" /> : <img src={down} alt="Descendente" />;
    } else {
      return <img src={neutro} alt="Neutro" />;
    }
  };

  if (carregandoFilmes) return <h6>Carregando...</h6>;
  if (errorFilmes) throw errorFilmes;

  const filmes = resultadoPaginado.itens;

  return (
    <table className="table table-responsive table-sm table-hover table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th className="align-middle text-center">Id <span onClick={() => ordena('id')}>{icone('id')}</span></th>
          <th className="align-middle text-center">Imagem</th>
          <th className="align-middle text-center">Título <span onClick={() => ordena('nome')}>{icone('nome')}</span></th>
          <th className="align-middle text-center">Gênero <span onClick={() => ordena('genero')}>{icone('genero')}</span></th>
          <th className="align-middle text-center">Duração <span onClick={() => ordena('duracao')}>{icone('duracao')}</span></th>
          <th className="align-middle text-center">Sinopse</th>
          <th className="align-middle text-center">Ação</th>
        </tr>
      </thead>
      <tbody>
        {filmes.map((filme: Filme) => (
          <tr key={filme.id}>
            <td className="align-middle text-center">{filme.id}</td>
            <td className="align-middle text-center">
              <img src={filme.imagem} width={60} />
            </td>
            <td className="align-middle text-center">
              <a className="link-underline" onClick={() => setFilmeSelecionado(filme)}>
                {filme.titulo}
              </a>
            </td>
            <td className="align-middle text-center">{filme.genero.nome}</td>
            <td className="align-middle text-center">{filme.duracao} min</td>
            <td className="align-middle text-center">{filme.sinopse}</td>
            <td className="align-middle text-center">
              <button onClick={() => tratarRemocao(filme.id!)} className="btn btn-danger btn-sm">
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaDeFilmes;



/*import type { Filme } from "../interfaces/Filme";
import dayjs from "dayjs";

const TabelaDeFilmes = ({ filmes }: { filmes: Filme[] }) => {
  return (
    <table className="table table-hover table-sm table-bordered">
      <thead>
        <tr>
          <th>Id</th>
          <th>Imagem</th>
          <th>Gênero</th>
          <th>Nome</th>
          <th>Em Cartaz</th>
          <th>Lançamento</th>
          <th>Duração (min)</th>
        </tr>
      </thead>
      <tbody>
        {filmes.map(filme => (
          <tr key={filme.id}>
            <td>{filme.id}</td>
            <td><img src={filme.imagem} alt={filme.nome} style={{ width: 50 }} /></td>
            <td>{filme.genero.nome}</td>
            <td>{filme.nome}</td>
            <td>{filme.emCartaz ? "Sim" : "Não"}</td>
            <td>{dayjs(filme.dataLancamento).format("DD/MM/YYYY")}</td>
            <td>{filme.duracao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaDeFilmes;*/
