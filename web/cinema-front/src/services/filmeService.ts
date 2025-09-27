import axios from 'axios';
import type {Filme} from "../interfaces/Filme";

const API_URL = 'http://localhost:8080/filmes';  

const filmeService = {
  buscarTodos: async (): Promise<Filme[]> => {
    const response = await axios.get<Filme[]>('http://localhost:8080/filmes');
    return response.data;
  },

  buscarEmBreve: async (): Promise<Filme[]> => {
    const response = await axios.get<Filme[]>('http://localhost:8080/filmes?emCartaz=false');
    return response.data;
  },

  buscarEmCartaz: async (): Promise<Filme[]> => {
    const response = await axios.get<Filme[]>('http://localhost:8080/filmes?emCartaz=true');
    return response.data;
  }
};

export default filmeService;
