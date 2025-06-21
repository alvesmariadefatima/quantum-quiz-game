import Footer from "../Footer/Footer"

const Home = () => {
    return (
        <>
        <div className="flex items-center justify-center min-h-screen">
            <section className="bg-white shadow-lg rounded-xl p-6 w-80 text-center">
            <h1 className="text-xl font-semibold mb-4">⚛️ Quantum Quiz</h1>
    
            <button className="bg-purple-400 text-white text-sm px-4 py-2 rounded w-full mb-2">
                Iniciar Partida
            </button>
    
            <button className="bg-purple-400 text-white text-sm px-4 py-2 rounded w-full">
                Regras do Jogo
            </button>
        </section>
    </div>
    <Footer />
        </>
    );
}

export default Home;