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
                    <FaFacebook className="text-blue-500 text-3xl" />
                    <FaSquareInstagram className="text-pink-500 text-3xl" />
                    <IoLogoWhatsapp className="text-green-400 text-3xl" />
                    <FaTelegram className="text-blue-400 text-3xl" />
                    <FaSquareXTwitter className="text-black text-3xl" />
                    <FaLinkedin className="text-blue-600 text-3xl" />
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