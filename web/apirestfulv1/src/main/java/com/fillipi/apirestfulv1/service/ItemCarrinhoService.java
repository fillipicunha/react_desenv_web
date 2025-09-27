package com.fillipi.apirestfulv1.service;

import com.fillipi.apirestfulv1.exception.EntidadeDestacadaException;
import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.Carrinho;
import com.fillipi.apirestfulv1.model.Favorito;
import com.fillipi.apirestfulv1.model.ItemCarrinho;
import com.fillipi.apirestfulv1.model.ItemFavorito;
import com.fillipi.apirestfulv1.repository.CarrinhoRepository;
import com.fillipi.apirestfulv1.repository.FavoritosRepository;
import com.fillipi.apirestfulv1.repository.ItemCarrinhoRepository;
import com.fillipi.apirestfulv1.repository.ItemFavoritoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ItemCarrinhoService {

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    public List<ItemCarrinho> recuperarItens(){
        Optional<Carrinho> carrinhoOpt = carrinhoRepository.findById(1L);
        if (carrinhoOpt.isEmpty()) {
            throw new EntidadeNaoEncontradaException("Carrinho não encontrado.");
        }
        Carrinho carrinho = carrinhoOpt.get();
        return itemCarrinhoRepository.findByCarrinho(carrinho);
    }
    public ItemCarrinho cadastrarItem(ItemCarrinho itemCarrinho) {
        if (itemCarrinho.getId() == null) {
            return itemCarrinhoRepository.save(itemCarrinho);
        }
        else {
            throw new EntidadeDestacadaException(
                    "Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public ItemCarrinho alterarItemDoCarrinho(ItemCarrinho itemCarrinho) {
        if (itemCarrinho.getId() == null) {
            throw new EntidadeNaoEncontradaException("Item do carrinho não encontrado.");
        }
        itemCarrinhoRepository.findById(itemCarrinho.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Item do carrinho não encontrado."));
        return itemCarrinhoRepository.save(itemCarrinho);
    }

    @Transactional
    public void removerItemDoCarrinho(Long id) {
        ItemCarrinho item = itemCarrinhoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Item do carrinho não encontrado."));
        itemCarrinhoRepository.delete(item);
    }
}