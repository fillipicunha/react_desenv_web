package com.fillipi.apirestfulv1.service;


import com.fillipi.apirestfulv1.model.Carrinho;
import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes; // Import correto



@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarrinhoService carrinhoService;

    public Usuario login(Usuario usuarioLogin) {

        Usuario usuarioDoBanco = usuarioRepository.findByContaAndSenha(
                usuarioLogin.getConta(),
                usuarioLogin.getSenha());

        if (usuarioDoBanco != null) {
            // CORRIGIDO AQUI: ServletRequestAttributes com dois 't'
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            HttpSession session = request.getSession(true);

            Carrinho carrinhoAnonimo = (Carrinho) session.getAttribute("carrinhoAnonimo");
            if (carrinhoAnonimo != null) {
                carrinhoService.mesclarCarrinhos(usuarioDoBanco.getId(), carrinhoAnonimo);
                session.removeAttribute("carrinhoAnonimo");
            }

            Carrinho carrinhoFinal = carrinhoService.buscarOuCriarCarrinhoPorUsuarioId(usuarioDoBanco.getId());
            session.setAttribute("carrinhoLogado", carrinhoFinal);

            usuarioDoBanco.setSenha(null);
            session.setAttribute("usuarioLogado", usuarioDoBanco);

            return usuarioDoBanco;
        }

        return null;
    }

    public void logout() {
        // CORRIGIDO AQUI: ServletRequestAttributes com dois 't'
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    public Usuario getUsuarioLogado() {
        try {
            // CORRIGIDO AQUI: ServletRequestAttributes com dois 't'
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            HttpSession session = request.getSession(false);
            if (session != null) {
                return (Usuario) session.getAttribute("usuarioLogado");
            }
            return null;
        } catch (IllegalStateException e) {
            return null;
        }
    }
}
