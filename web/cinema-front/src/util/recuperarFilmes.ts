/*import type {Genero} from "../interfaces/Genero";
import type {Filme} from "../interfaces/Filme";

const acao: Genero = { id: 1, nome: "Ação", slug: "acao" };
const comedia: Genero = { id: 2, nome: "Comédia", slug: "comedia" };
const drama: Genero = { id: 3, nome: "Drama", slug: "drama" };

const filmes: Filme[] = [
  {
    id: 1,
    imagem: "/filmes/matrix.jpg",
    genero: acao,
    nome: "Matrix",
    slug: "matrix",
    sinopse: "Um programador descobre a verdade sobre a realidade.",
    emCartaz: true,
    dataLancamento: new Date(1999, 2, 31),
    duracao: 136,
  },
  {
    id: 2,
    imagem: "/filmes/clubedaluta.jpg",
    genero: drama,
    nome: "Clube da Luta",
    slug: "clube-da-luta",
    sinopse: "Um homem forma um clube de lutas clandestinas.",
    emCartaz: false,
    dataLancamento: new Date(1999, 9, 15),
    duracao: 139,
  },
];

const recuperarFilmes = () => {
  return new Promise<Filme[]>((resolve) => {
    setTimeout(() => resolve(filmes), 2000);
  });
};

export default recuperarFilmes;
*/