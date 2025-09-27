package com.fillipi.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ItemFavorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "filme_id") // adaptado de ingresso_id para filme_id
    private Filme filme;

    private int quantidade;

    @ManyToOne
    @JoinColumn(name = "favorito_id")
    @JsonBackReference
    private Favorito favorito;
}