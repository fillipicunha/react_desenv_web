import useCarrinhoStore from "../util/carrinhoStore";
import "../assets/css/Carrinho.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Carrinho = () => {
  const carrinho = useCarrinhoStore(state => state.carrinho);
  const removerItem = useCarrinhoStore(state => state.removerItem);
  const fetchCarrinho = useCarrinhoStore(state => state.fetchCarrinho);
  const atualizarQuantidadeItem = useCarrinhoStore(state => state.atualizarQuantidadeItem);

  useEffect(() => {
    fetchCarrinho();
  }, [fetchCarrinho]);

  if (!carrinho || !carrinho.itens || carrinho.itens.length === 0) {
    return (
      <div className="text-center text-white">
        <h4>Seu carrinho está vazio.</h4>
        <Link to="/filmes" className="btn btn-primary mt-3">Ver filmes</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-white">Meu Carrinho</h2>
      <table className="table table-white table-striped align-middle">
        <thead>
          <tr>
            <th style={{ width: '60%' }}>Filme</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.itens.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.filme.imagem}
                    alt={item.filme.titulo}
                    style={{ width: "60px", height: "auto", marginRight: '15px', borderRadius: '4px' }}
                  />
                  <div>
                    <Link to={`/detalhes-filme/${item.filme.id}`}>{item.filme.titulo}</Link>
                    <p className="text small mb-0">{item.filme.sinopse}</p>
                  </div>
                </div>
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantidade}
                  min="1"
                  onChange={(e) => {
                    const novaQuantidade = parseInt(e.target.value, 10);
                    if (isNaN(novaQuantidade)) return;
                    const itemAtualizado = { ...item, quantidade: novaQuantidade };
                    atualizarQuantidadeItem(itemAtualizado);
                  }}
                  style={{ width: "60px" }}
                />
              </td>
              <td>
                <button onClick={() => removerItem(item.id!)} className="btn btn-outline-danger btn-sm">
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mb-3">
        <Link to="/filmes" className="btn btn-primary">Continuar Comprando</Link>
        <button className="btn btn-success">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Carrinho;
