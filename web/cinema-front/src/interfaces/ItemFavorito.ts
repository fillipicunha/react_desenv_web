import type { Filme } from "./Filme";
 

 
export default interface ItemFavorito {
    id?: number;
    filme: Filme;
    quantidade: number;
}