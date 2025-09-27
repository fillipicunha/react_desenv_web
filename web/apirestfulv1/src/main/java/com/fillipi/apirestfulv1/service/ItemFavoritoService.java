package com.fillipi.apirestfulv1.service;

import com.fillipi.apirestfulv1.exception.EntidadeDestacadaException;
import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.Favorito;
import com.fillipi.apirestfulv1.model.ItemFavorito;
import com.fillipi.apirestfulv1.repository.FavoritosRepository;
import com.fillipi.apirestfulv1.repository.ItemFavoritoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;

@Service
public class ItemFavoritoService {

    @Autowired
    private ItemFavoritoRepository itemFavoritoRepository;

    @Autowired
    private FavoritosRepository favoritosRepository;

    public List<ItemFavorito> recuperarItens(){
        Optional<Favorito> favoritoOpt = favoritosRepository.findById(1L);
        if (favoritoOpt.isEmpty()) {
            throw new EntidadeNaoEncontradaException("Favoritos não encontrado.");
        }
        Favorito favorito = favoritoOpt.get();
        return itemFavoritoRepository.findByFavorito(favorito);
    }

    public ItemFavorito cadastrarItem(ItemFavorito itemFavorito) {
        if (itemFavorito.getId() == null) {
            return itemFavoritoRepository.save(itemFavorito);
        }
        else {
            throw new EntidadeDestacadaException(
                    "Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public ItemFavorito alterarItemDoFavorito(ItemFavorito itemFavorito) {
        if (itemFavorito.getId() == null) {
            throw new EntidadeNaoEncontradaException("Item do favorito não encontrado.");
        }
        itemFavoritoRepository.findById(itemFavorito.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Item do favorito não encontrado."));
        return itemFavoritoRepository.save(itemFavorito);
    }

    @Transactional
    public void removerItemDoFavorito(Long id) {
        ItemFavorito item = itemFavoritoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Item do favorito não encontrado."));
        itemFavoritoRepository.delete(item);
    }
}