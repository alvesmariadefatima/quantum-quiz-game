import atomo from './components/assets/atomo.png';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${atomo})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px',
        backgroundColor: 'transparent',
        minHeight: '100vh',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;