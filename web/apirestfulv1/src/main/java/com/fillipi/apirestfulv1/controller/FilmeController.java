package com.fillipi.apirestfulv1.controller;

import com.fillipi.apirestfulv1.model.Filme;
import com.fillipi.apirestfulv1.model.ResultadoPaginado;
import com.fillipi.apirestfulv1.service.FilmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/filmes")
@CrossOrigin("http://localhost:5173")


public class FilmeController {

    @Autowired
    private FilmeService filmeService;

    @GetMapping   // http://localhost:8080/filmes
    public List<Filme> recuperarFilmes() {
        return filmeService.recuperarFilmes();
    }

    @PostMapping
    public Filme cadastrarFilme(@RequestBody Filme filme) {
        return filmeService.cadastrarFilme(filme);
    }

    @PutMapping
    public ResponseEntity<Filme> alterarFilme(@RequestBody Filme filme) {
        Filme umFilme = filmeService.alterarFilme(filme);
        return new ResponseEntity<Filme>(umFilme, HttpStatus.OK);
    }

    @GetMapping("{idFilme}")     // http://localhost:8080/filmes/1
    public Optional<Filme> recuperarFilmePorId(@PathVariable("idFilme") Long id) {
        return filmeService.recuperarFilmePorId(id);
    }

    @DeleteMapping("{idFilme}")     // http://localhost:8080/filmes/1
    public void removerFilme(@PathVariable("idFilme") Long id) {
        filmeService.removerFilme(id);
    }

    @GetMapping("genero/{idGenero}")             // http://localhost:8080/filmes/genero/1
    public List<Filme> recuperarFilmesPorIdDoGenero(@PathVariable("idGenero") Long idGenero) {
        return filmeService.recuperarFilmesPorIdDoGenero(idGenero);
    }

    @GetMapping("slugGenero/{slug}")
    public List<Filme> recuperarFilmesPorSlugDoGenero(@PathVariable("slug") String slug) {
        return filmeService.recuperarFilmesPorSlugDoGenero(slug);
    }

    @GetMapping("generos")    // http://localhost:8080/filmes/generos
    public List<Filme> recuperarFilmesComGenero() {
        return filmeService.recuperarFilmesComGenero();
    }

    @GetMapping("paginacao")
    public ResultadoPaginado<Filme> recuperarFilmesComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome,
            @RequestParam(value = "campo", defaultValue = "id") String campo,
            @RequestParam(value = "ordem", defaultValue = "asc") String ordem) {
        Sort sort;
        if (ordem.equals("asc")) {
            sort = Sort.by(Sort.Direction.ASC, campo);
        } else {
            sort = Sort.by(Sort.Direction.DESC, campo);
        }
        Pageable pageable = PageRequest.of(pagina, tamanho, sort);
        Page<Filme> page = filmeService.recuperarFilmesComPaginacao(nome, pageable);
        ResultadoPaginado<Filme> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    @GetMapping("genero/paginacao")
    public ResultadoPaginado<Filme> recuperarFilmesPaginadosPorSlugDoGenero(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "slug", defaultValue = "") String slug) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Filme> page = filmeService.recuperarFilmesPaginadosPorSlugDoGenero(slug, pageable);
        ResultadoPaginado<Filme> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }
}


/*
public class FilmeController {

    @Autowired
    private FilmeService filmeService;

    // GET /filmes?emCartaz=true ou false
    @GetMapping
    public List<Filme> listarFilmes(@RequestParam(required = false) Boolean emCartaz) {
        if (emCartaz != null) {
            return filmeService.listarPorEmCartaz(emCartaz);
        } else {
            return filmeService.listarTodos();
        }
    }

    @GetMapping("/genero/{id}")
    public List<Filme> listarPorGenero(@PathVariable Long id) {
        return filmeService.listarPorGenero(id);
    }

    @PostMapping
    public Filme criar(@RequestBody Filme filme) {
        return filmeService.salvar(filme);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        filmeService.deletar(id);
    }

    @GetMapping("/{id}")
    public Filme buscarPorId(@PathVariable Long id) {
        return filmeService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Filme atualizar(@PathVariable Long id, @RequestBody Filme filme) {
        return filmeService.atualizar(id, filme);
    }

    // Opcional - endpoints para em-cartaz e em-breve para facilitar chamadas específicas

    @GetMapping("/em-cartaz")
    public List<Filme> listarEmCartaz() {
        return filmeService.listarPorEmCartaz(true);
    }

    @GetMapping("/em-breve")
    public List<Filme> listarEmBreve() {
        return filmeService.listarPorEmCartaz(false);
    }
}
*/