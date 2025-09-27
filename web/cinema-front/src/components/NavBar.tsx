
import { NavLink, useNavigate } from 'react-router-dom';
 
import useCarrinhoStore from '../util/carrinhoStore';
import useUsuarioStore from '../util/UsuarioStore';

const NavBar = () => {
  const usuario = useUsuarioStore(state => state.usuario);
  const logout = useUsuarioStore(state => state.logout);
  const navigate = useNavigate();

  const totalItens = useCarrinhoStore(state =>
    state.carrinho?.itens?.reduce((total, item) => total + item.quantidade, 0) || 0
  );
  const limparCarrinho = useCarrinhoStore(state => state.limparCarrinho);

  const handleLogout = async () => {
    await logout();
    limparCarrinho();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white">
      <div className="container">
        <NavLink className="navbar-brand" to='/'><img src={"/public/assets/cinetop.jpg"} className="me-1" width={"100px"} /></NavLink>
        <button
          className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Programação</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/filmes" className="nav-link">Filmes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cadastro-filmes" className="nav-link">Cadastro Filmes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/favoritos" className="nav-link">Lista Favoritos</NavLink>
              </li>
            </ul>
          <div className="d-flex align-items-center">
            {usuario ? (
              <>
                <span className="navbar-text text-white me-3">Olá, {usuario.conta}!</span>
                <button onClick={handleLogout} className="btn btn-outline-danger me-2">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-outline-primary me-2">Login</NavLink>
            )}
            <NavLink className="btn btn-outline-dark text-dark position-relative" to="/carrinho">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              {totalItens > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItens}
                  <span className="visually-hidden">itens no carrinho</span>
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;



/*import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">Cinema</span>
      <div className="collapse navbar-collapse d-flex justify-content-between">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Programação</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cartaz" className="nav-link">Em Cartaz</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/embreve" className="nav-link">Em Breve</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/carrinho" className="nav-link">Carrinho</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/favoritos" className="nav-link">Favoritos</NavLink>
          </li>
          
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
*/