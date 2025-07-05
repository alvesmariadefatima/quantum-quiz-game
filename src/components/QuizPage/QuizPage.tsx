import { useState } from 'react';
import questions from '../../questions/questions.json';
import answerGuides from '../../hints/answer_guides.json';
import { FaRegStar } from 'react-icons/fa6';
import { IoMdHelpCircle } from "react-icons/io";

interface Question {
  pergunta: string;
  alternativas: string[];
  resposta_correta: string;
}

interface QuizState {
  currentQuestionIndex: number;
  answers: {
    [index: number]: {
      selectedAnswer: string;
      isAnswered: boolean;
    };
  };
}

const QuizPage = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
  });

  const [showHint, setShowHint] = useState(false);

  const currentQuestion: Question = questions[quizState.currentQuestionIndex];
  const totalQuestions = questions.length;

  const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
  const selectedAnswer = currentAnswer?.selectedAnswer || null;
  const isAnswered = currentAnswer?.isAnswered || false;
  const isCorrect = selectedAnswer === currentQuestion.resposta_correta;

  // Busca a dica correspondente pelo id da questão atual
  const currentHint = answerGuides.find(
    (hint) => hint.id === `q${quizState.currentQuestionIndex + 1}`
  )?.dica;

  const handleAnswerClick = (answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestionIndex]: {
          selectedAnswer: answer,
          isAnswered: true,
        },
      },
    }));
    setShowHint(false); // opcional: esconder dica quando responder
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < totalQuestions - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setShowHint(false);
    } else {
      alert(`🎉 Fim do quiz! Sua pontuação final foi: ${calculateScore()}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
      setShowHint(false);
    }
  };

  const calculateScore = (): number => {
    return Object.entries(quizState.answers).reduce((score, [index, answer]) => {
      const correctAnswer = questions[+index].resposta_correta;
      return answer.selectedAnswer === correctAnswer ? score + 1 : score - 1;
    }, 0);
  };

  const score = calculateScore();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6 overflow-auto">
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
              onClick={() => setShowHint((prev) => !prev)}
              className="text-md font-semibold text-black flex items-center gap-2 focus:outline-none cursor-pointer"
              aria-expanded={showHint}
              aria-controls="hint-content"
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
            {currentQuestion.alternativas.map((alt, index) => {
              const isCorrectAnswer = alt === currentQuestion.resposta_correta;
              const isSelected = alt === selectedAnswer;

              let bgClass = 'bg-white';
              if (isAnswered) {
                if (isSelected && isCorrectAnswer) bgClass = 'bg-green-100';
                else if (isSelected && !isCorrectAnswer) bgClass = 'bg-red-100';
                else if (isCorrectAnswer) bgClass = 'bg-green-50';
              }

              return (
                <li
                  key={index}
                  onClick={() => handleAnswerClick(alt)}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition ${bgClass} hover:bg-gray-100 break-words text-sm sm:text-base`}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border-2 rounded-full ${
                      isSelected
                        ? isCorrectAnswer
                          ? 'border-green-600'
                          : 'border-red-600'
                        : 'border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isCorrectAnswer ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      />
                    )}
                  </span>
                  <span className="text-gray-800">{alt}</span>
                </li>
              );
            })}
          </ul>

          {isAnswered && (
            <div className="mt-5 text-sm sm:text-base">
              {isCorrect ? (
                <p className="text-green-700 font-semibold">✅ Resposta correta!</p>
              ) : (
                <p className="text-red-700 font-semibold">
                  ❌ Resposta incorreta. A correta era:{' '}
                  <span className="underline">{currentQuestion.resposta_correta}</span>
                </p>
              )}
            </div>
          )}

          {showHint && currentHint && (
            <div
              id="hint-content"
              className="mt-5 p-4 bg-yellow-100 rounded border border-yellow-300 text-yellow-800 text-sm sm:text-base"
              role="region"
              aria-live="polite"
            >
              💡 {currentHint}
            </div>
          )}
        </section>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestionIndex === 0}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold text-base sm:text-xl transition ${
              quizState.currentQuestionIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-400 hover:bg-purple-500 text-white cursor-pointer'
            }`}
          >
            Voltar
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold text-base sm:text-xl transition ${
              isAnswered
                ? 'bg-purple-400 hover:bg-purple-500 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {quizState.currentQuestionIndex < totalQuestions - 1
              ? 'Avançar'
              : 'Finalizar Quiz'}
          </button>
        </div>
      </article>
    </div>
  );
};

export default QuizPage;