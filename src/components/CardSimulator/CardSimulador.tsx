import React from "react";

interface CardSimuladorProps {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
}

export const CardSimulador: React.FC<CardSimuladorProps> = ({
  titulo,
  descricao,
  imagem,
  link,
}) => {
  return (
    <div
      className="
        w-[90%] sm:w-72 md:w-80
        min-h-[380px] sm:min-h-[400px] md:min-h-[420px]
        flex flex-col
        rounded-2xl shadow-lg overflow-hidden
        hover:scale-105 transition-transform duration-300
        bg-white
        mx-4 sm:mx-6 md:mx-0 my-4
      "
    >
      {/* Área da imagem */}
      <div className="relative flex justify-center items-center w-full h-40 sm:h-44 md:h-48 bg-gray-100">
        <img
          src={imagem}
          alt={titulo}
          className="max-w-[70%] max-h-[70%] object-contain"
        />
        <span className="absolute top-3 left-3 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Simuladores
        </span>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 text-center">
            {titulo}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-4 text-center">
            {descricao}
          </p>
        </div>

        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-full transition-colors duration-300 text-sm sm:text-base">
            Saiba mais
        </a>
      </div>
    </div>
  );
};