import type { Genero } from "./Genero";

export interface Filme {
  id?: number;
  imagem: string;
  genero: Genero;
  titulo: string;
  slug?: string;
  sinopse: string;
  classificacao: string;
  emCartaz: boolean;
  //dataLancamento: Date;
  duracao: number;
}