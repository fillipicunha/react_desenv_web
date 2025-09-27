import type ItemCarrinho from "./ItemCarrinho";

 

// A interface agora contém a lista de itens, que é essencial.
export default interface Carrinho {
    id?: number;
    usuarioId?: number;
    itens: ItemCarrinho[];
}