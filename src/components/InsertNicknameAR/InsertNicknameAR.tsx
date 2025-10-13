import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const buttonClasses = "bg-gradient-to-r from-[#581C87] via-[#482695] to-[#3730A3] text-white p-6 text-white font-semibold py-2 px-4 rounded-lg w-40 cursor-pointer transition duration-300 ease-in-out shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed";

const InsertNicknameAR = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 

    setIsLoading(true);
    setError("");

    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    if (nickname.trim() === "") {
      setError("⚠️ O campo é obrigatório.");
      setIsLoading(false);
      return;
    } else if (!pattern.test(nickname)) {
      setError("⚠️ O apelido deve conter letras e números.");
      setIsLoading(false);
      return;
    }    

    setTimeout(() => {      
      console.log("Apelido válido:", nickname);
      setIsLoading(false);
      navigate("/quiz-ar");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 text-white p-6">
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-xl p-6 w-80 text-center">
        <h1 className="text-lg font-semibold mb-4 text-white">Insira seu apelido</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center border-b-2 border-white py-2 mb-2">
            <FaUser className="text-white mr-2" />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ex.: maria123"
              className="flex-1 outline-none bg-transparent text-white placeholder-white"
            />
          </div>

          <button
            type="submit" 
            className={buttonClasses}
            disabled={isLoading} 
          >
            {isLoading ? "Aguarde..." : "Começar"}
          </button>
        </form>

        {error && (
          <p className="text-sm text-white font-medium mt-4 mb-4 px-5">{error}</p>
        )}
      </section>
    </div>
  );
};

export default InsertNicknameAR;