import Footer from "../Footer/Footer"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();

    const handleStartGame = () => {
    localStorage.setItem("gameStarted", "true");
    navigate("/nickname");
  };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen">
            <section className="bg-white shadow-lg rounded-xl p-6 w-80 text-center">
            <h1 className="text-xl font-semibold mb-4">⚛️ Quantum Quiz</h1>
    
            <button
                onClick={handleStartGame}
                className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full mb-3 cursor-pointer transition duration-200"
            >
                Iniciar Partida
            </button>
    
            <button className="bg-purple-400 text-white text-sm px-4 py-2 rounded w-full">
                Regras do Jogo
            </button>
        </section>
    </div>
    <Footer />
        </>
    );
}

export default Home;