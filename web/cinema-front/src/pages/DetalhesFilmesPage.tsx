import { useParams, useNavigate } from "react-router-dom";
import useFilmeSelStore from "../util/filmeSelStore";
import useFilmePorId from "../hooks/useFilmesPorId";

const DetalhesFilmePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const setFilmeSelecionado = useFilmeSelStore((s) => s.setFilmeSelecionado);

  const {
    data: filme,
    isPending: carregandoFilme,
    error: erroFilme,
  } = useFilmePorId(id);

  if (carregandoFilme) return <h6>Carregando...</h6>;
  if (erroFilme) return <h6>Erro ao carregar os detalhes do filme.</h6>;

  return (
    <div className="container mb-3 text-white">
      <h1>Detalhes do Filme</h1>
      <div className="card">
        <img src={`/${filme.imagem}`} alt={filme.titulo} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{filme.titulo}</h5>
          <p className="card-text"><strong>Duração:</strong> {filme.duracao}</p>
          <p className="card-text"><strong>Classificação:</strong> {filme.classificacao}</p>
          <p className="card-text"><strong>Status:</strong> {filme.emCartaz ? "Em cartaz" : "Em breve"}</p>
          <p className="card-text"><strong>Sinopse:</strong> {filme.sinopse}</p>
          <button
            onClick={() => {
              setFilmeSelecionado(filme);
              navigate("/cadastro-filmes");
            }}
            className="btn btn-primary"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesFilmePage;
