import React, { useEffect, useState } from 'react';
import filmeService from '../services/filmeService';
import type { Filme } from '../interfaces/Filme';

export default function FilmesEmBreve () {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const filmesApi = await filmeService.buscarEmBreve();
        setFilmes(filmesApi);
      } catch (error) {
        console.error('Erro ao buscar filmes em breve:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarFilmes();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Filmes em Breve</h2>
      <hr />
      {carregando ? (
        <p>Carregando filmes...</p>
      ) : filmes.length === 0 ? (
        <p>Nenhum filme em breve encontrado.</p>
      ) : (
        <div className="row">
          {filmes.map((filme) => (
            <div className="col-md-3 mb-4" key={filme.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={filme.imagem}
                  className="card-img-top"
                  alt={filme.titulo}
                  style={{ height: '350px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{filme.titulo}</h5>
                  <p className="card-text">
                    {filme.sinopse.length > 100
                      ? filme.sinopse.substring(0, 100) + '...'
                      : filme.sinopse}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


