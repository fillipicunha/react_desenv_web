package com.fillipi.apirestfulv1.service;

import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.model.Genero;
import com.fillipi.apirestfulv1.repository.FilmeRepository;
import com.fillipi.apirestfulv1.repository.GeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GeneroService {

    @Autowired
    private GeneroRepository generoRepository;

    @Autowired
    private FilmeRepository filmeRepository;

    public Optional<Genero> recuperarGenero(Long idGenero) {
        return generoRepository.findById(idGenero);
    }

    public Genero recuperarGeneroComFilmes(Long idGenero) {
        return generoRepository.recuperarGeneroComFilmesPorId(idGenero)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Gênero número " + idGenero + " não encontrado"));
    }
}