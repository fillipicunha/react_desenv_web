
import { z } from "zod";
 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import loginIcon from "../assets/icones/login.png";
import useUsuarioStore from "../util/UsuarioStore";
import type Usuario from "../interfaces/Usuario";
 

const schema = z.object({
  conta: z.string().min(12, { message: "A conta deve ser informada." })
  .email({ message: "Formato de e-mail inválido." }),
  senha: z.string().min(1, { message: "A senha deve ser informada." }),
});

type FormLogin = z.infer<typeof schema>;

const LoginForm = () => {
  
  const { login, error: loginError, status } = useUsuarioStore();

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, setFocus, formState: { errors, isSubmitting } } = useForm<FormLogin>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setFocus("conta");
  }, [setFocus]);

 
  useEffect(() => {
    if (status === 'LOGADO') {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [status, navigate, location.state]);

  
  const onSubmit = async ({ conta, senha }: FormLogin) => {
    const usuario: Usuario = { conta, senha };
    try {
      await login(usuario);
       
    } catch (error) {
       
    }
  };

  return (
    <>
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-2">
          <label htmlFor="conta" className="col-lg-1 fw-bold mb-2 text-dark">Conta</label>
          <div className="col-lg-5">
            <input {...register("conta")} type="text" id="conta" className={errors.conta ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
            <div className="invalid-feedback">{errors.conta?.message}</div>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="senha" className="col-lg-1 fw-bold mb-2 text-dark">Senha</label>
          <div className="col-lg-5">
            <input {...register("senha")} type="password" id="senha" className={errors.senha ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
            <div className="invalid-feedback">{errors.senha?.message}</div>
          </div>
        </div>
        <div className="row">
          <div className="offset-lg-1 col-lg-2">
            <button type="submit" className="btn btn-outline-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <img src={loginIcon} alt="Login" />}
              Entrar
            </button>
          </div>
          <div className="offset-lg-1 col-lg-2">
            <Link to={`/cadastro`} className="btn btn-primary btn-sm w-50 ms-2">
              Cadastrar
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;



/*import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import loginIcon from "../assets/skin/login.png";
import useEfetuarLogin from "../hooks/useEfetuarLogin";

import useUsuarioStore from "../util/UsuarioStore";
import type Usuario from "../interfaces/Usuario";
//import type TokenResponse from "../interfaces/TokenResponse";

interface FormLogin {
  email: string;
  senha: string;
}

const LoginForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const [loginInvalido, setLoginInvalido] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormLogin>();

  const { mutate: efetuarLogin, error: errorEfetuarLogin } = useEfetuarLogin();

  useEffect(() => {
    useUsuarioStore.getState().logout();
  }, []);

  const submit = ({ email, senha }: FormLogin) => {
    const usuario: Usuario = { email, senha };

    efetuarLogin(usuario, {
      onSuccess: (usuarioLogado: Usuario) => {
        setUsuarioLogado(usuarioLogado.email);

        if (location.state?.destino) {
          navigate(location.state.destino);
        } else {
          navigate("/");
        }
      },
      onError: () => {
        setLoginInvalido(true);
      },
    });
  };

  if (errorEfetuarLogin) throw errorEfetuarLogin;

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        {loginInvalido && (
          <div className="row">
            <div className="col-lg-6">
              <div className="alert alert-danger fw-bold" role="alert">
                Login inválido!
              </div>
            </div>
          </div>
        )}

        <div className="row mb-2">
          <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">
            Email:
          </label>
          <div className="col-lg-5">
            <input
              {...register("email")}
              type="text"
              id="conta"
              className="form-control form-control-sm"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
            Senha:
          </label>
          <div className="col-lg-5">
            <input
              {...register("senha")}
              type="password"
              id="senha"
              className="form-control form-control-sm"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="offset-lg-1 col-lg-5">
            <button type="submit" className="btn btn-outline-primary">
              <img src={loginIcon} alt="login" className="me-2" />
              Entrar
            </button>
          </div>
        </div>
      </form>

      <div className="row mt-3">
        <div className="offset-lg-1 col-lg-5">
          <p>
            <button
              type="button"
              className="btn btn-link p-0 align-baseline"
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;*/
