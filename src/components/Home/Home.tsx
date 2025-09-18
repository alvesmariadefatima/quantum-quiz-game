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
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
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
                        className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full cursor-pointer transition duration-200"
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

            <section className="bg-white shadow-lg rounded-xl p-6 w-90 text-center">
                <h2 className="mb-4 font-medium">🔗 Conheça os simuladores quânticos:</h2>

                <div className="flex flex-col space-y-3">
                    <a
                        href="https://www.ibm.com/quantum/qiskit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full cursor-pointer transition duration-200"
                    >
                        Conheça o IBM Qiskit
                    </a>

                    <a
                        href="https://quantumai.google/cirq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 rounded w-full cursor-pointer transition duration-200"
                    >
                        Conheça o Google Cirq
                    </a>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default Home;