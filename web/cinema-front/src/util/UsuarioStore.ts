import { create } from "zustand";
 
import api from "../services/api";
import type Usuario from "../interfaces/Usuario";
import useCarrinhoStore from "./carrinhoStore";
 
 

type StatusLogin = 'PENDENTE' | 'LOGADO' | 'DESLOGADO';

interface UsuarioState {
  usuario: Usuario | null;
  status: StatusLogin;
  error?: string;
  login: (usuario: Usuario) => Promise<void>;
  logout: () => Promise<void>;
  verificarStatus: () => Promise<void>;
}

const useUsuarioStore = create<UsuarioState>((set) => ({
  usuario: null,
  status: 'PENDENTE',

  verificarStatus: async () => {
    try {
      const response = await api.get<Usuario>("/auth/status");
      if (response.data && response.data.id) {
        set({ usuario: response.data, status: 'LOGADO' });
        // AVISO: Após verificar o status, busca o carrinho correspondente.
        useCarrinhoStore.getState().fetchCarrinho();
      } else {
        set({ usuario: null, status: 'DESLOGADO' });
        useCarrinhoStore.getState().limparCarrinho();
      }
    } catch (error) {
      set({ usuario: null, status: 'DESLOGADO' });
      useCarrinhoStore.getState().limparCarrinho();
    }
  },

  login: async (usuarioLogin: Usuario) => {
    try {
      const response = await api.post<Usuario>("/auth/login", usuarioLogin);
      if (response.data && response.data.id) {
        set({ usuario: response.data, status: 'LOGADO' });
        // AVISO: Após o login, busca o carrinho mesclado.
        useCarrinhoStore.getState().fetchCarrinho();
      } else {
        throw new Error("Resposta de login inválida.");
      }
    } catch (error) {
      set({ usuario: null, status: 'DESLOGADO' });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
    } catch(error) {
      console.error("Erro no logout:", error);
    } finally {
      set({ usuario: null, status: 'DESLOGADO' });
      // AVISO: Após o logout, limpa o carrinho local.
      useCarrinhoStore.getState().limparCarrinho();
    }
  },
}));

export default useUsuarioStore;

/*import { create } from 'zustand';

interface UsuarioState {
  token: string | null;
  setUsuarioLogado: (token: string) => void;
  logout: () => void;
}

const useUsuarioStore = create<UsuarioState>((set) => ({
  token: null,
  setUsuarioLogado: (token) => set({ token }),
  logout: () => set({ token: null }),
}));

export default useUsuarioStore;*/
