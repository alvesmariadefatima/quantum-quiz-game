import atomo from './components/assets/atomo.png';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import InsertNickname from './components/InsertNickname/InsertNickname';
import GameInstructions from './components/GameInstructions/GameInstructions';
import QuizPage from './components/QuizPage/QuizPage';
import GameResults from './components/GameResults/GameResults';
import ARQuiz from "./components/ARQuiz/ARQuiz";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${atomo})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0',
        backgroundColor: 'transparent',
        minHeight: '100vh',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nickname" element={<InsertNickname />} />
          <Route path="/gameinstructions" element={< GameInstructions/>} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/gameresults" element={<GameResults />} />
          <Route path="/quiz-ar" element={<ARQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;