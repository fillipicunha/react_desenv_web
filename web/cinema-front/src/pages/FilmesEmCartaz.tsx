/*import { useEffect, useState } from "react";
import type { Filme } from "../interfaces/Filme";
import filmeService from "../services/filmeService";
import { useCarrinhoStore } from "../util/useCarrinhoStore";
import { useFavoritosStore } from "../util/useFavoritosStore";

export default function FilmesEmCartaz() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);

  const adicionar = useCarrinhoStore((state) => state.adicionar);
  const itens = useCarrinhoStore((state) => state.itens);
  const removerUm = useCarrinhoStore((state) => state.removerUm);

  const adicionarFavorito = useFavoritosStore(
    (state) => state.adicionarFavorito
  );
  const removerFavorito = useFavoritosStore((state) => state.removerFavorito);
  const favoritos = useFavoritosStore((state) => state.favoritos);

  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const filmesApi = await filmeService.buscarEmCartaz();
        setFilmes(filmesApi);
      } catch (error) {
        console.error("Erro ao buscar filmes em cartaz:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarFilmes();
  }, []);

  if (carregando) return <p>Carregando filmes...</p>;

  function toggleFavorito(filme: Filme) {
    if (favoritos.some((f) => f.id === filme.id)) {
      removerFavorito(filme.id);
    } else {
      adicionarFavorito(filme);
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Filmes em Cartaz</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filmes.map((filme) => {
          const itemCarrinho = itens.find((item) => item.filme.id === filme.id);
          const quantidade = itemCarrinho?.quantidade || 0;
          const favorito = favoritos.some((f) => f.id === filme.id);
          return (
            <div className="col" key={filme.id}>
              <div className="card h-100">
                <img
                  src={filme.imagem}
                  className="card-img-top"
                  alt={filme.titulo}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {filme.titulo}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorito(filme);
                      }}
                      aria-label={
                        favorito
                          ? "Remover dos favoritos"
                          : "Adicionar aos favoritos"
                      }
                    >
                      <img
                        src={
                          favorito
                            ? "/assets/heart-fill.svg"
                            : "/assets/heart.svg"
                        }
                        alt={favorito ? "Favorito" : "Não favorito"}
                        style={{ width: 24, height: 24, cursor: "pointer" }}
                      />
                    </a>
                  </h5>
                  <p className="card-text">{filme.sinopse}</p>

                  {quantidade > 0 ? (
                    <div className="btn-group mt-auto">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => removerUm(filme.id)}
                      >
                        −
                      </button>
                      <span className="btn btn-outline-primary disabled">
                        {quantidade}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => adicionar(filme)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => adicionar(filme)}
                    >
                      Adicionar ao carrinho
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
*/