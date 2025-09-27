
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import useEfetuarCadastro from "../hooks/useEfetuarCadastro";
import type UsuarioCadastro from "../interfaces/usuarioCadastro";
 

const schema = z
  .object({
    conta: z.string().min(5, { message: "A conta deve ter no mínimo 5 caracteres." })
    .email({ message: "Formato de e-mail inválido." }),
    senha: z.string().min(2, { message: "A senha deve ter no mínimo 2 caracteres." }),
    confirmacaoSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas não conferem.",
    path: ["confirmacaoSenha"],
  });

type FormCadastro = z.infer<typeof schema>;

const CadastroForm = () => {
  const navigate = useNavigate();
  const { mutate: efetuarCadastro } = useEfetuarCadastro();

  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormCadastro>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setFocus("conta");
  }, [setFocus]);

  const onSubmit = ({ conta, senha }: FormCadastro) => {
    const usuarioParaCadastro: UsuarioCadastro = { conta, senha };
    
    setMensagemErro("");
    setMensagemSucesso("");

    efetuarCadastro(usuarioParaCadastro, {
      onSuccess: () => {
        setMensagemSucesso("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 3000);
      },
      onError: (error) => {
        setMensagemErro(error.message || "Não foi possível realizar o cadastro.");
      },
    });
  };

  return (
    <>
      {mensagemSucesso && (
        <div className="alert alert-success fw-bold text-dark" role="alert">
          {mensagemSucesso}
        </div>
      )}
      {mensagemErro && (
        <div className="alert alert-danger fw-bold text-dark" role="alert">
          {mensagemErro}
        </div>
      )}
      
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Conta */}
        <div className="row mb-2">
          <label htmlFor="conta" className="col-lg-3 fw-bold mb-2 text-dark">
            Conta 
          </label>
          <div className="col-lg-5">
            <input
              {...register("conta")}
              type="text"
              id="conta"
              className={`form-control form-control-sm ${errors.conta ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.conta?.message}</div>
          </div>
        </div>

        {/* Campo Senha */}
        <div className="row mb-3">
          <label htmlFor="senha" className="col-lg-3 fw-bold mb-2 text-dark">
            Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("senha")}
              type="password"
              id="senha"
              className={`form-control form-control-sm ${errors.senha ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.senha?.message}</div>
          </div>
        </div>
        
        {/* Campo Confirmação de Senha */}
        <div className="row mb-3">
          <label htmlFor="confirmacaoSenha" className="col-lg-3 fw-bold mb-2 text-dark">
            Confirmar Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("confirmacaoSenha")}
              type="password"
              id="confirmacaoSenha"
              className={`form-control form-control-sm ${errors.confirmacaoSenha ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.confirmacaoSenha?.message}</div>
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="row">
          <div className="offset-lg-3 col-lg-5">
            <button type="submit" className="btn btn-outline-success">
              Criar Conta
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CadastroForm;




/*import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormCadastro {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function CadastroForm() {
  const { register, handleSubmit, watch } = useForm<FormCadastro>();
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);

  const onSubmit = async (data: FormCadastro) => {
    if (data.senha !== data.confirmarSenha) {
      setErro("Senhas não conferem");
      return;
    }
    setErro(null);

    try {
      const res = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          senha: data.senha,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setErro(text || "Erro ao registrar usuário");
        return;
      }

      alert("Cadastro realizado com sucesso! Faça login.");
      navigate("/login");
    } catch (error) {
      setErro("Erro ao registrar usuário");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {erro && <div className="alert alert-danger">{erro}</div>}

      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome
        </label>
        <input
          id="nome"
          {...register("nome", { required: true })}
          className="form-control"
          type="text"
          autoComplete="name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          {...register("email", { required: true })}
          className="form-control"
          type="email"
          autoComplete="email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="form-label">
          Senha
        </label>
        <input
          id="senha"
          {...register("senha", { required: true })}
          className="form-control"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmarSenha" className="form-label">
          Confirmar Senha
        </label>
        <input
          id="confirmarSenha"
          {...register("confirmarSenha", { required: true })}
          className="form-control"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Cadastrar
      </button>
    </form>
  );
}*/
