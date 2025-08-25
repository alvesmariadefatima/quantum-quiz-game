import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate} from "react-router-dom";

const InsertNickname = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateNickname = () => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[:;<>,.?~/-]).+$/;

    if (nickname.trim() === "") {
      setError("⚠️ O campo é obrigatório.");
    } else if (!pattern.test(nickname)) {
      setError("⚠️ O apelido deve conter letras, números e símbolos especiais.");
    } else {
      setError("");
      navigate("/quiz");
      // prosseguir para a próxima rota, salvar localStorage, etc
      console.log("Apelido válido:", nickname);
      navigate("/quiz");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="bg-white shadow-lg rounded-xl p-6 w-80 text-center">
        <h1 className="text-lg font-semibold mb-4">Insira seu apelido</h1>

        <div className="flex items-center border-b-2 border-purple-400 py-2 mb-2">
          <FaUser className="text-purple-900 mr-2" />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Digite seu apelido"
            className="flex-1 outline-none bg-transparent text-purple-900 placeholder-purple-400"
          />
        </div>

        <button
            onClick={validateNickname}
            className="bg-purple-400 text-white text-sm px-3 py-1 rounded w-40 cursor-pointer hover:bg-purple-500 transition mt-6"
        >
            Começar
        </button>

        {error && (
            <p className="text-sm text-red-500 mt-4 mb-4 px-5">{error}</p>
        )}
      </section>
    </div>
  );
};

export default InsertNickname;