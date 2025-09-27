package com.fillipi.apirestfulv1.DTO;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UsuarioCadastroDTO {

    @NotEmpty(message = "A 'Conta' deve ser informada.")
    private String conta;

    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String senha;


}