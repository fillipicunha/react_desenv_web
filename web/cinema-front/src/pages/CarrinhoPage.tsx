import Carrinho from "../components/Carrinho";

const CarrinhoPage = () => {
  return (
    <div>
      <Carrinho />
    </div>
  );
};

export default CarrinhoPage;








/*import type { Filme } from "../interfaces/Filme";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrinhoStore } from "../util/useCarrinhoStore";

export default function CarrinhoPage() {
  const { itens, remover, limpar } = useCarrinhoStore();

  const adicionar = useCarrinhoStore((state) => state.adicionar);
  //const itens = useCarrinhoStore((state) => state.itens);
  const removerUm = useCarrinhoStore((state) => state.removerUm);

  return (
    <div className="container mt-4">
      <h2>Carrinho de Compras</h2>
      {itens.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Filme</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {itens.map(({ filme, quantidade }) => (
                <tr key={filme.id}>
                  <td>{filme.titulo}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => removerUm(filme.id)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{quantidade}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => adicionar(filme)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => remover(filme.id)}>
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={limpar}>
              Limpar Carrinho
            </Button>
            <Link to="/" className="btn btn-primary">
              Continuar comprando
            </Link>
          </div>
        </>
      )}
    </div>
  );
}*/
