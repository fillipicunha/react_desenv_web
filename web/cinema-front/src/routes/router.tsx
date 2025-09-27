import FilmesPage from "../pages/FilmesPage";
import DetalhesFilmesPage from "../pages/DetalhesFilmesPage"; 
import PrivateRoutes from "./PrivateRoutes";
import CadastroPage from "../pages/CadastroPage";
import CardsDeFilmesPage from "../pages/CardsDeFilmesPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import FavoritoPage from "../pages/FavoritoPage";
import FilmesEmBreve from "../pages/FilmesEmBreve";
//import FilmesEmCartaz from "../pages/FilmesEmCartaz";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage";
import { createBrowserRouter } from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
       {
        path: "",
        element: <HomePage />,
      },
      { path: "cadastro-filmes", element: <FilmesPage /> },
      { path: "filmes", element: <CardsDeFilmesPage /> },
      //{ path: "cartaz", element: <FilmesEmCartaz /> },
      { path: "embreve", element: <FilmesEmBreve /> },
      { path: "favoritos", element: <FavoritoPage /> },
      { path: "cadastro", element: <CadastroPage /> },
      { path: "detalhes-filme/:id", element: <DetalhesFilmesPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "carrinho", element: <CarrinhoPage /> },
    ],
  },
]);

export default router;