import type { ReactNode } from "react";


interface Props {
  id?: number;
  imagem: string;
  titulo: string;
  sinopse: string;
  classificacao: string;
  duracao: string;
  emCartaz: boolean;
  footer?: ReactNode;
}

const Card = ({ imagem, titulo, sinopse, classificacao, duracao, emCartaz, footer }: Props) => {
  return (
    <div className="card h-100 border-0">
      <img src={imagem} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text mb-1"><strong>Classificação:</strong> {classificacao}</p>
        <p className="card-text mb-1"><strong>Duração:</strong> {duracao}</p>
        <p className="card-text mb-1">
          <strong>Status:</strong> {emCartaz ? "Em cartaz" : "Em breve"}
        </p>
        <p className="card-text">{sinopse}</p>
      </div>
      {footer && <div className="card-footer border-0 p-0">{footer}</div>}
    </div>
  );
};

export default Card;
