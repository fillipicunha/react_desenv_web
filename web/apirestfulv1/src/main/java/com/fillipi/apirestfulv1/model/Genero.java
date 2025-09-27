package com.fillipi.apirestfulv1.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String slug;

    @OneToMany(mappedBy = "genero", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Filme> filmes = new ArrayList<>();

    public Genero(String nome, String slug) {
        this.nome = nome;
        this.slug = slug;
        this.filmes = new ArrayList<>();
    }
}