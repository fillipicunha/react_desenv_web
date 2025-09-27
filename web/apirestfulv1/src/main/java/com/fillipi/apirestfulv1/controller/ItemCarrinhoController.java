package com.fillipi.apirestfulv1.controller;

import com.fillipi.apirestfulv1.model.ItemCarrinho;
import com.fillipi.apirestfulv1.service.ItemCarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("itens-carrinho")
public class ItemCarrinhoController {

    @Autowired
    private ItemCarrinhoService itemCarrinhoService;
    @GetMapping
    public List<ItemCarrinho> recuperarItens() {
        return itemCarrinhoService.recuperarItens();
    }

    @PostMapping
    public ItemCarrinho adicionarItemAoCarrinho(@RequestBody ItemCarrinho itemCarrinho) {
        return itemCarrinhoService.cadastrarItem(itemCarrinho);
    }

    @PutMapping
    public ResponseEntity<ItemCarrinho> alterarItemDoCarrinho(@RequestBody ItemCarrinho itemCarrinho) {
        ItemCarrinho itemAtualizado = itemCarrinhoService.alterarItemDoCarrinho(itemCarrinho);
        return new ResponseEntity<ItemCarrinho>(itemAtualizado, HttpStatus.OK);
    }

    @DeleteMapping("{idItem}")
    public void removerItemDoCarrinho(@PathVariable("idItem") Long id) {
        itemCarrinhoService.removerItemDoCarrinho(id);
    }
}