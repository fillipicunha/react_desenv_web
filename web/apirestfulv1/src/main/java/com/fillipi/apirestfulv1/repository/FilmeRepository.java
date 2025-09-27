package com.fillipi.apirestfulv1.repository;

import com.fillipi.apirestfulv1.model.Filme;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface FilmeRepository extends JpaRepository<Filme, Long> {

    List<Filme> findByGeneroId(Long generoId);

    List<Filme> findByEmCartaz(boolean emCartaz);

    @Query("select f from Filme f " +
            "left outer join fetch f.genero " +
            "order by f.id")
    List<Filme> recuperarFilmesComGenero();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select f from Filme f where f.id = :id")
    Optional<Filme> recuperarPorIdComLock(@Param("id") Long id);

    @Query(
            value = "select f from Filme f " +
                    "left outer join fetch f.genero " +
                    "where f.titulo like %:nome% ",
            countQuery = "select count(f) " +
                    "from Filme f " +
                    "where f.titulo like %:nome% "
    )
    Page<Filme> recuperarFilmesComPaginacao(@Param("nome") String nome, Pageable pageable);

    @Query("select f from Filme f " +
            "left outer join fetch f.genero " +
            "where f.id = :id")
    Optional<Filme> recuperarFilmePorId(@Param("id") Long id);

    @Query(
            value = "select f from Filme f " +
                    "left outer join fetch f.genero g " +
                    "where g.slug = :slug " +
                    "order by f.titulo",
            countQuery = "select count(f) " +
                    "from Filme f " +
                    "left outer join f.genero g " +
                    "where g.slug = :slug"
    )
    Page<Filme> recuperarFilmesPaginadosPorSlugDoGenero(@Param("slug") String slug, Pageable pageable);

    @Query("select f from Filme f left outer join fetch f.genero g where g.slug = :slug")
    List<Filme> findByGeneroSlug(@Param("slug") String slug);

    @Query(
            value = "select f from Filme f " +
                    "left outer join fetch f.genero g ",

            countQuery = "select count(f) from Filme f"
            /*
            value = "select f from Filme f " +
                    "left outer join fetch f.genero g " +
                    "order by f.titulo",
            countQuery = "select count(f) from Filme f"*/
    )
    Page<Filme> recuperarFilmesPaginados(Pageable pageable);
}
