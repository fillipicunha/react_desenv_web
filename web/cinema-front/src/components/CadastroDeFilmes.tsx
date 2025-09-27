import { useForm } from "react-hook-form";
//import databaseAdd from "../assets/icones/database_add.png";
//import databaseEdit from "../assets/icones/database_edit.png";
//import databaseCancel from "../assets/icones/multiply.png";

import useCadastrarFilme from "../hooks/useCadastrarFilme";
import useAlterarFilme from "../hooks/useAlterarFilme";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
 
import type { Filme } from "../interfaces/Filme";
import type { Genero } from "../interfaces/Genero";
import useFilmeStore from "../util/filmeStore";
import useFilmeSelStore from "../util/filmeSelStore";

const generoValido = (genero: string) => genero !== "0";
const regexImagem = /^.+$/;///^\/?[[a-zA-Z0-9_]\/-]+\.(gif|jpg|png|bmp|jpeg)$/i;


const schema = z.object({
  titulo: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres." }),
  sinopse: z.string().min(10, { message: "A sinopse deve ter pelo menos 10 caracteres." }),
  imagem: z.string().regex(regexImagem, { message: "Nome de imagem inválido." }),
  classificacao: z.string().min(1, { message: "A classificação deve ser informada." }),
  duracao: z.number({ message: "A duração deve ser informada." }).min(1, { message: "Duração mínima é 1 minuto." }), ////ATENCAO AQUI///
  emCartaz: z.boolean(),
  genero: z.string().refine(generoValido, { message: "O gênero deve ser informado." }),
});

const CadastroDeFilmesForm = () => {
  const filmeSelecionado = useFilmeStore((s) => s.filmeSelecionado);
  const setFilmeSelecionado = useFilmeStore((s) => s.setFilmeSelecionado);
  const filmeEditar = useFilmeSelStore((s) => s.filmeSelecionado);
  const setFilmeSelStore = useFilmeSelStore((s) => s.setFilmeSelecionado);

  type FormFilme = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormFilme>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setFocus("titulo");
    reset();
    setFilmeSelecionado({} as Filme);
    setFilmeSelStore({} as Filme);
  }, [isSubmitSuccessful, reset, setFocus, setFilmeSelecionado, setFilmeSelStore]);

  useEffect(() => {
    setFocus("titulo");
    reset();
    const f = filmeEditar.id ? filmeEditar : filmeSelecionado;
    if (f?.id) {
      setValue("titulo", f.titulo);
      setValue("sinopse", f.sinopse);
      setValue("imagem", f.imagem);
      setValue("classificacao", f.classificacao);
      setValue("duracao", f.duracao);
      setValue("emCartaz", f.emCartaz ?? false);
      setValue("genero", String(f.genero.id));
    }
  }, [filmeSelecionado, filmeEditar, setFocus, reset, setValue]);

  const { mutate: cadastrarFilme, error: errorCadastrarFilme } = useCadastrarFilme();
  const { mutate: alterarFilme, error: errorAlterarFilme } = useAlterarFilme();

  const onSubmit = ({ titulo, sinopse, imagem, classificacao, duracao, emCartaz, genero }: FormFilme) => {
    const filme: Filme = {
      titulo,
      sinopse,
      imagem,
      classificacao,
      duracao,
      emCartaz,
      genero: { id: parseInt(genero) } as Genero,
    };

    if (filmeSelecionado.id) {
      filme.id = filmeSelecionado.id;
      alterarFilme(filme);
    } else {
      cadastrarFilme(filme);
    }
  };

  if (errorCadastrarFilme) throw errorCadastrarFilme;
  if (errorAlterarFilme) throw errorAlterarFilme;

  return (
    <div className="bg-white p-4 shadow rounded mb-3">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="Off">
        {/* Título */}
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label fw-bold">Título</label>
          <input {...register("titulo")} type="text" id="titulo" className={`form-control ${errors.titulo ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.titulo?.message}</div>
        </div>

        {/* Sinopse */}
        <div className="mb-3">
          <label htmlFor="sinopse" className="form-label fw-bold">Sinopse</label>
          <textarea {...register("sinopse")} id="sinopse" className={`form-control ${errors.sinopse ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.sinopse?.message}</div>
        </div>

        {/* Classificação e Duração */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="classificacao" className="form-label fw-bold">Classificação</label>
            <input {...register("classificacao")} type="text" id="classificacao" className={`form-control ${errors.classificacao ? "is-invalid" : ""}`} />
            <div className="invalid-feedback">{errors.classificacao?.message}</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="duracao" className="form-label fw-bold">Duração (min)</label>
            <input {...register("duracao", { valueAsNumber: true })} type="number" id="duracao" min="1" className={`form-control ${errors.duracao ? "is-invalid" : ""}`} />
            <div className="invalid-feedback">{errors.duracao?.message}</div>
          </div>
        </div>

        {/* Gênero e Em Cartaz */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="genero" className="form-label fw-bold">Gênero</label>
            <select {...register("genero")} id="genero" className={`form-control ${errors.genero ? "is-invalid" : ""}`}>
              <option value="0">Selecione um gênero</option>
              <option value="1">Drama</option>
              <option value="2">Suspense</option>
              <option value="3">Ação</option>
              <option value="4">Terror</option>
              <option value="5">Romance</option>
              <option value="6">Comédia</option>
            </select>
            <div className="invalid-feedback">{errors.genero?.message}</div>
          </div>
          <div className="col-md-6 d-flex align-items-center mt-4">
            <div className="form-check">
              <input {...register("emCartaz")} type="checkbox" className="form-check-input" id="emCartaz" />
              <label className="form-check-label" htmlFor="emCartaz">Em Cartaz</label>
            </div>
          </div>
        </div>

        {/* Imagem */}
        <div className="mb-4">
          <label htmlFor="imagem" className="form-label fw-bold">Imagem (caminho)</label>
          <input {...register("imagem")} type="text" id="imagem" className={`form-control ${errors.imagem ? "is-invalid" : ""}`} />
          <div className="invalid-feedback">{errors.imagem?.message}</div>
        </div>

        {/* Botões */}
        <div className="d-flex justify-content-start">
            <button type="submit" className="btn btn-primary me-2">
                {filmeSelecionado.id ? "Alterar" : "Cadastrar"}
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                reset();
                setFilmeSelecionado({} as Filme);
                setFilmeSelStore({} as Filme);
                }}
            >
                Cancelar
            </button>
            </div>
      </form>
    </div>
  );
};

export default CadastroDeFilmesForm;
