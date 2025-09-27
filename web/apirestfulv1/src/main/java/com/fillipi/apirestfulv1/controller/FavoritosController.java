package com.fillipi.apirestfulv1.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fillipi.apirestfulv1.DTO.ItemFavoritoDTO;
import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.*;
import com.fillipi.apirestfulv1.repository.FilmeRepository;
import com.fillipi.apirestfulv1.service.AutenticacaoService;
import com.fillipi.apirestfulv1.service.FavoritosService;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/favoritos")
public class FavoritosController {

    @Autowired
    private FavoritosService favoritosService;

    @Autowired
    private AutenticacaoService autenticacaoService;

    @Autowired
    private FilmeRepository filmeRepository; // mudou para FilmeRepository

    private static final String SESSAO_FAVORITO_ANONIMO = "favoritoAnonimo";

    @GetMapping
    public ResponseEntity<Favorito> getFavoritos(HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();

        if (usuarioLogado != null) {
            Favorito favorito = favoritosService.buscarOuCriarFavoritoPorUsuarioId(usuarioLogado.getId());
            return ResponseEntity.ok(favorito);
        } else {
            Favorito favoritoAnonimo = (Favorito) session.getAttribute(SESSAO_FAVORITO_ANONIMO);
            if (favoritoAnonimo == null) {
                favoritoAnonimo = new Favorito();
                session.setAttribute(SESSAO_FAVORITO_ANONIMO, favoritoAnonimo);
            }
            return ResponseEntity.ok(favoritoAnonimo);
        }
    }

    @PostMapping("/itens")
    public ResponseEntity<Favorito> adicionarItem(@RequestBody ItemFavoritoDTO itemDTO, HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();

        Filme filme = filmeRepository.findById(itemDTO.getFilmeId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Filme com ID " + itemDTO.getFilmeId() + " não encontrado."));

        if (usuarioLogado != null) {
            Favorito favoritoAtualizado = favoritosService.adicionarOuAtualizarItem(usuarioLogado.getId(), filme, itemDTO.getQuantidade());
            return ResponseEntity.ok(favoritoAtualizado);
        } else {
            Favorito favoritoAnonimo = (Favorito) session.getAttribute(SESSAO_FAVORITO_ANONIMO);
            if (favoritoAnonimo == null) {
                favoritoAnonimo = new Favorito();
            }

            Optional<ItemFavorito> itemExistenteOpt = favoritoAnonimo.getItens().stream()
                    .filter(item -> item.getFilme().getId().equals(itemDTO.getFilmeId()))
                    .findFirst();

            if (itemExistenteOpt.isPresent()) {
                ItemFavorito item = itemExistenteOpt.get();
                item.setQuantidade(item.getQuantidade() + itemDTO.getQuantidade());
            } else {
                ItemFavorito novoItem = new ItemFavorito();
                novoItem.setFilme(filme);
                novoItem.setQuantidade(itemDTO.getQuantidade());
                favoritoAnonimo.getItens().add(novoItem);
            }

            session.setAttribute(SESSAO_FAVORITO_ANONIMO, favoritoAnonimo);
            return ResponseEntity.ok(favoritoAnonimo);
        }
    }

    @DeleteMapping("/itens/{itemId}")
    public ResponseEntity<Favorito> removerItem(@PathVariable Long itemId, HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();

        if (usuarioLogado != null) {
            Favorito favoritoAtualizado = favoritosService.removerItem(usuarioLogado.getId(), itemId);
            return ResponseEntity.ok(favoritoAtualizado);
        } else {
            Favorito favoritoAnonimo = (Favorito) session.getAttribute(SESSAO_FAVORITO_ANONIMO);
            if (favoritoAnonimo != null) {
                favoritoAnonimo.getItens().removeIf(item -> item.getId().equals(itemId));
                session.setAttribute(SESSAO_FAVORITO_ANONIMO, favoritoAnonimo);
            }
            return ResponseEntity.ok(favoritoAnonimo);
        }
    }
}
