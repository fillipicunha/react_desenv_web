package com.fillipi.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference; // <-- IMPORTAR
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
public class Carrinho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", unique = true, nullable = true)
    private Long usuarioId;

    // Adicione @JsonManagedReference aqui
    @OneToMany(mappedBy = "carrinho", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference // <-- ANOTAÇÃO A SER ADICIONADA
    private List<ItemCarrinho> itens = new ArrayList<>();

}