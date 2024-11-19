-- tabela usuarios dessa caralha de projeto
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nasc DATE NOT NULL,
    tipo_diabetes VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- tabebal afericoes
CREATE TABLE afericoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    data_hora DATETIME NOT NULL,
    valor_glicemia FLOAT NOT NULL,
    tipo_medicacao VARCHAR(50),
    notas TEXT,
    medicacao_insulina VARCHAR(100),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);