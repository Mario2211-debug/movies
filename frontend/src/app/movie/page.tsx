"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Star, List } from "lucide-react";
import { useMovie } from "@/context/useMovie";
import AllMovies from "@/components/AllMovies";
import WatchedMovies from "@/components/WatchedMovies";
import NotWatchedMovies from "@/components/NotWatchedMovies";
import MoviesByRating from "@/components/MoviesByRating";

type ViewMode = 'all' | 'watched' | 'notWatched' | 'byRating';

export default function HomePage() {
  const { 
    movies, 
    loading,
    loadAllMovies, 
    loadWatchedMovies, 
    loadNotWatchedMovies, 
    loadMoviesByRating 
  } = useMovie();
  
  const [currentView, setCurrentView] = useState<ViewMode>('all');

  useEffect(() => {
    loadAllMovies();
  }, []);

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
    window.location.href = `/movie/${movie._id}/edit`;
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
      
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b7c8d4]"></div>
          <span className="ml-4 text-[#b7c8d4]">Carregando filmes...</span>
        </div>
      ) : (
        renderCurrentView()
      )}


    </>
  );
}
