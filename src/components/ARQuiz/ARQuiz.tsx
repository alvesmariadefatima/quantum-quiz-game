import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../../questions/questions.json";
import answerGuides from "../../hints/answer_guides.json";

type Question = {
  id: string;
  pergunta: string;
  alternativas: string[];
  resposta_correta: {
    texto: string;
    explicacao: string;
    link_referencia: string;
  };
  dificuldade: string;
};

type AnswerGuide = {
  id: string;
  dica: string;
};

const questions: Question[] = questionsData as Question[];
const hints: AnswerGuide[] = answerGuides as AnswerGuide[];

export default function ARQuiz() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<React.ReactNode>("");
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(0);  
  const [incorrect, setIncorrect] = useState(0); 
  const navigate = useNavigate();

  const currentQuestion = questions[index];
  const currentHint = hints.find((h) => h.id === currentQuestion.id)?.dica;

  const handleAnswer = (i: number) => {
    const correta = currentQuestion.resposta_correta.texto;

    if (currentQuestion.alternativas[i] === correta) {
      setFeedback("✅ Resposta correta!");
      setCorrect((prev) => prev + 1); 
    } else {
      setFeedback(
        <div className="flex flex-col items-center w-full max-w-md">
          <p className="text-center font-semibold text-lg mb-2">
            ❌ Resposta incorreta
          </p>
          <p className="text-justify text-white p-4 rounded-md drop-shadow-md w-full">
            <span className="font-semibold">Explicação:</span>{" "}
            {currentQuestion.resposta_correta.explicacao}
          </p>
          <a
            href={currentQuestion.resposta_correta.link_referencia}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-white underline text-center"
          >
            🔗 Saiba mais
          </a>
        </div>
      );
      setIncorrect((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setShowHint(false);
    setIndex((prev) => (prev + 1 < questions.length ? prev + 1 : 0));
  };

  const finishQuiz = () => {
    navigate("/gameresults-ar", { state: { correct, incorrect } });
  };

  const isLastQuestion = index === questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 text-white p-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-lg text-center">
        ⚛️ Quantum Quiz
      </h1>

      <p className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md text-center">
        {currentQuestion.pergunta}
      </p>

      {currentHint && !showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="mt-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-purple-700 transition-colors duration-200"
        >
          💡 Mostrar Dica
        </button>
      )}

      {showHint && currentHint && (
        <p className="mt-2 px-4 py-2 text-black bg-white rounded-md drop-shadow-md text-center">
          💡 Dica: {currentHint}
        </p>
      )}

      <div className="flex flex-col gap-4 mt-4 w-full max-w-md">
        {currentQuestion.alternativas.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-200 active:translate-y-0 active:scale-100"
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="mt-6 px-5 text-lg md:text-xl drop-shadow-md text-justify text-white w-full max-w-md">
          {feedback}
        </div>
      )}

      {feedback && (
        <button
          onClick={isLastQuestion ? finishQuiz : nextQuestion}
          className={`mt-6 px-6 py-3 rounded-2xl shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-200 active:translate-y-0 active:scale-100 ${
            isLastQuestion
              ? "bg-gradient-to-br from-violet-800 to-violet-600"
              : "bg-gradient-to-br from-green-500 to-teal-600"
          }`}
        >
          {isLastQuestion ? "Finalizar Quiz" : "Próxima"}
        </button>
      )}
    </div>
  );
}