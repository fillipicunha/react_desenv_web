/*import { create } from 'zustand';
import type { Filme } from '../interfaces/Filme';

interface FavoritosState {
  favoritos: Filme[];
  adicionarFavorito: (filme: Filme) => void;
  removerFavorito: (filmeId: number) => void;
  estaFavorito: (filmeId: number) => boolean;
}

export const useFavoritosStore = create<FavoritosState>((set, get) => ({
  favoritos: [],

  adicionarFavorito: (filme: Filme) => {
    const { favoritos } = get();
    if (!favoritos.find((f: Filme) => f.id === filme.id)) {
      set({ favoritos: [...favoritos, filme] });
    }
  },

  removerFavorito: (filmeId: number) => {
    set({
      favoritos: get().favoritos.filter((f: Filme) => f.id !== filmeId)
    });
  },

  estaFavorito: (filmeId: number) => {
    return get().favoritos.some((f: Filme) => f.id === filmeId);
  }
}));
*/