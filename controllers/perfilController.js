// controllers/perfilController.js
import Usuario from '../models/usuarioModel.js';

const perfilController = {

        // Função para carregar os dados do perfil
        async carregarPerfil(req, res) {
            try {
                const usuarioId = req.session.usuarioId;
                console.log('ID do usuário na sessão:', usuarioId); // Log do ID da sessão
        
                if (!usuarioId) {
                    return res.status(401).json({ message: 'Usuário não autenticado.' });
                }
        
                const usuario = await Usuario.obterUsuarioPorId(usuarioId);
                console.log('Dados do usuário:', usuario); // Log dos dados retornados
        
                if (usuario) {
                    res.json(usuario);
                } else {
                    res.status(404).json({ message: 'Usuário não encontrado.' });
                }
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
                res.status(500).json({ message: 'Erro ao carregar perfil.', error: error.message });
            }
        },
        
    // Função para excluir o perfil do usuário
    async excluirPerfil(req, res) {
        try {
            const { usuarioId } = req.body;

            // Verifica se o usuário está logado e se o ID corresponde ao usuário na sessão
            if (req.session.usuarioId !== usuarioId) {
                return res.status(403).json({ message: 'Ação não permitida.' });
            }

            // Chama o model para excluir o usuário do banco
            const resultado = await Usuario.excluirUsuario(usuarioId);

            if (resultado.affectedRows > 0) {
                // Se o usuário foi deletado com sucesso, destrua a sessão
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao destruir sessão.' });
                    }

                    // Redireciona para a página de login após a exclusão
                    res.redirect('/login');  // Aqui fazemos o redirecionamento
                });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao excluir o perfil:', error);
            res.status(500).json({ message: 'Erro ao excluir o perfil.', error: error.message });
        }
    }
};

export default perfilController;
