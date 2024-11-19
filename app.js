import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cadastroRoutes from './routes/cadastroRoutes.js';
import inicioRoutes from './routes/inicioRoutes.js';
import session from 'express-session';
import ejs from 'ejs';  // Importando o ejs
import afericaoRoutes from './routes/afericaoRoutes.js';
import afericaoController from './controllers/afericaoController.js';
// app.js
import perfilRoutes from './routes/perfilRoutes.js'; // Verifique se está correto


const app = express(); // Mover a declaração do app para o início

// Configuração para uso de __dirname em módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura o EJS como o motor de visualização
app.set('view engine', 'ejs');  // Definindo o EJS como template engine
app.set('views', path.join(__dirname, 'views'));  // Caminho onde estão as views

// Configuração do session
app.use(session({
    secret: 'seuSegredoAqui',  // Alterar para um segredo real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Altere para true se usar HTTPS
}));

// Middleware para interpretar dados de formulários
app.use(express.urlencoded({ extended: true })); // Mover para cima, antes das rotas
app.use(express.json());  // Necessário para interpretar JSON, se for o caso
app.use('/perfil', perfilRoutes);
app.use('/api', afericaoRoutes);

// DELETE route para deletar a aferição
app.delete('/api/afericao/deletar/:id', afericaoController.deletarAfericao); // Agora está após a declaração do app



// Configuração para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Definindo rotas
app.use('/cadastro', cadastroRoutes);  // Rotas de cadastro
app.use(inicioRoutes);  // Rota inicial

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
