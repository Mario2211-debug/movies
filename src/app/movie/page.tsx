"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Eye, EyeOff, Star, List } from "lucide-react";
import { useMovie } from "@/context/useMovie";
import AllMovies from "@/components/AllMovies";
import WatchedMovies from "@/components/WatchedMovies";
import NotWatchedMovies from "@/components/NotWatchedMovies";
import MoviesByRating from "@/components/MoviesByRating";

type ViewMode = 'all' | 'watched' | 'notWatched' | 'byRating';

export default function HomePage() {
  const { 
    movies, 
    loadAllMovies, 
    loadWatchedMovies, 
    loadNotWatchedMovies, 
    loadMoviesByRating 
  } = useMovie();
  
  const [currentView, setCurrentView] = useState<ViewMode>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  useEffect(() => {
    loadAllMovies();
  }, [loadAllMovies]);

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    switch (view) {
      case 'all':
        loadAllMovies();
        break;
      case 'watched':
        loadWatchedMovies();
        break;
      case 'notWatched':
        loadNotWatchedMovies();
        break;
      case 'byRating':
        loadMoviesByRating();
        break;
    }
  };

  const handleEditMovie = (movie: any) => {
    setSelectedMovie(movie);
    setShowEditModal(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'all':
        return <AllMovies onEditMovie={handleEditMovie} />;
      case 'watched':
        return <WatchedMovies onEditMovie={handleEditMovie} />;
      case 'notWatched':
        return <NotWatchedMovies onEditMovie={handleEditMovie} />;
      case 'byRating':
        return <MoviesByRating onEditMovie={handleEditMovie} />;
      default:
        return <AllMovies onEditMovie={handleEditMovie} />;
    }
  };

  return (
    <>
      <section className="px-8 md:px-20 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleViewChange('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'all' 
                  ? 'bg-[#9E9E9E]/50 text-sm blur-cover px-3 py-2 text-gray-300' 
                  : 'bg-[#b7c8d4]/10 text-sm text-[#b7c8d4] px-3 py-2 hover:bg-gray-600/50'
              }`}
            >
              <List size={16} />
              Todos
            </button>
            <button
              onClick={() => handleViewChange('watched')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'watched' 
                  ? 'bg-green-500/50 text-sm blur-cover text-white' 
                  : 'bg-[#b7c8d4]/10 text-sm blur-cover text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <Eye size={16} />
              Assistidos
            </button>
            <button
              onClick={() => handleViewChange('notWatched')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'notWatched' 
                  ? 'bg-orange-600 text-sm blur-cover text-white' 
                  : 'bg-[#b7c8d4]/10 text-sm blur-cover text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <EyeOff size={16} />
              Para Assistir
            </button>
            <button
              onClick={() => handleViewChange('byRating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'byRating' 
                  ? 'bg-yellow-600 text-sm blur-cover text-white' 
                  : 'bg-[#b7c8d4]/10 text-sm blur-cover text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <Star size={16} />
              Por Rating
            </button>
          </div>
        </div>
      </section>
      {renderCurrentView()}



      {showEditModal && selectedMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Editar Filme</h3>
            <p className="text-gray-400 mb-4">Redirecionando para página de edição...</p>
            <div className="flex gap-2">
              <button
                onClick={() => window.location.href = `/movie/${selectedMovie._id}`}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                Continuar
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMovie(null);
                }}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
