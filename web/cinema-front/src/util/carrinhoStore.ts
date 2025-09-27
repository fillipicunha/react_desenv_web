
import { create } from "zustand";
 
 
import api from "../services/api";
import type ItemCarrinho from "../interfaces/ItemCarrinho";
import type ItemCarrinhoDTO from "../interfaces/ItemCarrinhoDTO";
import type Carrinho from "../interfaces/Carrinho";
import { persist } from "zustand/middleware";
 

interface CarrinhoState {
  carrinho: Carrinho | null;
  fetchCarrinho: () => Promise<void>;
  adicionarItem: (itemDTO: ItemCarrinhoDTO) => Promise<void>;
  removerItem: (itemId: number) => Promise<void>;
  atualizarQuantidadeItem: (item: ItemCarrinho) => Promise<void>;
  limparCarrinho: () => void;
}

 const useCarrinhoStore = create<CarrinhoState>()(
  persist(
    (set) => ({
      carrinho: null,

      fetchCarrinho: async () => {
        try {
          const { data } = await api.get('/carrinho');
          set({ carrinho: data || { itens: [] } });
        } catch (error) {
          console.error("Erro ao buscar o carrinho:", error);
          set({ carrinho: { itens: [] } });
        }
      },

      adicionarItem: async (itemDTO) => {
        try {
          const { data: carrinhoAtualizado } = await api.post('/carrinho/itens', itemDTO);
          set({ carrinho: carrinhoAtualizado });
        } catch (error) {
          console.error("Erro ao adicionar item:", error);
        }
      },

      removerItem: async (itemId) => {
        try {
          const { data: carrinhoAtualizado } = await api.delete(`/carrinho/itens/${itemId}`);
          set({ carrinho: carrinhoAtualizado || { itens: [] } });
        } catch (error) {
          console.error("Erro ao remover item do carrinho:", error);
        }
      },

      atualizarQuantidadeItem: async (itemParaAtualizar) => {
        try {
          const { data: carrinhoAtualizado } = await api.put('/carrinho/itens', itemParaAtualizar);
          set({ carrinho: carrinhoAtualizado });
        } catch (error) {
          console.error("Erro ao atualizar a quantidade do item:", error);
        }
      },

      limparCarrinho: () => {
        set({ carrinho: null });
      }
    }),
    {
      name: "carrinho",  
    }
  )
);

export default useCarrinhoStore;

/*
const useCarrinhoStore = create<CarrinhoState>((set) => ({

  carrinho: null,

  fetchCarrinho: async () => {
    try {
      const { data } = await api.get<Carrinho>('/carrinho');
      set({ carrinho: data || { itens: [] } });
    } catch (error) {
      console.error("Erro ao buscar o carrinho:", error);
      set({ carrinho: { itens: [] } });
    }
  },

  adicionarItem: async (itemDTO: ItemCarrinhoDTO) => {
    try {
      const { data: carrinhoAtualizado } = await api.post<Carrinho>('/carrinho/itens', itemDTO);
      set({ carrinho: carrinhoAtualizado });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  },

  removerItem: async (itemId: number) => {
    try {
      // Faz apenas UMA chamada. A resposta do DELETE já contém o carrinho atualizado.
      const { data: carrinhoAtualizado } = await api.delete<Carrinho>(`/carrinho/itens/${itemId}`);
      
      // Atualiza o estado com os dados recebidos.
      set({ carrinho: carrinhoAtualizado || { itens: [] } });

    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  },
  
  atualizarQuantidadeItem: async (itemParaAtualizar: ItemCarrinho) => {
    try {
        const { data: carrinhoAtualizado } = await api.put<Carrinho>('/carrinho/itens', itemParaAtualizar);
        set({ carrinho: carrinhoAtualizado });
    } catch (error) {
        console.error("Erro ao atualizar a quantidade do item (pode ser estoque insuficiente):", error);
        // Aqui você pode adicionar uma notificação para o usuário
    }
  },

  limparCarrinho: () => {
    set({ carrinho: null });
  }
}));

export default useCarrinhoStore;
*/