import "../assets/css/Carrinho.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFavoritoStore from "../util/favoritoStore";
 
import useCarrinhoStore from "../util/carrinhoStore";
import type { Filme } from "../interfaces/Filme";

const Favorito = () => {
  const favorito = useFavoritoStore(state => state.favorito);
  const removerItem = useFavoritoStore(state => state.removerItem);
  const fetchFavorito = useFavoritoStore(state => state.fetchFavorito);
   
  const { adicionarItem } = useCarrinhoStore();


  const [mensagem, setMensagem] = useState<string | null>(null);
  
    const mostrarMensagem = (msg: string) => {
      setMensagem(msg);
      setTimeout(() => setMensagem(null), 3000); 
    };
  
  const handleAdicionarAoCarrinho = (filme: Filme) => {
    const itemDTO = {
      filmeId: filme.id!,   
      quantidade: 1,
    };
    adicionarItem(itemDTO);
    mostrarMensagem(`${filme.titulo} foi adicionado ao carrinho!`);
    //alert(`${filme.titulo} foi adicionado ao carrinho!`);
  };

  useEffect(() => {
    fetchFavorito();
  }, [fetchFavorito]);

  if (!favorito || !favorito.itens || favorito.itens.length === 0) {
    return (
      <div className="text-center text-black">
        <h4>Não há favoritos</h4>
        <Link to="/filmes" className="btn btn-primary mt-3">Ver filmes</Link>
      </div>
    );
  }

  return (
    <>

    <div>
      <h2 className="text-white">Meus Favoritos</h2>
      <table className="table table-white table-striped align-middle">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Filme</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {favorito.itens.map((item) => (
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
                <button onClick={() => removerItem(item.id!)} className="btn btn-outline-danger btn-sm me-2">
                  Remover
                </button>
                <button onClick={() => handleAdicionarAoCarrinho(item.filme)} className="btn btn-success btn-sm">
                  Comprar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mb-3">
        <Link to="/filmes" className="btn btn-primary">Continuar Comprando</Link>
      </div>
    </div>

           {mensagem && (
      <div className="alert alert-success fixed-bottom m-3" style={{ zIndex: 1050 }}>
        {mensagem}
      </div>
    )}
    </>


  );
};

export default Favorito;
