package com.fillipi.apirestfulv1.DTO;

import com.fillipi.apirestfulv1.model.Filme;

import java.util.List;

public record GeneroDTO(Long id, String nome, List<Filme> lista) {

}