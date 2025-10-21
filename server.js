// ===== CONSTANTES FIXAS =====
import express from 'express'
import cors from 'cors'
import next from 'next'
import dotenv from 'dotenv'
import { dbConnect } from './config/dbConnect.js'
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());

// Esta constante é relativa às coleções da tua base de dados e deves acrescentar mais se for o caso
import { Movie } from './models/Movie.js'

// ===== ENDPOINTS DA API =====

// POST /api/movie - Adiciona um novo filme à coleção "Movie"
app.post('/api/movie', async (req, res) => {
  try {
    console.log("🔥 Chegou na rota POST /api/movie");
    const { title, year, gender, watched, rating  } = req.body;
    
    if (!title) {
      return res.status(400).json({ erro: 'Titulo é obrigatório' });
    }

    const novoMovie = new Movie({
        title,
        year,
        gender,
        watched,
        rating
    });
    const movieSalvo = await novoMovie.save();
    res.status(201).json(movieSalvo);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ erro: 'Este filme já existe' });
    }
    console.error('Erro ao criar nome:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


// PUT /api/movie/:id - Atualiza um dos campos da coleção "Movie"
app.put('/api/movie/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ erro: 'Pelo menos um dos campos é obrigatório' });
      }
  
      const movieAtualizado = await Movie.findByIdAndUpdate(id, data, {
        new:true,
        runValidators:true
      });
      console.log(movieAtualizado)
      res.status(201).json(movieAtualizado);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ erro: 'Este filme já existe' });
      }
      console.error('Erro ao criar nome:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });


// GET /api/movies - Retorna todos os filmes existentes com filtros opcionais
app.get('/api/movies', async (req, res) => {
  try {
    const { watched, sortBy, order } = req.query;
    let query = {};
    let sort = {};

    // Filtro por watched
    if (watched !== undefined) {
      query.watched = watched === 'true';
    }

    // Ordenação
    if (sortBy === 'rating') {
      sort.rating = order === 'desc' ? -1 : 1;
    } else {
      sort.title = 1; // Ordenação padrão por título
    }

    const movies = await Movie.find(query).sort(sort);
    res.json(movies);
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/movie/:id - Retorna um filme em particular
app.get('/api/movie/:id', async (req, res) => {
    try {
        const {id} = req.params
      const movie = await Movie.findById(id);
      res.json(movie);
    } catch (error) {
      console.error('Erro ao carregar filme:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });

// DELETE /api/movies/:id - Deleta um filme
app.delete('/api/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ erro: 'ID do filme é obrigatório' });
      }
  
      const movieDeletado = await Movie.findByIdAndDelete(id);
      
      if (!movieDeletado) {
        return res.status(404).json({ erro: 'Filme não encontrado' });
      }
      
      res.status(200).json({ mensagem: 'Filme deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar filme:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  

// ===== INICIALIZAÇÃO DO SERVIDOR (também não se deve mexer)=====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await dbConnect();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();