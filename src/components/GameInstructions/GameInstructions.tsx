import { useNavigate } from "react-router-dom";

const GameInstructions = () => {
    const navigate = useNavigate()

    const handleBackToHome = () => {
        navigate("/");
    };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <article className="bg-white shadow-xl rounded-2xl p-6 px-4 md:px-10 w-full max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-left">
                    🔮 Regras do Jogo - Quantum Quiz
                </h1>

                <div className="space-y-6 text-left text-base md:text-lg text-gray-800">
                    <div>
                        <h2 className="font-semibold">🧑‍💻 Identifique-se para Começar</h2>
                        <p>
                            Antes de iniciar a partida, digite seu apelido. Ele será seu identificador ao longo do jogo e será usado na pontuação final.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold">🎯 Pontuação</h2>
                        <p>
                            Cada resposta correta vale <span className="font-bold text-green-600">+1 ponto</span>.<br />
                            Cada resposta errada resulta em <span className="font-bold text-red-600">-1 ponto</span>.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold">💡 Dica</h2>
                        <p>
                            Pense bem antes de responder: o conhecimento quântico pode ser instável!
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button 
                            onClick={handleBackToHome}
                            className="bg-purple-400 hover:bg-purple-500 text-white text-xl px-10 py-1 rounded cursor-pointer"
                        >
                        Voltar
                    </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default GameInstructions;