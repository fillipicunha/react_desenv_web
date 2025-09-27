package com.fillipi.apirestfulv1.DTO;

import lombok.Data;

/**
 * Data Transfer Object (DTO) para representar a adição de um item ao carrinho.
 * Define um contrato claro e seguro para a API, recebendo apenas as informações essenciais.
 */
@Data

public class ItemCarrinhoDTO {
    private Long filmeId;
    private int quantidade;

}