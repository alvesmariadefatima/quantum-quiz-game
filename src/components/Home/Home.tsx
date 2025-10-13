import { CardSimulador } from "../CardSimulator/CardSimulador";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 gap-8 px-4">
        <h1 className=" mt-16 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
          O universo quântico te espera!
        </h1>

        <Link
          to="/nickname"
          className="mt-6 sm:mt-10 bg-white text-purple-600 rounded-full px-8 sm:px-10 py-3 sm:py-5 text-lg sm:text-2xl shadow-lg hover:bg-purple-700 hover:text-white hover:scale-105 transition-all duration-300"
        >
          Jogar
        </Link>

        <div id="simuladores" className="flex flex-wrap justify-center items-start gap-8 sm:gap-10 mt-10 w-full max-w-6xl">
          <CardSimulador
            titulo="IBM Qiskit"
            descricao="Aprenda IBM Qiskit na prática! Simule seus circuitos quânticos e codifique o futuro."
            imagem="./logotipo-ibm-qiskit.png"
            link="https://www.ibm.com/quantum/qiskit"
          />

          <CardSimulador
            titulo="Google Cirq"
            descricao="Construa, simule, inove. Aprenda Google Cirq e prepare-se para programar os processadores quânticos de amanhã."
            imagem="./logotipo-google-cirq.png"
            link="https://quantumai.google/cirq"
          />
        </div>
      </div>
  <Footer />
    </>
  );
};

export default Home;