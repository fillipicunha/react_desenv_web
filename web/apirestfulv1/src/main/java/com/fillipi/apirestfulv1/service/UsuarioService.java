package com.fillipi.apirestfulv1.service;



import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fillipi.apirestfulv1.DTO.UsuarioCadastroDTO;
import com.fillipi.apirestfulv1.model.Filme;
import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.repository.FilmeRepository;
import com.fillipi.apirestfulv1.repository.UsuarioRepository;

import java.util.Set;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FilmeRepository filmeRepository;

    @Autowired
    private CarrinhoService carrinhoService;

    @Transactional
    public Usuario cadastrar(UsuarioCadastroDTO usuarioDTO) {
        System.out.println("--- LOG: Entrou no método cadastrar ---");

        if (usuarioDTO == null || usuarioDTO.getConta() == null || usuarioDTO.getConta().isEmpty()) {
            System.out.println("--- LOG: Erro fatal - DTO ou nome de usuário nulo/vazio.");
            throw new IllegalArgumentException("Dados de cadastro inválidos.");
        }

        System.out.println("--- LOG: 1. Verificando se o usuário '" + usuarioDTO.getConta() + "' já existe...");
        if (usuarioRepository.findByConta(usuarioDTO.getConta()) != null) {
            System.out.println("--- LOG: Erro - Usuário já encontrado no banco.");
            throw new RuntimeException("Já existe um usuário cadastrado com esta conta.");
        }

        System.out.println("--- LOG: 2. Usuário não existe. Criando nova entidade...");
        Usuario novoUsuario = new Usuario();
        novoUsuario.setConta(usuarioDTO.getConta());
        novoUsuario.setSenha(usuarioDTO.getSenha());

        System.out.println("--- LOG: 3. Tentando salvar o novo usuário no banco...");
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        System.out.println("--- LOG: 4. Usuário salvo com sucesso. ID: " + usuarioSalvo.getId());

        System.out.println("--- LOG: 5. Criando carrinho para o novo usuário...");
        carrinhoService.buscarOuCriarCarrinhoPorUsuarioId(usuarioSalvo.getId());
        System.out.println("--- LOG: 6. Carrinho criado com sucesso.");

        System.out.println("--- LOG: Fim do método cadastrar ---");
        return usuarioSalvo;
    }

    // --- Métodos de Favoritos adaptados para Filme ---
    @Transactional
    public void adicionarFavorito(Long usuarioId, Long filmeId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        Filme filme = filmeRepository.findById(filmeId)
                .orElseThrow(() -> new EntityNotFoundException("Filme não encontrado com ID: " + filmeId));

        usuario.getFilmesFavoritos().add(filme);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void removerFavorito(Long usuarioId, Long filmeId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        Filme filme = filmeRepository.findById(filmeId)
                .orElseThrow(() -> new EntityNotFoundException("Filme não encontrado com ID: " + filmeId));

        usuario.getFilmesFavoritos().remove(filme);
        usuarioRepository.save(usuario);
    }

    public Set<Filme> listarFavoritos(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        // Força a inicialização da coleção
        usuario.getFilmesFavoritos().size();

        return usuario.getFilmesFavoritos();
    }
}


/**
import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    //@Autowired
    //private BCryptPasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(String nome, String email, String senha) throws Exception {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new Exception("Email já cadastrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha); // hash da senha
        return usuarioRepository.save(usuario);
    }


    public Usuario autenticarUsuario(String email, String senha) throws Exception {
        /return usuarioRepository.findByEmail(email)
                .filter(usuario -> usuario.getSenha().equals(senha))
                .orElseThrow(() -> new Exception("Usuário ou senha inválidos")); //
        Optional<Usuario> opt = usuarioRepository.findByEmail(email);
        if (opt.isEmpty()) {
            throw new Exception("Usuário não encontrado");
        }
        Usuario usuario = opt.get();
        System.out.println("Senha do banco: '" + usuario.getSenha() + "', senha recebida: '" + senha + "'");
        if (!usuario.getSenha().equals(senha)) {
            throw new Exception("Senha inválida");
        }
        return usuario;
    }

}
*/