"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Clock, Film, CheckCircle, Eye, Star } from "lucide-react";
import { useMovie } from "@/context/useMovie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/type";
import StarRating from "@/components/StarRating";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = id?.toString() || ''
  const {handleMovieById, handleUpdateRating, handleToggleWatched} = useMovie()
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await handleMovieById(movieId);
      
      if (res !== undefined) {
        console.log(res)
        setMovie(res);
      }
    };
    fetchMovie();
  }, [handleMovieById, movieId]);

  console.log("movie em id", movie)

  const handleRatingChange = async (rating: number) => {
    if (movie) {
      await handleUpdateRating(movie._id, rating);
      setMovie({ ...movie, rating });
    }
  };

  const handleWatchedToggle = async () => {
    if (movie) {
      const newWatchedStatus = !movie.watched;
      await handleToggleWatched(movie._id, newWatchedStatus);
      setMovie({ ...movie, watched: newWatchedStatus });
    }
  };

  return (
    <div className={`h-full text-white font-sans`}>
   
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
  
        <div className="absolute bottom-10 left-10 max-w-2xl z-10 text-white">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {movie?.title}
          </motion.h1>
          <div className="flex items-center gap-4 mb-2">
            <p className="text-gray-300">{movie?.gender} • {movie?.year ? new Date(movie.year).getFullYear() : 'N/A'}</p>
            {movie?.watched && (
              <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-sm">
                <CheckCircle size={14} />
                <span>Assistido</span>
              </div>
            )}
            {movie?.rating && movie.rating > 0 && (
              <div className="flex items-center gap-1 bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                <Star size={14} className="fill-current" />
                <span>{movie.rating}/5</span>
              </div>
            )}
          </div>
          <button className="mt-4 flex items-center gap-2 bg-[#b7c8d4]/10 text-[#b7c8d4] px-4 py-2 rounded-lg hover:bg-[#b7c8d4]/20 transition">
            <Play size={18} /> Assistir Agora
          </button>
        </div>
      </section>

   
      <section className="px-8 md:px-20 py-12">
        <h2 className="text-2xl font-semibold text-[#d6d0c4] mb-4">Sinopse</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro neque, reprehenderit perspiciatis qui alias, cumque vel voluptatum fuga dolor culpa eligendi, accusamus vitae? Iure vitae dolor laudantium porro nobis aliquam.
        </p>
      </section>

     
      <section className="px-8 md:px-20 py-8 border-t border-gray-700">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-[#d6d0c4] mb-6">Controles</h2>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-medium text-[#d6d0c4]">Status</h3>
              <button
                onClick={handleWatchedToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  movie?.watched 
                    ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                    : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                }`}
              >
                {movie?.watched ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Assistido</span>
                  </>
                ) : (
                  <>
                    <Eye size={20} />
                    <span>Marcar como Assistido</span>
                  </>
                )}
              </button>
            </div>
            {movie?.watched && (
              <p className="text-sm text-green-400 flex items-center gap-2">
                <CheckCircle size={16} />
                Este filme foi marcado como assistido
              </p>
            )}
          </div>

          
          <div>
            <h3 className="text-lg font-medium text-[#d6d0c4] mb-4">Sua Avaliação</h3>
            <div className="flex items-center gap-4">
              <StarRating
                rating={movie?.rating || 0}
                onRatingChange={handleRatingChange}
                size="lg"
              />
              {movie?.rating && movie.rating > 0 && (
                <span className="text-gray-300 text-sm">
                  Avaliação: {movie.rating}/5 estrelas
                </span>
              )}
            </div>
            {(!movie?.rating || movie.rating === 0) && (
              <p className="text-sm text-gray-400 mt-2">
                Clique nas estrelas para avaliar este filme
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <Film size={20} className="text-[#b7c8d4]" />
          <h3 className="text-xl font-semibold text-[#d6d0c4]">
            Recomendações
          </h3>
        </div>
      </section>
    </div>
  );
}
