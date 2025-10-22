import { Plus } from "lucide-react";
import Link from "next/link";

export default function Navbar(){
    return(
    <>

          <nav className="flex items-center justify-between px-8 py-4 blur-cover">
        <div className="text-2xl font-bold text-[#d6d0c4] tracking-tight">
          <a href="/movie">
          CineVerse
          </a>
          </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-gray-300 text-sm">
            <a href="#" className="hover:text-[#b7c8d4] transition">Filmes</a>
            <a href="#" className="hover:text-[#b7c8d4] transition">Séries</a>
            <a href="#" className="hover:text-[#b7c8d4] transition">Novidades</a>
          </div>
          <a 
            href="/movie/new" 
            className="flex items-center gap-2 bg-[#b7c8d4]/10 text-[#b7c8d4] px-3 py-2 rounded-lg hover:bg-[#b7c8d4]/20 transition text-sm"
          >
            <Plus size={16} />
            Adicionar Filme
          </a>
        </div>
      </nav>
      </>)
}