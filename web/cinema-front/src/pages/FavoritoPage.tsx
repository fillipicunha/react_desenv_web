import Favorito from "../components/Favoritos"

const FavoritoPage = () => {
  return (
    <div>
    <Favorito />
    </div>
  )
}
export default FavoritoPage


/*import { useFavoritosStore } from "../util/useFavoritosStore";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Filme } from "../interfaces/Filme";

export default function FavoritosPage() {
  const { favoritos, removerFavorito } = useFavoritosStore();

  return (
    <div className="container mt-4">
      <h2>Meus Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>Não há filmes favoritos ainda.</p>
      ) : (
        <>
          <ul className="list-group">
            {favoritos.map((filme) => (
              <li
                key={filme.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{filme.titulo}</span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removerFavorito(filme.id)}
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Link to="/cartaz" className="btn btn-primary">
              Voltar aos filmes{" "}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
*/