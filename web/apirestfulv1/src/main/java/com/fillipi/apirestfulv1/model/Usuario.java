package com.fillipi.apirestfulv1.model;


import jakarta.persistence.*;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "A 'Conta' deve ser informada.")
    private String conta;

    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String senha;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "usuario_favoritos", // Nome da tabela intermediária
            joinColumns = @JoinColumn(name = "usuario_id"), // FK para Usuario
            inverseJoinColumns = @JoinColumn(name = "filme_id") // FK agora aponta para Filme
    )
    private Set<Filme> filmesFavoritos = new HashSet<>();

    public Usuario(String conta, String senha) {
        this.conta = conta;
        this.senha = senha;
    }
}

/*
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;

    // Getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}*/
