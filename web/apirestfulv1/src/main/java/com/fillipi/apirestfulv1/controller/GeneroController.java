package com.fillipi.apirestfulv1.controller;


import com.fillipi.apirestfulv1.DTO.GeneroDTO;
import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.Genero;
import com.fillipi.apirestfulv1.service.GeneroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/generos")
public class GeneroController {

    @Autowired
    private GeneroService generoService;

    @GetMapping("/{idGenero}")
    public Genero recuperarGenero(@PathVariable("idGenero") Long idGenero) {
        return generoService.recuperarGenero(idGenero)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Gênero número " + idGenero + " não encontrado"));
    }

    @GetMapping("/{idGenero}/filmes")          // http://localhost:8080/generos/1/filmes
    public GeneroDTO recuperarGeneroComFilmes(@PathVariable("idGenero") Long idGenero) {
        Genero genero = generoService.recuperarGeneroComFilmes(idGenero);
        return new GeneroDTO(genero.getId(), genero.getNome(), genero.getFilmes());
    }
}
