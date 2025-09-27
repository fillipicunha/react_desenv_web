package com.fillipi.apirestfulv1.service;

import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.Carrinho;
import com.fillipi.apirestfulv1.model.Filme;
import com.fillipi.apirestfulv1.model.ItemCarrinho;
import com.fillipi.apirestfulv1.repository.CarrinhoRepository;
import com.fillipi.apirestfulv1.repository.FilmeRepository;
import com.fillipi.apirestfulv1.repository.ItemCarrinhoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private FilmeRepository filmeRepository;

    @Transactional
    public Carrinho buscarOuCriarCarrinhoPorUsuarioId(Long usuarioId) {
        return carrinhoRepository.findByUsuarioId(usuarioId).orElseGet(() -> {
            Carrinho novoCarrinho = new Carrinho();
            novoCarrinho.setUsuarioId(usuarioId);
            return carrinhoRepository.save(novoCarrinho);
        });
    }

    @Transactional
    public Carrinho atualizarQuantidadeItem(Long usuarioId, ItemCarrinho itemParaAtualizar) {
        Carrinho carrinho = buscarOuCriarCarrinhoPorUsuarioId(usuarioId);
        ItemCarrinho itemNoCarrinho = carrinho.getItens().stream()
                .filter(item -> item.getId().equals(itemParaAtualizar.getId()))
                .findFirst()
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Item com ID " + itemParaAtualizar.getId() + " não pertence a este carrinho."));

        Filme filme = filmeRepository.findById(itemNoCarrinho.getFilme().getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Filme associado não encontrado."));

        int novaQuantidade = itemParaAtualizar.getQuantidade();

        /*if (novaQuantidade > filme.getQtdEstoque()) {
            throw new EstoqueInsuficienteException("Estoque insuficiente. Disponível: " + filme.getQtdEstoque());
        }*/

        if (novaQuantidade <= 0) {
            carrinho.getItens().remove(itemNoCarrinho);
        } else {
            itemNoCarrinho.setQuantidade(novaQuantidade);
        }
        return carrinhoRepository.save(carrinho);
    }

    @Transactional
    public void mesclarCarrinhos(Long usuarioId, Carrinho carrinhoAnonimo) {
        if (carrinhoAnonimo == null || carrinhoAnonimo.getItens().isEmpty()) {
            return;
        }

        Carrinho carrinhoSalvo = buscarOuCriarCarrinhoPorUsuarioId(usuarioId);

        for (ItemCarrinho itemAnonimo : carrinhoAnonimo.getItens()) {
            Optional<ItemCarrinho> itemExistenteOpt = carrinhoSalvo.getItens().stream()
                    .filter(item -> item.getFilme().getId().equals(itemAnonimo.getFilme().getId()))
                    .findFirst();

            if (itemExistenteOpt.isPresent()) {
                ItemCarrinho itemExistente = itemExistenteOpt.get();
                itemExistente.setQuantidade(itemExistente.getQuantidade() + itemAnonimo.getQuantidade());
                itemCarrinhoRepository.save(itemExistente);
            } else {
                ItemCarrinho novoItem = new ItemCarrinho();
                novoItem.setFilme(itemAnonimo.getFilme());
                novoItem.setQuantidade(itemAnonimo.getQuantidade());
                novoItem.setCarrinho(carrinhoSalvo);
                itemCarrinhoRepository.save(novoItem);
            }
        }
    }

    @Transactional
    public Carrinho adicionarOuAtualizarItem(Long usuarioId, Filme filme, int quantidade) {
        Carrinho carrinho = buscarOuCriarCarrinhoPorUsuarioId(usuarioId);

        Optional<ItemCarrinho> itemExistenteOpt = carrinho.getItens().stream()
                .filter(item -> item.getFilme().getId().equals(filme.getId()))
                .findFirst();

        if (itemExistenteOpt.isPresent()) {
            ItemCarrinho itemExistente = itemExistenteOpt.get();
            itemExistente.setQuantidade(itemExistente.getQuantidade() + quantidade);
            itemCarrinhoRepository.save(itemExistente);
        } else {
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setFilme(filme);
            novoItem.setQuantidade(quantidade);
            novoItem.setCarrinho(carrinho);
            carrinho.getItens().add(novoItem);
            itemCarrinhoRepository.save(novoItem);
        }

        return carrinhoRepository.findById(carrinho.getId()).get();
    }

    @Transactional
    public Carrinho removerItem(Long usuarioId, Long itemId) {
        Carrinho carrinho = buscarOuCriarCarrinhoPorUsuarioId(usuarioId);

        boolean foiRemovido = carrinho.getItens().removeIf(item -> item.getId().equals(itemId));

        if (!foiRemovido) {
            throw new EntidadeNaoEncontradaException("Item de carrinho com ID " + itemId + " não encontrado neste carrinho.");
        }

        return carrinho;
    }
}
