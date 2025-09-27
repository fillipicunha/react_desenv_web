package com.fillipi.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", unique = true, nullable = true)
    private Long usuarioId;

    // Adicione @JsonManagedReference aqui
    @OneToMany(mappedBy = "favorito", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference // <-- ANOTAÇÃO A SER ADICIONADA
    private List<ItemFavorito> itens = new ArrayList<>();
}


/*
import jakarta.persistence.*;
import lombok.Setter;

@Entity
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Filme favorito
    @Setter
    @ManyToOne
    private Filme filme;

    // Usuário dono do favorito
    @Setter
    @ManyToOne
    private Usuario usuario;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public Filme getFilme() {
        return filme;
    }

    public Usuario getUsuario() {
        return usuario;
    }

}*/

