import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeFilmes from "../components/TabelaDeFilmes";
import CadastroDeFilmesForm from "../components/CadastroDeFilmes";

const FilmesPage = () => {
  return (
    <>
      <CadastroDeFilmesForm />
      <Pesquisa />
      <TabelaDeFilmes />
      <Paginacao />
    </>
  );
};

export default FilmesPage;
