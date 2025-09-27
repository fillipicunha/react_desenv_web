import { create } from "zustand";
import type { Filme } from "../interfaces/Filme";
 

interface FilmeStore {
    pagina: number;
    tamanho: number;
    nome: string;
    campo: string;
    ordem: string;
    filmeSelecionado: Filme;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setCampo: (campo: string) => void;
    setOrdem: (ordem: string) => void;
    setFilmeSelecionado: (filmeSelecionado: Filme) => void;
}

const useFilmeStore = create<FilmeStore>((set) => ({
    pagina: 0,
    tamanho: 6,
    nome: "",
    campo: "",
    ordem: "",
    filmeSelecionado: {} as Filme,

    setPagina: (pagina: number) => set(() => ({ pagina })),
    setTamanho: (tamanho: number) => set(() => ({ tamanho })),
    setNome: (nome: string) => set(() => ({ nome })),
    setCampo: (campo: string) => set(() => ({ campo })),
    setOrdem: (ordem: string) => set(() => ({ ordem })),
    setFilmeSelecionado: (filmeSelecionado: Filme) => set(() => ({ filmeSelecionado })),
}));

export default useFilmeStore;
