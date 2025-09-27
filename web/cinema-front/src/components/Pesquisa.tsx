import { type FormEvent, useRef } from "react";
import useFilmeStore from "../util/filmeStore";

const PesquisaFilmes = () => {
  const nome = useFilmeStore((s) => s.nome);
  const setNome = useFilmeStore((s) => s.setNome);
  const setPagina = useFilmeStore((s) => s.setPagina);

  const nomeRef = useRef<HTMLInputElement>(null);

  const tratarNome = (nome: string) => {
    setNome(nome);
    setPagina(0);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nomeRef.current) {
      tratarNome(nomeRef.current.value);
    }
  };

  return (
    <form onSubmit={submit} className="d-flex mb-3">
      <input
        type="text"
        ref={nomeRef}
        defaultValue={nome}
        className="form-control form-control-sm me-3"
        placeholder="Pesquisar filmes..."
      />
      <button className="btn btn-primary btn-sm" type="submit">
        Pesquisar
      </button>
    </form>
  );
};

export default PesquisaFilmes;
