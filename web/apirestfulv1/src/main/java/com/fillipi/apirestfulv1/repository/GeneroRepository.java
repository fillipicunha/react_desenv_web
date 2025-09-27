package com.fillipi.apirestfulv1.repository;

import com.fillipi.apirestfulv1.model.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface GeneroRepository extends JpaRepository<Genero, Long> {

    @Query("select g from Genero g left outer join fetch g.filmes where g.id = :id")
    Optional<Genero> recuperarGeneroComFilmesPorId(@Param("id") long id);
}