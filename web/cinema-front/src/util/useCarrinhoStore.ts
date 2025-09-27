/*import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Filme } from '../interfaces/Filme';

interface ItemCarrinho {
  filme: Filme;
  quantidade: number;
}

interface CarrinhoState {
  itens: ItemCarrinho[];
  adicionar: (filme: Filme) => void;
  remover: (id: number) => void;
  removerUm: (id: number) => void;
  limpar: () => void;
}

export const useCarrinhoStore = create<CarrinhoState>()(
  persist(
    (set, get) => ({
      itens: [],
      adicionar: (filme) =>
        set((state) => {
          const existente = state.itens.find((item) => item.filme.id === filme.id);
          if (existente) {
            return {
              itens: state.itens.map((item) =>
                item.filme.id === filme.id
                  ? { ...item, quantidade: item.quantidade + 1 }
                  : item
              ),
            };
          }
          return { itens: [...state.itens, { filme, quantidade: 1 }] };
        }),
      remover: (id) =>
        set((state) => ({
          itens: state.itens.filter((item) => item.filme.id !== id),
        })),
      removerUm: (id) =>
        set((state) => {
          const item = state.itens.find((item) => item.filme.id === id);
          if (!item) return state;
          if (item.quantidade === 1) {
            return {
              itens: state.itens.filter((item) => item.filme.id !== id),
            };
          }
          return {
            itens: state.itens.map((item) =>
              item.filme.id === id
                ? { ...item, quantidade: item.quantidade - 1 }
                : item
            ),
          };
        }),
      limpar: () => set({ itens: [] }),
    }),
    {
      name: 'carrinho-filmes',  
    }
  )
);
*/

/*
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type ItemCarrinhoDTO from "../interfaces/ItemCarrinhoDTO";

interface CarrinhoState {
  carrinho: ItemCarrinhoDTO[];
  adicionarItem: (item: ItemCarrinhoDTO) => void;
}

const useCarrinhoStore = create<CarrinhoState>()(
  persist(
    (set) => ({
      carrinho: [],
      adicionarItem: (item) =>
        set((state) => ({
          carrinho: [...state.carrinho, item],
        })),
    }),
    {
      name: "carrinho",  
    }
  )
);

export default useCarrinhoStore;*/