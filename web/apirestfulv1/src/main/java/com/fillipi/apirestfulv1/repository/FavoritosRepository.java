package com.fillipi.apirestfulv1.repository;

import com.fillipi.apirestfulv1.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import java.util.Optional;

@Repository
public interface FavoritosRepository extends JpaRepository<Favorito, Long> {

    Optional<Favorito> findByUsuarioId(Long usuarioId);
}