package com.fillipi.apirestfulv1.repository;

import com.fillipi.apirestfulv1.model.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    /**
     * Encontra um carrinho de compras com base no ID do usuário associado a ele.
     * @param usuarioId O ID do usuário.
     * @return Um Optional contendo o Carrinho se encontrado, ou vazio caso contrário.
     */
    Optional<Carrinho> findByUsuarioId(Long usuarioId);
}