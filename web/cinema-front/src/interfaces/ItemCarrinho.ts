import type { Filme } from "./Filme";
 

// A referência para o carrinho foi removida, pois não é necessária no item.
export default interface ItemCarrinho {
    id?: number;
    filme: Filme;
    quantidade: number;
}