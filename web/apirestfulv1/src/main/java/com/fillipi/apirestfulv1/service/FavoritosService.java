package com.fillipi.apirestfulv1.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.*;
import com.fillipi.apirestfulv1.repository.FavoritosRepository;
import com.fillipi.apirestfulv1.repository.ItemFavoritoRepository;

import java.util.Optional;

@Service
public class FavoritosService {

    @Autowired
    private FavoritosRepository favoritosRepository;

    @Autowired
    private ItemFavoritoRepository itemFavoritoRepository;

    @Transactional
    public Favorito buscarOuCriarFavoritoPorUsuarioId(Long usuarioId) {
        return favoritosRepository.findByUsuarioId(usuarioId).orElseGet(() -> {
            Favorito favorito = new Favorito();
            favorito.setUsuarioId(usuarioId);
            return favoritosRepository.save(favorito);
        });
    }

    @Transactional
    public void mesclarFavoritos(Long usuarioId, Favorito favoritoAnonimo) {
        if (favoritoAnonimo == null || favoritoAnonimo.getItens().isEmpty()) {
            return;
        }

        Favorito favoritoSalvo = buscarOuCriarFavoritoPorUsuarioId(usuarioId);

        for (ItemFavorito itemAnonimo : favoritoAnonimo.getItens()) {
            Optional<ItemFavorito> itemExistenteOpt = favoritoSalvo.getItens().stream()
                    .filter(item -> item.getFilme().getId().equals(itemAnonimo.getFilme().getId()))
                    .findFirst();

            if (itemExistenteOpt.isPresent()) {
                ItemFavorito itemExistente = itemExistenteOpt.get();
                itemExistente.setQuantidade(itemExistente.getQuantidade() + itemAnonimo.getQuantidade());
                itemFavoritoRepository.save(itemExistente);
            } else {
                ItemFavorito novoItem = new ItemFavorito();
                novoItem.setFilme(itemAnonimo.getFilme());
                novoItem.setQuantidade(itemAnonimo.getQuantidade());
                novoItem.setFavorito(favoritoSalvo);
                itemFavoritoRepository.save(novoItem);
            }
        }
    }

    @Transactional
    public Favorito adicionarOuAtualizarItem(Long usuarioId, Filme filme, int quantidade) {
        Favorito favorito = buscarOuCriarFavoritoPorUsuarioId(usuarioId);

        Optional<ItemFavorito> itemExistenteOpt = favorito.getItens().stream()
                .filter(item -> item.getFilme().getId().equals(filme.getId()))
                .findFirst();

        if (itemExistenteOpt.isPresent()) {
            ItemFavorito itemExistente = itemExistenteOpt.get();
            itemExistente.setQuantidade(itemExistente.getQuantidade() + quantidade);
            itemFavoritoRepository.save(itemExistente);
        } else {
            ItemFavorito novoItem = new ItemFavorito();
            novoItem.setFilme(filme);
            novoItem.setQuantidade(quantidade);
            novoItem.setFavorito(favorito);
            favorito.getItens().add(novoItem);
            itemFavoritoRepository.save(novoItem);
        }

        return favoritosRepository.findById(favorito.getId()).get();
    }

    @Transactional
    public Favorito removerItem(Long usuarioId, Long itemId) {
        Favorito favorito = buscarOuCriarFavoritoPorUsuarioId(usuarioId);

        boolean foiRemovido = favorito.getItens().removeIf(item -> item.getId().equals(itemId));

        if (!foiRemovido) {
            throw new EntidadeNaoEncontradaException("Item de favorito com ID " + itemId + " não encontrado neste favorito.");
        }

        return favorito;
    }
}
