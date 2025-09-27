package com.fillipi.apirestfulv1.controller;

import com.fillipi.apirestfulv1.model.ItemFavorito;
import com.fillipi.apirestfulv1.service.ItemFavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("itens-favoritos")
public class ItemFavoritoController {
    @Autowired
    private ItemFavoritoService itemFavoritoService;

    @GetMapping
    public List<ItemFavorito> recuperarItens() {
        return itemFavoritoService.recuperarItens();
    }

    @PostMapping
    public ItemFavorito adicionarItemAoFavorito(@RequestBody ItemFavorito itemFavorito) {
        return itemFavoritoService.cadastrarItem(itemFavorito);
    }

    @PutMapping
    public ResponseEntity<ItemFavorito> alterarItemDoFavorito(@RequestBody ItemFavorito itemFavorito) {
        ItemFavorito itemAtualizado = itemFavoritoService.alterarItemDoFavorito(itemFavorito);
        return new ResponseEntity<ItemFavorito>(itemAtualizado, HttpStatus.OK);
    }

    @DeleteMapping("{idItem}")
    public void removerItemDoFavorito(@PathVariable("idItem") Long id) {
        itemFavoritoService.removerItemDoFavorito(id);
    }
}