import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import type {Filme} from "../interfaces/Filme";

const useRecuperarFilmesEmCartaz = () => {
  return useQuery<Filme[]>({
    queryKey: ["filmesEmCartaz"],
    queryFn: async () => {
      const response = await api.get("/filmes/em-cartaz");
      return response.data;
    }
  });
};
export default useRecuperarFilmesEmCartaz;
