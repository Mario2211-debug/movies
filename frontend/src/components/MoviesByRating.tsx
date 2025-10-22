"use client";

import { motion } from "framer-motion";
import { Play, Film, Trash2, Edit, Star } from "lucide-react";
import { useMovie } from "@/context/useMovie";
import { useState } from "react";

interface MoviesByRatingProps {
  onEditMovie: (movie: any) => void;
}

export default function MoviesByRating({ onEditMovie }: MoviesByRatingProps) {
  const { movies, handleDelete } = useMovie();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este filme?')) {
      setDeletingId(id);
      try {
        await handleDelete(id);
      } catch (error) {
        console.error('Error deleting movie:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <>
    
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 md:px-20">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Filmes por Avaliação
        </motion.h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          Os melhores filmes da sua coleção, ordenados por suas avaliações pessoais.
        </p>
      </section>

      
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 pb-16">
        {movies.map((movie, index) => (
          <motion.div
            key={movie?._id}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-xl overflow-hidden shadow-lg blur-cover p-1 ${
              movie.rating >= 4 ? 'border border-yellow-500/30' : 
              movie.rating >= 3 ? 'border border-orange-500/20' : 
              'border border-gray-500/20'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl" />
            <div className="relative p-4 flex flex-col justify-between h-64">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1">
                  {movie.rating > 0 ? (
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      movie.rating >= 4 ? 'bg-yellow-500/20 text-yellow-400' :
                      movie.rating >= 3 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      <Star size={12} className="inline mr-1" />
                      {movie.rating}/5
                    </div>
                  ) : (
                    <div className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                      Sem avaliação
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onEditMovie(movie)}
                    className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                    title="Editar filme"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(movie._id)}
                    disabled={deletingId === movie._id}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                    title="Deletar filme"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <h3 className="text-sm md:text-base font-semibold text-white mb-1">{movie.title}</h3>
                <span className="text-xs md:text-sm text-gray-300 mb-2">{movie.gender}</span>
                <span className="text-xs text-gray-400 mb-2">
                  {movie.year ? new Date(movie.year).getFullYear() : 'N/A'}
                </span>
                {movie.watched && (
                  <div className="text-xs text-green-400 mb-3">✓ Assistido</div>
                )}
                <a 
                  href={`/movie/${movie?._id}`}  
                  className="flex items-center gap-2 text-xs md:text-sm bg-[#b7c8d4]/10 text-[#b7c8d4] px-2 py-1 rounded-lg hover:bg-[#b7c8d4]/20 transition"
                >
                  <Play size={14} /> Ver Detalhes
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {movies.length === 0 && (
        <div className="text-center py-16">
          <Star size={64} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhum filme avaliado</h3>
          <p className="text-gray-500">Avalie alguns filmes para vê-los ordenados por rating!</p>
        </div>
      )}
    </>
  );
}
