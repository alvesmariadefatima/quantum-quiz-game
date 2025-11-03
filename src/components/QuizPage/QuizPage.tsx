import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rawQuestions from "../../questions/questions.json";
import answerGuides from "../../hints/answer_guides.json";
import { FaRegStar } from "react-icons/fa6";
import { IoMdHelpCircle } from "react-icons/io";

// --- Tipagens ---
interface RespostaCorreta {
  texto: string;
  explicacao: string;
  link_referencia: string;
}

interface Question {
  id: string;
  pergunta: string;
  alternativas: string[];
  resposta_correta: RespostaCorreta;
  dificuldade: string;
  exemplo?: string;
}

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, { selectedAnswer: string; isAnswered: boolean }>;
}

interface AnswerGuide {
  id: string;
  dica: string;
  exemplo?: string;
}

type AnswerGuidesType = AnswerGuide[] | Record<string, AnswerGuide>;

const QUESTION_TIME_LIMIT = 60;

const shuffleArray = <T,>(array: T[]): T[] =>
  [...array]
    .map(value => ({ value, sorte: Math.random() }))
    .sort((a, b) => a.sorte - b.sorte)
    .map(({ value }) => value);

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
  });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- Embaralhar perguntas ---
  useEffect(() => {
    const questionsArray: Question[] = (rawQuestions as Question[]).map(q => ({
      ...q,
      exemplo: q.exemplo ?? "",
    }));
    setQuestions(shuffleArray(questionsArray));
    setIsLoading(false);
  }, []);

  // --- Cronômetro ---
  useEffect(() => {
    setTimeElapsed(0);
    const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [quizState.currentQuestionIndex]);

  useEffect(() => {
    if (timeElapsed >= QUESTION_TIME_LIMIT) handleNextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeElapsed]);

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const totalQuestions = questions.length;

  // --- Função para pegar guia de resposta seguro ---
  const getCurrentGuide = (): AnswerGuide | null => {
    if (!currentQuestion) return null;
    const guides = answerGuides as AnswerGuidesType;

    if (Array.isArray(guides)) {
      return guides.find(g => g.id === currentQuestion.id) || null;
    }
    return guides[currentQuestion.id] || null;
  };

  const currentGuide = getCurrentGuide();

  if (isLoading || !currentQuestion) {
    return <div className="flex justify-center items-center min-h-screen">Carregando quiz...</div>;
  }

  const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
  const selectedAnswer = currentAnswer?.selectedAnswer;
  const isAnswered = !!currentAnswer?.isAnswered;
  const isCorrect = selectedAnswer === currentQuestion.resposta_correta.texto;

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestionIndex]: { selectedAnswer: answer, isAnswered: true },
      },
    }));
    setShowHint(false);
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < totalQuestions - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setShowHint(false);
    } else {
      navigate("/gameresults", {
        state: {
          score,
          correct: countCorrect(),
          incorrect: countIncorrect(),
          total: totalQuestions,
        },
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
      setShowHint(false);
    }
  };

  // --- Pontuação ---
  const score = Object.entries(quizState.answers).reduce((acc, [index, answer]) => {
    const correct = questions[+index]?.resposta_correta.texto;
    return answer.selectedAnswer === correct ? acc + 1 : acc - 1;
  }, 0);

  const countCorrect = () =>
    Object.entries(quizState.answers).filter(
      ([i, ans]) => ans.selectedAnswer === questions[+i]?.resposta_correta.texto
    ).length;

  const countIncorrect = () =>
    Object.entries(quizState.answers).filter(
      ([i, ans]) => ans.selectedAnswer !== questions[+i]?.resposta_correta.texto
    ).length;

  const getTimerColor = (s: number) =>
    s <= 40 ? "bg-green-200 text-green-800" : s <= 55 ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800";

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-6 overflow-auto">
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg font-semibold ${getTimerColor(timeElapsed)}`}>
        ⏱ {formatTime(timeElapsed)}
      </div>

      <article className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-5 sm:p-6 md:p-8 space-y-6 h-fit">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-xl font-bold">
            Questão {quizState.currentQuestionIndex + 1} de {totalQuestions}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-md font-semibold text-black flex items-center gap-2">
              <div className="bg-purple-400 p-1 rounded">
                <FaRegStar className="text-white" />
              </div>
              Pontuação: {score}
            </span>
            <button
              onClick={() => setShowHint(p => !p)}
              className="text-md font-semibold text-black flex items-center gap-2 focus:outline-none cursor-pointer"
              aria-expanded={showHint}
            >
              <div className="bg-purple-400 p-1 rounded">
                <IoMdHelpCircle className="text-white" />
              </div>
              Dicas
            </button>
          </div>
        </header>

        <section>
          <h2 className="font-semibold text-lg mb-6 break-words">{currentQuestion.pergunta}</h2>

          <ul className="space-y-3">
            {currentQuestion.alternativas.map((alt, i) => {
              const correct = alt === currentQuestion.resposta_correta.texto;
              const selected = alt === selectedAnswer;
              const bg = isAnswered
                ? selected && correct
                  ? "bg-green-100"
                  : selected
                  ? "bg-red-100"
                  : correct
                  ? "bg-green-50"
                  : "bg-white"
                : "bg-white";

              return (
                <li
                  key={i}
                  onClick={() => handleAnswerClick(alt)}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition ${bg} hover:bg-gray-100`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
                      selected ? (correct ? "border-green-600" : "border-red-600") : "border-gray-400"
                    }`}
                  >
                    {selected && (
                      <span
                        className={`w-3 h-3 rounded-full ${correct ? "bg-green-600" : "bg-red-600"}`}
                      />
                    )}
                  </span>
                  <span>{alt}</span>
                </li>
              );
            })}
          </ul>

          {showHint && currentGuide && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-sm text-gray-800">
              <p className="font-semibold text-purple-700 mb-2">💡 Dica adicional:</p>
              <p>{currentGuide.dica}</p>
              {currentGuide.exemplo && (
                <p className="text-purple-800 italic mt-1">Exemplo: {currentGuide.exemplo}</p>
              )}
            </div>
          )}

          {isAnswered && (
            <div className="mt-5 text-sm sm:text-base">
              {isCorrect ? (
                <p className="text-green-700 font-semibold">✅ Resposta correta!</p>
              ) : (
                <div className="text-red-700">
                  <p className="font-semibold">
                    ❌ Resposta incorreta. A correta era:{" "}
                    <span className="underline">{currentQuestion.resposta_correta.texto}</span>
                  </p>
                  <p className="text-black mt-1">{currentQuestion.resposta_correta.explicacao}</p>
                  <a
                    href={currentQuestion.resposta_correta.link_referencia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-800 mt-1 inline-block"
                  >
                    🔗 Saiba mais
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestionIndex === 0}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold transition ${
              quizState.currentQuestionIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-400 hover:bg-purple-500 text-white"
            }`}
          >
            Voltar
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold transition ${
              isAnswered
                ? "bg-purple-400 hover:bg-purple-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {quizState.currentQuestionIndex < totalQuestions - 1 ? "Avançar" : "Finalizar Quiz"}
          </button>
        </div>
      </article>
    </div>
  );
};

export default QuizPage;