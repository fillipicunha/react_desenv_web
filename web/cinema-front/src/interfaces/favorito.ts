import type ItemFavorito from "./ItemFavorito";


 
export default interface Favorito {
    id?: number;
    usuarioId?: number;
    itens: ItemFavorito[];
}