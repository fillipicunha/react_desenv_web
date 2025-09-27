import { create } from "zustand";
import type { Filme } from "../interfaces/Filme";
 

interface FilmeSelStore {
  filmeSelecionado: Filme;
  setFilmeSelecionado: (filmeSelecionado: Filme) => void;
}

const useFilmeSelStore = create<FilmeSelStore>((set) => ({
  filmeSelecionado: {} as Filme,
  setFilmeSelecionado: (filme: Filme) => set({ filmeSelecionado: filme }),
}));

export default useFilmeSelStore;