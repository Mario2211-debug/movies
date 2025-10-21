import { Movie, movieUpdate } from "@/type";

// GET /api/movies - Retorna todos os filmes ou com filtros
export const getMovies = async (filters?: { watched?: boolean; sortBy?: string; order?: string }) => {
    let url = '/api/movies';
    const params = new URLSearchParams();
    
    if (filters?.watched !== undefined) {
        params.append('watched', filters.watched.toString());
    }
    if (filters?.sortBy) {
        params.append('sortBy', filters.sortBy);
    }
    if (filters?.order) {
        params.append('order', filters.order);
    }
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }
    
    const res = await fetch(url);
    const movies = await res.json();
    return movies;
}

// GET /api/movies?watched=true - Retorna apenas filmes assistidos
export const getWatchedMovies = async () => {
    return getMovies({ watched: true });
}

// GET /api/movies?watched=false - Retorna apenas filmes não assistidos
export const getNotWatchedMovies = async () => {
    return getMovies({ watched: false });
}

// GET /api/movies?sortBy=rating&order=desc - Retorna filmes ordenados por rating
export const getMoviesByRating = async () => {
    return getMovies({ sortBy: 'rating', order: 'desc' });
}

export const updateMovie = async (id: string, data: movieUpdate) => {
    const res = await fetch(`/api/movie/${id}`,  {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    });
    const movie = await res.json();
    return movie;
}


export const getMoviesById = async (id: any) => {
    const res = await fetch(`/api/movie/${id}`,  {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    });
    const movies = await res.json();
    return movies;
}

export const createMovie = async (data: Movie) => {
    const response = await fetch('/api/movie', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    return response.json();
}

// DELETE /api/movies/:id - Deleta um filme
export const deleteMovie = async (id: string) => {
    const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'}
    });
    return response.json();
}