package com.fillipi.apirestfulv1.controller;

import com.fillipi.apirestfulv1.DTO.ItemCarrinhoDTO;
import com.fillipi.apirestfulv1.model.Carrinho;
import com.fillipi.apirestfulv1.model.Filme;
import com.fillipi.apirestfulv1.model.ItemCarrinho;
import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.repository.FilmeRepository;
import com.fillipi.apirestfulv1.service.AutenticacaoService;
import com.fillipi.apirestfulv1.service.CarrinhoService;
import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @Autowired
    private AutenticacaoService autenticacaoService;

    @Autowired
    private FilmeRepository filmeRepository;

    private static final String SESSAO_CARRINHO_ANONIMO = "carrinhoAnonimo";

    @GetMapping
    public ResponseEntity<Carrinho> getCarrinho(HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();

        if (usuarioLogado != null) {
            Carrinho carrinho = carrinhoService.buscarOuCriarCarrinhoPorUsuarioId(usuarioLogado.getId());
            return ResponseEntity.ok(carrinho);
        } else {
            Carrinho carrinhoAnonimo = (Carrinho) session.getAttribute(SESSAO_CARRINHO_ANONIMO);
            if (carrinhoAnonimo == null) {
                carrinhoAnonimo = new Carrinho();
                session.setAttribute(SESSAO_CARRINHO_ANONIMO, carrinhoAnonimo);
            }
            return ResponseEntity.ok(carrinhoAnonimo);
        }
    }

    @PostMapping("/itens")
    public ResponseEntity<Carrinho> adicionarItem(@RequestBody ItemCarrinhoDTO itemDTO, HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();

        Filme filme = filmeRepository.findById(itemDTO.getFilmeId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Filme com ID " + itemDTO.getFilmeId() + " não encontrado."));

        if (usuarioLogado != null) {
            Carrinho carrinhoAtualizado = carrinhoService.adicionarOuAtualizarItem(usuarioLogado.getId(), filme, itemDTO.getQuantidade());
            return ResponseEntity.ok(carrinhoAtualizado);
        } else {
            Carrinho carrinhoAnonimo = (Carrinho) session.getAttribute(SESSAO_CARRINHO_ANONIMO);
            if (carrinhoAnonimo == null) {
                carrinhoAnonimo = new Carrinho();
            }

            Optional<ItemCarrinho> itemExistenteOpt = carrinhoAnonimo.getItens().stream()
                    .filter(item -> item.getFilme().getId().equals(itemDTO.getFilmeId()))
                    .findFirst();

            if (itemExistenteOpt.isPresent()) {
                ItemCarrinho item = itemExistenteOpt.get();
                item.setQuantidade(item.getQuantidade() + itemDTO.getQuantidade());
            } else {
                ItemCarrinho novoItem = new ItemCarrinho();
                novoItem.setFilme(filme);
                novoItem.setQuantidade(itemDTO.getQuantidade());
                carrinhoAnonimo.getItens().add(novoItem);
            }

            session.setAttribute(SESSAO_CARRINHO_ANONIMO, carrinhoAnonimo);
            return ResponseEntity.ok(carrinhoAnonimo);
        }
    }

    @PutMapping("/itens")
    public ResponseEntity<Carrinho> atualizarItem(@RequestBody ItemCarrinho itemParaAtualizar, HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();
        Carrinho carrinhoAtualizado = carrinhoService.atualizarQuantidadeItem(usuarioLogado.getId(), itemParaAtualizar);
        return ResponseEntity.ok(carrinhoAtualizado);
    }

    @DeleteMapping("/itens/{itemId}")
    public ResponseEntity<Carrinho> removerItem(@PathVariable Long itemId, HttpSession session) {
        Usuario usuarioLogado = autenticacaoService.getUsuarioLogado();

        if (usuarioLogado != null) {
            Carrinho carrinhoAtualizado = carrinhoService.removerItem(usuarioLogado.getId(), itemId);
            return ResponseEntity.ok(carrinhoAtualizado);
        } else {
            Carrinho carrinhoAnonimo = (Carrinho) session.getAttribute(SESSAO_CARRINHO_ANONIMO);
            if (carrinhoAnonimo != null) {
                carrinhoAnonimo.getItens().removeIf(item -> item.getId().equals(itemId));
                session.setAttribute(SESSAO_CARRINHO_ANONIMO, carrinhoAnonimo);
            }
            return ResponseEntity.ok(carrinhoAnonimo);
        }
    }
}
