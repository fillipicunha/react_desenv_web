import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect } from "react";
//import type {Filme} from "../interfaces/Filme";

export default function HomePage() {
  useEffect(() => {
     
  }, []);

  const filmes = [
      { titulo: "Pecadores", imagem: "pecadores.jpg" }, 
      { titulo: "Until Dawn", imagem: "untildawn.jpg" },
      { titulo: "Minecraft", imagem: "minecraft.jpg" },
      { titulo: "Branca de Neve (2025)", imagem: "branca.jpg" },
      { titulo: "Thunderbolts", imagem: "thunderbolts.jpg" },
    ];

  return (
    <>
       

      {/* Carousel */}
      <div id="carousel-id" className="carousel slide mb-4" data-bs-ride="carousel" style={{ marginTop: "0px" }}>
        <div className="carousel-indicators">
          {[...Array(5)].map((_, i) => (
            <button key={i} type="button" data-bs-target="#carousel-id" data-bs-slide-to={i} className={i === 0 ? "active" : ""} aria-current={i === 0} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>


       
        <div className="carousel-inner">
        {filmes.map((filme, index) => (
          <div key={filme.imagem} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={`/assets/${filme.imagem}`}
              className="d-block w-100"
              alt={filme.titulo}
              style={{ height: "650px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{filme.titulo}</h5>
            </div>
          </div>
        ))}
      </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carousel-id" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carousel-id" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>

      { }
      <div className="container">
        <h2>Programação do dia</h2>
        {[
          {
            titulo: "Minecraft",
            genero: "Aventura",
            classificacao: "Livre",
            duracao: "1h 45min",
            horarios: ["Sala 1 • 18:00 • Dublado", "Sala 2 • 21:00 • Dublado"]
          },
          {
            titulo: "Branca de Neve (2025)",
            genero: "Infantil",
            classificacao: "10 anos",
            duracao: "1h 30min",
            horarios: ["Sala 1 • 20:30 • Legendado", "Sala 3 • 22:10 • Dublado"]
          },
          {
            titulo: "Untildawn",
            genero: "Terror/Suspense",
            classificacao: "18 anos",
            duracao: "2h 15min",
            horarios: ["Sala 1 • 15:50 • Legendado", "Sala 2 • 23:00 • Legendado"]
          },
          {
            titulo: "Thunderbolts",
            genero: "Suspense/Ficção",
            classificacao: "14 anos",
            duracao: "1h 55min",
            horarios: ["Sala 1 • 23:30 • Dublado"]
          },
        ].map((filme) => (
          <div className="mb-3" key={filme.titulo}>
            <div className="dropdown">
              <button className="btn dropdown-toggle bg-transparent border-0 shadow-none" type="button" data-bs-toggle="dropdown">
                <strong style={{ fontSize: "1.5rem" }}>{filme.titulo}</strong>
              </button>
              <ul className="dropdown-menu">
                <li><span className="dropdown-item-text">Gênero: {filme.genero}</span></li>
                <li><span className="dropdown-item-text">Classificação: {filme.classificacao}</span></li>
                <li><span className="dropdown-item-text">Duração: {filme.duracao}</span></li>
              </ul>
            </div>
            {filme.horarios.map((horario, idx) => (
              <span className="d-block ms-3" key={idx}>{horario}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Contato */}
      <footer className="mt-5 p-4 bg-light text-center">
        <h6>Contato</h6>
        <ul className="list-unstyled">
          <li>CineTop</li>
          <li>(21) 2104-9802</li>
          <li><a href="mailto:cinetop@mail.com">cinetop@mail.com</a></li>
        </ul>
      </footer>
    </>
  );
}

