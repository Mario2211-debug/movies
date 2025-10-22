'use client'

import React, {useState, useContext, createContext, useEffect, useCallback} from 'react'
import { Movie, movieUpdate} from '@/type'
import { createMovie, updateMovie, getMovies, getMoviesById, deleteMovie, getWatchedMovies, getNotWatchedMovies, getMoviesByRating } from '@/services/api'

interface MovieContextType{
    movies: Movie[],
    loading: boolean,
    handleCreate: (data: Movie) => Promise<void>;
    handleUpdateData: (id:string , data: movieUpdate) => Promise<void>;
    handleMovieById: (id: string) => Promise<Movie | undefined>;
    handleUpdateRating: (id: string, rating: number) => Promise<void>;
    handleToggleWatched: (id: string, watched: boolean) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    loadWatchedMovies: () => Promise<void>;
    loadNotWatchedMovies: () => Promise<void>;
    loadMoviesByRating: () => Promise<void>;
    loadAllMovies: () => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export function MovieProvider({children} : {children: React.ReactNode})
{
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(false)



    const handleCreate = async (movie: Movie) => {
       try {
        const data = await createMovie(movie);
        setMovies((prev) => [...prev, data]);
       } catch (error) {
        
       }
    }

    const handleUpdateData = async (id: string, updateData: movieUpdate ) => {
        try {
            const data = await updateMovie(id, updateData);
            setMovies((prev) => prev.map((m) => (m._id === id ? {...m, ...data} : m)));
        } catch (error) {
            
        }

    }

    const handleMovieById = async (id: string ) => {
        try {
            const data = await getMoviesById(id);
            return data;
        } catch (error) {
            console.error('Error fetching movie by ID:', error);
            return undefined;
        }
    }

    const handleUpdateRating = async (id: string, rating: number) => {
        try {
            await updateMovie(id, { rating });
            setMovies((prev) => prev.map((m: Movie) => (m._id === id ? {...m, rating} : m)));
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    }

    const handleToggleWatched = async (id: string, watched: boolean) => {
        try {
            await updateMovie(id, { watched });
            setMovies((prev) => prev.map((m: Movie) => (m._id === id ? {...m, watched} : m)));
        } catch (error) {
            console.error('Error updating watched status:', error);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteMovie(id);
            setMovies((prev) => prev.filter((m: Movie) => m._id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    const loadWatchedMovies = useCallback(async () => {
        if (loading) return; 
        setLoading(true);
        try {
            const movies = await getWatchedMovies();
            setMovies(movies);
        } catch (error) {
            console.error('Error loading watched movies:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const loadNotWatchedMovies = useCallback(async () => {
        if (loading) return; 
        setLoading(true);
        try {
            const movies = await getNotWatchedMovies();
            setMovies(movies);
        } catch (error) {
            console.error('Error loading not watched movies:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const loadMoviesByRating = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const movies = await getMoviesByRating();
            setMovies(movies);
        } catch (error) {
            console.error('Error loading movies by rating:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const loadAllMovies = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const movies = await getMovies();
            setMovies(movies);
        } catch (error) {
            console.error('Error loading all movies:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);
    return(
    <MovieContext.Provider value={{
        movies, 
        loading,
        handleCreate, 
        handleUpdateData, 
        handleMovieById, 
        handleUpdateRating, 
        handleToggleWatched,
        handleDelete,
        loadWatchedMovies,
        loadNotWatchedMovies,
        loadMoviesByRating,
        loadAllMovies
    }}>
        {children}
    </MovieContext.Provider>)
}

export const useMovie = () => {
    const context = useContext(MovieContext)
    if(!context){
        throw new Error("useMovie must be used within a Movie Provider");
    }
return context
};