import { useRef } from "react";
import atomo from '../assets/atomo.png';
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const GameResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correct, incorrect, totalQuestions } = location.state || {};

  const resultRef = useRef<HTMLDivElement>(null);

  const shareText = `Acabei de jogar e fiz ${correct} acertos e ${incorrect} erros!`;
  const shareUrl = "https://quantum-quiz-game.vercel.app";

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, 
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,   
  };

  const handleDownloadImage = () => {
    if (resultRef.current) {
      htmlToImage.toPng(resultRef.current)
        .then((dataUrl) => {
          download(dataUrl, "resultado-quiz.png");
        })
        .catch((err) => {
          console.error("Erro ao gerar imagem:", err);
          alert("Erro ao gerar imagem.");
        });
    }
  };

  const totalStars = 5;
  const performanceRatio = totalQuestions ? correct / totalQuestions : 0;
  const starsToDisplay = performanceRatio * totalStars;

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: `url(${atomo})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '50px 50px',
        backgroundPosition: 'top left',
      }}
    >
      <section className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center space-y-4">
        <div
          ref={resultRef}
          className="bg-gradient-to-tr from-purple-700 via-pink-500 to-yellow-400 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4"
        >
          <div className="flex space-x-1">
          {[...Array(totalStars)].map((_, i) => {
          let StarComponent;

          if (i + 1 <= Math.floor(starsToDisplay)) {
            StarComponent = FaStar;
          } else if (i < starsToDisplay) {
            StarComponent = FaStarHalfAlt;
          } else {
            StarComponent = FaStar; 
          }

        const colorClass = i + 1 <= starsToDisplay ? "text-yellow-400" : "text-yellow-300";

          return (
            <StarComponent
              key={i}
              className={`${colorClass} fill-current text-3xl animate-pulse`}
            />
          );
        })}
      </div>

          <h1 className="text-3xl font-bold">🏆 Resultado Final</h1>
          <p className="text-lg font-semibold">Acertos: {correct}</p>
          <p className="text-lg font-semibold">Erros: {incorrect}</p>
        </div>

        <p className="text-center font-semibold mt-4">
          Compartilhe este resultado nas redes sociais:
        </p>

        <div className="flex items-center justify-center space-x-3 mt-2">
          <a href={links.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-500 text-3xl" />
          </a>

          <button onClick={handleDownloadImage}>
            <FaSquareInstagram className="text-pink-500 text-3xl" />
          </button>

          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
            <IoLogoWhatsapp className="text-green-400 text-3xl" />
          </a>

          <a href={links.telegram} target="_blank" rel="noopener noreferrer">
            <FaTelegram className="text-blue-400 text-3xl" />
          </a>

          <a href={links.twitter} target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter className="text-black text-3xl" />
          </a>

          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-600 text-3xl" />
          </a>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Voltar
        </button>
      </section>
    </div>
  );
};

export default GameResults;