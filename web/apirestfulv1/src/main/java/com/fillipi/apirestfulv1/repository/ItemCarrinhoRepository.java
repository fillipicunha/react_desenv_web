package com.fillipi.apirestfulv1.repository;

import com.fillipi.apirestfulv1.model.Carrinho;
import com.fillipi.apirestfulv1.model.ItemCarrinho;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;


public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    List<ItemCarrinho> findByCarrinho(Carrinho carrinho);
}