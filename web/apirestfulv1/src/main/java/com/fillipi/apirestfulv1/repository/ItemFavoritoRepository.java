package com.fillipi.apirestfulv1.repository;

import com.fillipi.apirestfulv1.model.Favorito;
import com.fillipi.apirestfulv1.model.ItemFavorito;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;

public interface ItemFavoritoRepository extends JpaRepository<ItemFavorito, Long> {

    List<ItemFavorito> findByFavorito(Favorito favorito);
}