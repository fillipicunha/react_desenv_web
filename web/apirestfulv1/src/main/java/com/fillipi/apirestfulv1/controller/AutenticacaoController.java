package com.fillipi.apirestfulv1.controller;

/*
import com.fillipi.apirestfulv1.service.UsuarioService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AutenticacaoController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
        try {
            usuarioService.registrarUsuario(request.getNome(), request.getEmail(), request.getSenha());
            return ResponseEntity.ok("Usuário registrado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Data
    static class RegistroRequest {
        private String nome;
        private String email;
        private String senha;
    }
}*/

import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.service.AutenticacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = autenticacaoService.login(usuario);
        if (usuarioLogado != null) {
            return ResponseEntity.ok(usuarioLogado);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Conta ou senha inválidas.");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        autenticacaoService.logout();
        return ResponseEntity.ok("Logout realizado com sucesso.");
    }

    // ADICIONADO: Endpoint para verificar o status da sessão
    @GetMapping("/status")
    public ResponseEntity<Usuario> getStatusSessao() {
        Usuario usuario = autenticacaoService.getUsuarioLogado();
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        }
        // Se não houver usuário logado, retorna um corpo vazio (o front-end saberá que não há ninguém logado)
        return ResponseEntity.noContent().build();
    }
}

