package com.fillipi.apirestfulv1.repository;


import com.fillipi.apirestfulv1.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}*/

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * CORRIGIDO: Deve retornar um único Usuario (ou null se não encontrar).
     * Não deve retornar List<Usuario>.
     */
    Usuario findByConta(String conta);

    /**
     * Este método está correto e é usado pelo AutenticacaoService simplificado.
     */
    Usuario findByContaAndSenha(String conta, String senha);
}
