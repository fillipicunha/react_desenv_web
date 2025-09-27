package com.fillipi.apirestfulv1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "filme")
public class Filme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O título deve ser informado.")
    private String titulo;

    @NotEmpty(message = "A sinopse deve ser informada.")
    private String sinopse;

    @NotEmpty(message = "A imagem deve ser informada.")
    private String imagem;

    @NotEmpty(message = "A classificação deve ser informada.")
    private String classificacao;

    @Min(value = 1, message = "A duração deve ser maior que zero.")
    private int duracao; // em minutos

    private boolean emCartaz = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "genero_id")
    @JsonIgnoreProperties("filmes")
    private Genero genero;

    public Filme(String titulo, String sinopse, int duracao, String imagem, String classificacao, Genero genero) {
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.duracao = duracao;
        this.imagem = imagem;
        this.classificacao = classificacao;
        this.genero = genero;
        this.emCartaz = true;
    }
}