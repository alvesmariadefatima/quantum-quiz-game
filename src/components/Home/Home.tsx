import Footer from "../Footer/Footer"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate("/nickname");
    };

    const handleGameInstructions = () => {
        navigate("/gameinstructions");
    };

    const handleQuizAR = () => {
        navigate("/quiz-ar");
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen">
            <section className="bg-white shadow-lg rounded-xl p-6 w-90 text-center">
                <h1 className="text-xl font-semibold mb-4">⚛️ Quantum Quiz</h1>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={handleStartGame}
                        className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full cursor-pointer transition duration-200"
                    >
                        Iniciar Partida
                    </button>

                    <button 
                        onClick={handleGameInstructions}
                        className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full cursor-pointer"
                    >
                        Regras do Jogo
                    </button>

                    <button
                        onClick={handleQuizAR}
                        className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full cursor-pointer transition duration-200"
                    >
                        Experimente o jogo na versão 3D
                    </button>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default Home;