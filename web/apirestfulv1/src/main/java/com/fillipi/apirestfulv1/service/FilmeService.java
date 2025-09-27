package com.fillipi.apirestfulv1.service;

import com.fillipi.apirestfulv1.exception.EntidadeDestacadaException;
import com.fillipi.apirestfulv1.exception.EntidadeNaoEncontradaException;
import com.fillipi.apirestfulv1.exception.EntidadeTransienteException;
import com.fillipi.apirestfulv1.model.Filme;
import com.fillipi.apirestfulv1.repository.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository filmeRepository;

    public List<Filme> recuperarFilmes() {
        return filmeRepository.findAll(Sort.by("id"));
    }

    public Filme cadastrarFilme(Filme filme) {
        if (filme.getId() == null) {
            return filmeRepository.save(filme);
        } else {
            throw new EntidadeDestacadaException(
                    "Tentando cadastrar um objeto destacado.");
        }
    }

    @Transactional
    public Filme alterarFilme(Filme filme) {
        if (filme.getId() == null) {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        } else {
            filmeRepository.recuperarPorIdComLock(filme.getId())
                    .orElseThrow(() -> new EntidadeNaoEncontradaException(
                            "Filme número " + filme.getId() + " não encontrado."));
            return filmeRepository.save(filme);
        }
    }

    public Optional<Filme> recuperarFilmePorId(Long id){
        return filmeRepository.recuperarFilmePorId(id);
    }

    public void removerFilme(Long id) {
        Filme f = filmeRepository.recuperarFilmePorId(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Filme número " + id + " não encontrado."));
        filmeRepository.delete(f);
    }

    public List<Filme> recuperarFilmesPorIdDoGenero(Long idGenero) {
        return filmeRepository.findByGeneroId(idGenero);
    }

    public List<Filme> recuperarFilmesComGenero() {
        return filmeRepository.recuperarFilmesComGenero();
    }

    public Page<Filme> recuperarFilmesComPaginacao(String nome, Pageable pageable) {
        return filmeRepository.recuperarFilmesComPaginacao(nome, pageable);
    }

    public List<Filme> recuperarFilmesPorSlugDoGenero(String slug) {
        return filmeRepository.findByGeneroSlug(slug);
    }

    public Page<Filme> recuperarFilmesPaginadosPorSlugDoGenero(String slug, Pageable pageable) {
        if (!slug.isEmpty()) {
            return filmeRepository.recuperarFilmesPaginadosPorSlugDoGenero(slug, pageable);
        } else {
            return filmeRepository.recuperarFilmesPaginados(pageable);
        }
    }
}


/*
@Service
public class FilmeService {
    @Autowired
    private FilmeRepository filmeRepository;

    public List<Filme> listarTodos() {
        System.out.println("Chamando listarTodos()");
        return filmeRepository.findAll();
    }

    public List<Filme> listarPorGenero(Long generoId) {
        return filmeRepository.findByGeneroId(generoId);
    }

    public Filme buscarPorId(Long id) {
        return filmeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filme não encontrado"));
    }

    public Filme salvar(Filme filme) {
        return filmeRepository.save(filme);
    }

    public void deletar(Long id) {
        filmeRepository.deleteById(id);
    }

    public Filme atualizar(Long id, Filme dados) {
        Filme existente = filmeRepository.findById(id).orElseThrow(() -> new RuntimeException("Filme não encontrado"));
        existente.setTitulo(dados.getTitulo());
        existente.setDuracao(dados.getDuracao());
        existente.setSinopse(dados.getSinopse());
        existente.setGenero(dados.getGenero());
        existente.setImagem(dados.getImagem());
        existente.setEmCartaz(dados.isEmCartaz()); // importante atualizar o emCartaz também
        existente.setClassificacao(dados.getClassificacao()); // se necessário
        return filmeRepository.save(existente);
    }

    // NOVO: buscar por emCartaz
    public List<Filme> listarPorEmCartaz(boolean emCartaz) {
        return filmeRepository.findByEmCartaz(emCartaz);
    }
}
*/