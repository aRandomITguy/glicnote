// controllers/cadastroController.js
import Usuario from '../models/usuarioModel.js';


const cadastroController = {
    async registrarUsuario(req, res) {
        try {
            const { nome, sobrenome, data_nasc, tipo_diabetes, email, senha } = req.body;

            // Verificação básica de senha
            if (senha.length < 6 || senha.length > 8) {
                return res.status(400).json({ message: 'A senha deve ter entre 6 e 8 caracteres.' });
            }

            // Cria usuário no banco
            const novoUsuario = await Usuario.criarUsuario({ nome, sobrenome, data_nasc, tipo_diabetes, email, senha });


            // Verificar se o usuário foi criado corretamente
            if (!novoUsuario || !novoUsuario.insertId) {
                return res.status(500).json({ message: 'Erro ao criar o usuário no banco de dados.' });
            }

            // Pega o ID do usuário gerado
            const usuarioId = novoUsuario.insertId;

            // Armazena o ID do usuário na sessão
            req.session.usuarioId = usuarioId;

            // Redireciona para a página de boas-vindas com o ID do usuário na URL
            return res.redirect(`/inicio/${usuarioId}`); // Alteração aqui
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
        }
    }
};

export default cadastroController;
