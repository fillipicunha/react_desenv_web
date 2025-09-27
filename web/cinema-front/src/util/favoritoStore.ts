
import { create } from "zustand";
import api from "../services/api";
import type ItemFavoritoDTO from "../interfaces/ItemFavoritoDTO";
import type Favorito from "../interfaces/favorito";
 

interface FavoritoState {
  favorito: Favorito | null;
  fetchFavorito: () => Promise<void>;
  adicionarItemFavorito: (itemDTO: ItemFavoritoDTO) => Promise<void>;
  removerItem: (itemId: number) => Promise<void>;
  limparFavorito: () => void;
}

const useFavoritoStore = create<FavoritoState>((set) => ({
  favorito: null,

  fetchFavorito: async () => {
    try {
      const { data } = await api.get<Favorito>('/favoritos');
      set({ favorito: data || { itens: [] } });
    } catch (error) {
      console.error("Erro ao buscar o favorito:", error);
      set({ favorito: { itens: [] } });
    }
  },

  adicionarItemFavorito: async (itemDTO: ItemFavoritoDTO) => {
    try {
      const { data: favoritoAtualizado } = await api.post<Favorito>('/favoritos/itens', itemDTO);
      set({ favorito: favoritoAtualizado });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  },

  removerItem: async (itemId: number) => {
    try {
      // Faz apenas UMA chamada. A resposta do DELETE já contém o carrinho atualizado.
      const { data: favoritoAtualizado } = await api.delete<Favorito>(`/favoritos/itens/${itemId}`);
      
      // Atualiza o estado com os dados recebidos.
      set({ favorito: favoritoAtualizado || { itens: [] } });

    } catch (error) {
      console.error("Erro ao remover item do favorito:", error);
    }
  },

  limparFavorito: () => {
    set({ favorito: null });
  }
}));

export default useFavoritoStore;
