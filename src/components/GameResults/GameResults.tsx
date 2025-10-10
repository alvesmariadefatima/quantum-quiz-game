import { useRef, useState, useEffect } from "react";
import axios from "axios";
import atomo from '../../../public/atomo.png';
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaSquareInstagram, FaTelegram, FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

interface PlayerScore {
  name: string;
  score: number;
}

// ✅ Corrigido: rota certa do backend
const API_URL = "https://backend-api-quantum-quiz.onrender.com/api/ranking";

const GameResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { correct = 0, incorrect = 0, totalQuestions = 0 } = location.state || {};

  const resultRef = useRef<HTMLDivElement>(null);
  const [ranking, setRanking] = useState<PlayerScore[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [saved, setSaved] = useState(false);

  const totalStars = 5;
  const performanceRatio = totalQuestions ? correct / totalQuestions : 0;
  const starsToDisplay = performanceRatio * totalStars;

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
        .then((dataUrl) => download(dataUrl, "resultado-quiz.png"))
        .catch((err) => {
          console.error("Erro ao gerar imagem:", err);
          alert("Erro ao gerar imagem.");
        });
    }
  };

  const loadRanking = async () => {
    try {
      const response = await axios.get<PlayerScore[]>(API_URL);
      setRanking(response.data as PlayerScore[]);
    } catch (err) {
      console.error("Erro ao carregar ranking:", err);
    }
  };

  const saveToRanking = async () => {
    if (!playerName.trim()) {
      alert("Digite seu nome para entrar no ranking!");
      return;
    }

    try {
      await axios.post(API_URL, {
        name: playerName.trim(),
        score: correct,
      });
      await loadRanking();
      setSaved(true);
    } catch (err) {
      console.error("Erro ao salvar no ranking:", err);
      alert("Não foi possível salvar o ranking.");
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: `url(${atomo})`,
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
        backgroundPosition: "top left",
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

        {!saved && (
          <div className="mt-4">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Digite seu nome"
              className="border px-3 py-2 rounded-lg w-full mb-2"
            />
            <button
              onClick={saveToRanking}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full"
            >
              Salvar no Ranking
            </button>
          </div>
        )}

        {saved && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow-lg border-2 border-purple-700 text-left w-full">
            <h2 className="text-2xl font-bold mb-2 text-center">🏅 Ranking Top 10</h2>
            <ol className="list-decimal list-inside space-y-1">
              {ranking.map((player, index) => (
                <li
                  key={index}
                  className="flex justify-between px-2 py-1 rounded hover:bg-gray-100"
                >
                  <span>{player.name}</span>
                  <span>{player.score} pts</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="text-center font-semibold mt-4">
          Compartilhe este resultado nas redes sociais:
        </p>
        <div className="flex items-center justify-center space-x-3 mt-2">
          <a href={links.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-500 text-3xl" />
          </a>
          <button 
            onClick={handleDownloadImage}
          >
            <FaSquareInstagram className="text-pink-500 text-3xl cursor-pointer" />
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