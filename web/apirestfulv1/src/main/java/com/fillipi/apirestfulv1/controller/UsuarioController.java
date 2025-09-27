package com.fillipi.apirestfulv1.controller;

import com.fillipi.apirestfulv1.DTO.LoginDTO;
import com.fillipi.apirestfulv1.DTO.UsuarioCadastroDTO;
import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.repository.UsuarioRepository;
import com.fillipi.apirestfulv1.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@CrossOrigin("http://localhost:5173")

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody UsuarioCadastroDTO dto) {
        try {
            Usuario novoUsuario = usuarioService.cadastrar(dto);
            novoUsuario.setSenha(null); // Nunca retorne a senha
            return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Já existe um usuário")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado no servidor.");
        }
    }

    // --- Endpoints de Favoritos com Filmes ---

    @PostMapping("/{usuarioId}/favoritos/{filmeId}")
    public ResponseEntity<?> adicionarFavorito(@PathVariable Long usuarioId, @PathVariable Long filmeId) {
        try {
            usuarioService.adicionarFavorito(usuarioId, filmeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{usuarioId}/favoritos/{filmeId}")
    public ResponseEntity<?> removerFavorito(@PathVariable Long usuarioId, @PathVariable Long filmeId) {
        try {
            usuarioService.removerFavorito(usuarioId, filmeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{usuarioId}/favoritos")
    public ResponseEntity<?> listarFavoritos(@PathVariable Long usuarioId) {
        try {
            return ResponseEntity.ok(usuarioService.listarFavoritos(usuarioId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}


/*

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /*@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(login.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(login.getSenha())) {
                return ResponseEntity.ok(usuario); // retorna o usuário autenticado
            }
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }

    @PostMapping("/login")
    /*public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        try {
            Usuario usuario = usuarioService.autenticarUsuario(login.getEmail(), login.getSenha());
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }


    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        System.out.println("Login recebido: email=" + login.getEmail() + ", senha=" + login.getSenha());
        try {
            Usuario usuario = usuarioService.autenticarUsuario(login.getEmail(), login.getSenha());
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }




    @PostMapping("/cadastrar")
    /*public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }
        Usuario novoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(novoUsuario);
    }

    //@PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.registrarUsuario(
                    usuario.getNome(), usuario.getEmail(), usuario.getSenha()
            );
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}*/
