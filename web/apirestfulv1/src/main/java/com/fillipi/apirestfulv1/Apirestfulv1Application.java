package com.fillipi.apirestfulv1;


import com.fillipi.apirestfulv1.model.Carrinho;
import com.fillipi.apirestfulv1.model.Genero;
import com.fillipi.apirestfulv1.model.Filme;
import com.fillipi.apirestfulv1.model.Usuario;
import com.fillipi.apirestfulv1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Apirestfulv1Application {

	@Autowired
	private CarrinhoRepository carrinhoRepository;
	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private ItemCarrinhoRepository itemCarrinhoRepository;

	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	//@Override
	public void run(String... args) throws Exception {

		Usuario usuario = new Usuario("teste1", "teste1");
		usuarioRepository.save(usuario);


		// Criando um carrinho
		Carrinho carrinho = new Carrinho();
		carrinhoRepository.save(carrinho);
	}

}
