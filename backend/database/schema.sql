DROP TABLE IF EXISTS mensagens_contato, fotos_imovel, imoveis, corretores CASCADE;

CREATE TABLE corretores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE imoveis (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  finalidade VARCHAR(10) NOT NULL CHECK (finalidade IN ('aluguel', 'venda')),
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('apartamento', 'casa', 'cobertura', 'terreno', 'comercial')),
  preco NUMERIC(12, 2) NOT NULL CHECK (preco > 0),
  bairro VARCHAR(80) NOT NULL,
  cidade VARCHAR(80) NOT NULL,
  quartos SMALLINT NOT NULL DEFAULT 0 CHECK (quartos >= 0),
  banheiros SMALLINT NOT NULL DEFAULT 0 CHECK (banheiros >= 0),
  vagas SMALLINT NOT NULL DEFAULT 0 CHECK (vagas >= 0),
  area NUMERIC(8, 2) CHECK (area > 0),
  descricao TEXT,
  status VARCHAR(15) NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'alugado', 'vendido', 'inativo')),
  corretor_id INTEGER REFERENCES corretores (id),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE fotos_imovel (
  id SERIAL PRIMARY KEY,
  imovel_id INTEGER NOT NULL REFERENCES imoveis (id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  principal BOOLEAN NOT NULL DEFAULT FALSE,
  ordem SMALLINT NOT NULL DEFAULT 1
);

CREATE TABLE mensagens_contato (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  telefone VARCHAR(20),
  mensagem TEXT NOT NULL,
  imovel_id INTEGER REFERENCES imoveis (id) ON DELETE SET NULL,
  status VARCHAR(10) NOT NULL DEFAULT 'nova' CHECK (status IN ('nova', 'lida', 'respondida')),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_imoveis_finalidade_status ON imoveis (finalidade, status);
CREATE INDEX idx_fotos_imovel_imovel ON fotos_imovel (imovel_id);
