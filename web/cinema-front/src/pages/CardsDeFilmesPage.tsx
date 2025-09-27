import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import useFilmesPaginadosPorSlugDoGenero from "../hooks/useFilmesPaginadosPorSlugDoGenero";
import InfiniteScroll from "react-infinite-scroll-component";

import useFavoritoStore from "../util/favoritoStore";
import useCarrinhoStore from "../util/carrinhoStore";
//import { create } from "zustand";
//import { persist } from "zustand/middleware";
import "../assets/css/Cards.css";

import type { Filme } from "../interfaces/Filme";
import type ItemCarrinhoDTO from "../interfaces/ItemCarrinhoDTO";
import type ItemFavoritoDTO from "../interfaces/ItemFavoritoDTO";
import { useState } from "react";

 
const CardsDeFilmesPage = () => {
  const { slug } = useParams();
  const tamanho = 12;

  const {
    data,
    isPending: carregandoFilmes,
    error: errorFilmes,
    hasNextPage,
    fetchNextPage,
  } = useFilmesPaginadosPorSlugDoGenero({ tamanho, slug });

  const favorito = useFavoritoStore((state) => state.favorito); // pegar o objeto completo
  const adicionarItemFavorito = useFavoritoStore((state) => state.adicionarItemFavorito);
  const { adicionarItem } = useCarrinhoStore();

  const [mensagem, setMensagem] = useState<string | null>(null);

  const mostrarMensagem = (msg: string) => {
    setMensagem(msg);
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleAdicionarAoCarrinho = (filme: Filme) => {
    const itemDTO: ItemCarrinhoDTO = {
      filmeId: filme.id!,
      quantidade: 1,
    };
    adicionarItem(itemDTO);
    mostrarMensagem(`${filme.titulo} foi adicionado ao carrinho!`);
  };

  const handleAdicionarAoFavorito = (filme: Filme) => {
    const itemDTO: ItemFavoritoDTO = {
      filmeId: filme.id!,
      quantidade: 1,
    };
    adicionarItemFavorito(itemDTO);
    mostrarMensagem(`${filme.titulo} foi adicionado aos favoritos!`);
  };

  if (carregandoFilmes) return <div className="text-center text-white"><h6>Carregando...</h6></div>;
  if (errorFilmes) throw errorFilmes;

  const totalDeFilmes = data.pages.reduce((total, page) => total + page.itens.length, 0);
  const itensFavoritos = favorito?.itens || []; // pega corretamente os itens do favorito

  return (
    <>
      <InfiniteScroll
        dataLength={totalDeFilmes}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<div className="text-center text-white"><h6>Carregando...</h6></div>}
      >
        <h5 style={{ color: "rgb(255, 255, 255)" }}>
          {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Filmes"}
        </h5>
        <div className="row mb-3">
          {data.pages.map((page) =>
            page.itens.map((filme: Filme) => {
              const isFavorito = itensFavoritos.some((f) => f.filme.id === filme.id);

              return (
                <div key={filme.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                  <Card
                    imagem={filme.imagem}
                    titulo={filme.titulo}
                    sinopse={filme.sinopse}
                    classificacao={`Classificação: ${filme.classificacao}`}
                    duracao={`Duração: ${filme.duracao} min`}
                    emCartaz={filme.emCartaz}
                    footer={
                      <div className="d-flex justify-content-between px-2 mb-2 align-items-center">
                        <button
                          onClick={() => handleAdicionarAoCarrinho(filme)}
                          className="btn btn-success btn-sm w-50 me-2"
                        >
                          Comprar
                        </button>

                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            handleAdicionarAoFavorito(filme);
                          }}
                          href="#"
                          className="text-danger d-flex align-items-center justify-content-center w-25 me-2"
                          title="Favoritar"
                        >
                          <img
                            src={
                              isFavorito
                                ? "/assets/heart-fill.svg"
                                : "/assets/heart.svg"
                            }
                            alt="Favoritar"
                            width="20"
                            height="20"
                          />
                        </a>

                        <Link
                          to={`/detalhes-filme/${filme.id}`}
                          className="btn btn-primary btn-sm w-50 ms-2"
                        >
                          Editar
                        </Link>
                      </div>
                    }
                  />
                </div>
              );
            })
          )}
        </div>
      </InfiniteScroll>

      {mensagem && (
        <div className="alert alert-success fixed-bottom m-3" style={{ zIndex: 1050 }}>
          {mensagem}
        </div>
      )}
    </>
  );
};

export default CardsDeFilmesPage;

 
/*
const CardsDeFilmesPage = () => {
  const { slug } = useParams();
  const tamanho = 12;

  const {
    data,
    isPending: carregandoFilmes,
    error: errorFilmes,
    hasNextPage,
    fetchNextPage,
  } = useFilmesPaginadosPorSlugDoGenero({ tamanho, slug });

  const { adicionarItemFavorito } = useFavoritoStore();
  const { adicionarItem } = useCarrinhoStore();


  const [mensagem, setMensagem] = useState<string | null>(null);

  const mostrarMensagem = (msg: string) => {
    setMensagem(msg);
    setTimeout(() => setMensagem(null), 3000); 
  };


  const handleAdicionarAoCarrinho = (filme: Filme) => {
    console.log("Adicionando ao carrinho:", filme.titulo);
    const itemDTO: ItemCarrinhoDTO = {
      filmeId: filme.id!,
      quantidade: 1,
    };
    adicionarItem(itemDTO);
    mostrarMensagem(`${filme.titulo} foi adicionado ao carrinho!`);
    //alert(`${filme.titulo} foi adicionado ao carrinho!`);
  };

  const handleAdicionarAoFavorito = (filme: Filme) => {
    console.log("Adicionando ao favorito:", filme.titulo);
    const itemDTO: ItemFavoritoDTO = {
      filmeId: filme.id!,
      quantidade: 1,
    };
    adicionarItemFavorito(itemDTO);
    mostrarMensagem(`${filme.titulo} foi adicionado aos favoritos!`);
    //alert(`${filme.titulo} foi adicionado aos favoritos!`);
  };

  if (carregandoFilmes) return <div className="text-center text-white"><h6>Carregando...</h6></div>;
  if (errorFilmes) throw errorFilmes;

  const totalDeFilmes = data.pages.reduce((total, page) => total + page.itens.length, 0);

  return (
    <>
    <InfiniteScroll
      dataLength={totalDeFilmes}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<div className="text-center text-white"><h6>Carregando...</h6></div>}
    >
      <h5 style={{ color: "rgb(255, 255, 255)" }}>
        {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Filmes"}
      </h5>
      <div className="row mb-3">
        {data.pages.map((page) =>
          page.itens.map((filme: Filme) => (
            <div key={filme.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
              <Card
                imagem={filme.imagem}
                titulo={filme.titulo}
                sinopse={filme.sinopse}
                classificacao={`Classificação: ${filme.classificacao}`}
                duracao={`Duração: ${filme.duracao} min`}
                emCartaz={filme.emCartaz}
                footer={
                  <div className="d-flex justify-content-between px-2 mb-2">
                    <button
                      onClick={() => handleAdicionarAoCarrinho(filme)}
                      className="btn btn-success btn-sm w-50 me-2"
                    >
                      Comprar
                    </button>

                    /*<button
                      onClick={() => handleAdicionarAoFavorito(filme)}
                      className="btn btn-warning btn-sm w-50 me-2"
                    >
                      Favoritar
                    </button> ////

                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdicionarAoFavorito(filme);
                      }}
                      href="#"
                      className="text-danger d-flex align-items-center justify-content-center w-25 me-2"
                      title="Favoritar"
                    >
                      <img
                        src="/assets/icons/heart.svg"
                        alt="Favoritar"
                        width="20"
                        height="20"
                      />
                    </a>


                    <Link
                      to={`/detalhes-filme/${filme.id}`}
                      className="btn btn-primary btn-sm w-50 ms-2"
                    >
                      Editar
                    </Link>
                  </div>
                }
              />
            </div>
          ))
        )}
      </div>
    </InfiniteScroll>

        {mensagem && (
      <div className="alert alert-success fixed-bottom m-3" style={{ zIndex: 1050 }}>
        {mensagem}
      </div>
    )}
  </>

  );
};

export default CardsDeFilmesPage;
*/