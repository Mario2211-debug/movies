"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Film, Calendar, Tag, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMovie } from "@/context/useMovie";
import StarRating from "@/components/StarRating";

interface FormData {
  title: string;
  year: string;
  gender: string;
  watched: boolean;
  rating: number;
}

interface FormErrors {
  title?: string;
  year?: string;
  gender?: string;
}

export default function EditMoviePage() {
  const router = useRouter();
  const { id } = useParams();
  const movieId = id?.toString() || '';
  const { handleMovieById, handleUpdateData } = useMovie();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    year: "",
    gender: "",
    watched: false,
    rating: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Carregar dados do filme
  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      
      try {
        const movie = await handleMovieById(movieId);
        if (movie) {
          setFormData({
            title: movie.title || "",
            year: movie.year ? new Date(movie.year).getFullYear().toString() : "",
            gender: movie.gender || "",
            watched: movie.watched || false,
            rating: movie.rating || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, handleMovieById]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }

    if (!formData.year.trim()) {
      newErrors.year = "Ano é obrigatório";
    } else {
      const year = parseInt(formData.year);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 5) {
        newErrors.year = "Ano deve estar entre 1900 e " + (currentYear + 5);
      }
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gênero é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        title: formData.title,
        year: new Date(parseInt(formData.year), 0, 1),
        gender: formData.gender,
        watched: formData.watched,
        rating: formData.rating,
      };

      await handleUpdateData(movieId, updateData);
      
      router.push(`/movie/${movieId}`);
    } catch (error) {
      console.error("Error updating movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    handleInputChange("rating", rating);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90 text-white flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b7c8d4]"></div>
          <span className="text-[#b7c8d4]">Carregando filme...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="px-8 md:px-20 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#b7c8d4] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <div className="h-6 w-px bg-gray-600"></div>
          <h1 className="text-3xl font-bold text-[#d6d0c4]">Editar Filme</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-[#d6d0c4] mb-3">
                <Film size={20} />
                Título do Filme
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b7c8d4] transition-colors ${
                  errors.title ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Digite o título do filme"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-[#d6d0c4] mb-3">
                <Calendar size={20} />
                Ano de Lançamento
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b7c8d4] transition-colors ${
                  errors.year ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Ex: 2023"
                min="1900"
                max={new Date().getFullYear() + 5}
              />
              {errors.year && (
                <p className="text-red-400 text-sm mt-1">{errors.year}</p>
              )}
            </div>

          
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-[#d6d0c4] mb-3">
                <Tag size={20} />
                Gênero
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#b7c8d4] transition-colors ${
                  errors.gender ? "border-red-500" : "border-gray-600"
                }`}
              >
                <option value="">Selecione um gênero</option>
                <option value="Ação">Ação</option>
                <option value="Aventura">Aventura</option>
                <option value="Comédia">Comédia</option>
                <option value="Drama">Drama</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Terror">Terror</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Documentário">Documentário</option>
                <option value="Animação">Animação</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Crime">Crime</option>
                <option value="Mistério">Mistério</option>
                <option value="Guerra">Guerra</option>
                <option value="Western">Western</option>
                <option value="Musical">Musical</option>
                <option value="Biografia">Biografia</option>
                <option value="História">História</option>
                <option value="Família">Família</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.gender && (
                <p className="text-red-400 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-[#d6d0c4] mb-3">
                <Film size={20} />
                Status
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.watched}
                    onChange={(e) => handleInputChange("watched", e.target.checked)}
                    className="w-4 h-4 text-[#b7c8d4] bg-gray-700 border-gray-600 rounded focus:ring-[#b7c8d4] focus:ring-2"
                  />
                  <span className="text-gray-300">Já assisti este filme</span>
                </label>
              </div>
            </div>

            
            {formData.watched && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <label className="flex items-center gap-2 text-lg font-medium text-[#d6d0c4] mb-3">
                  <Star size={20} />
                  Sua Avaliação
                </label>
                <div className="bg-gray-700/30 p-6 rounded-lg">
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={handleRatingChange}
                    size="lg"
                  />
                  {formData.rating > 0 && (
                    <p className="text-gray-300 text-sm mt-2">
                      Avaliação: {formData.rating}/5 estrelas
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            <div className="pt-6 flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-[#b7c8d4] text-gray-900 hover:bg-[#b7c8d4]/80"
                }`}
              >
                <Save size={20} />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
