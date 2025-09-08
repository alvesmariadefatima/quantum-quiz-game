import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const GameResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { correct, incorrect } = location.state || {};

    const shareText = `Acabei de jogar e fiz ${correct} acertos e ${incorrect} erros!`;
    const shareUrl = "https://quantum-quiz-game.vercel.app";

    const links = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, 
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,   
        instagram: shareUrl
    };

    return (
        <>
    <div className="flex items-center justify-center min-h-screen">
        <section className="bg-white shadow-lg rounded-xl p-6 w-80 text-center">
                <h1 className="text-xl font-semibold">🏆 Resultado Final</h1>

                <p className="text-black font-semibold mt-4">Número de Acertos: { correct }</p>
                <p className="text-black font-semibold mt-2">Número de Erros: { incorrect }</p>

                <p className="text-black mt-6">
                    Compartilhe seu resultado nas redes sociais:
                </p>

                <div className="flex items justify-center space-x-3 mt-6">
                    <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-blue-500 text-3xl" />
                    </a>

                    <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                        <FaSquareInstagram className="text-pink-500 text-3xl" />
                    </a>
                    
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
        </>
    )
}

export default GameResults;