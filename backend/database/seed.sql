INSERT INTO corretores (nome, telefone) VALUES
  ('Ana Souza', '(48) 99999-0001'),
  ('Carlos Lima', '(48) 99999-0002'),
  ('Marina Costa', '(48) 99999-0003');

INSERT INTO imoveis (titulo, finalidade, tipo, preco, bairro, cidade, quartos, banheiros, vagas, area, descricao, corretor_id) VALUES
  ('Apartamento 2 quartos no Centro', 'aluguel', 'apartamento', 2200, 'Centro', 'Florianópolis', 2, 1, 1, 68, 'Apartamento iluminado, perto de comércio e transporte.', 1),
  ('Casa 3 quartos na Trindade', 'aluguel', 'casa', 3500, 'Trindade', 'Florianópolis', 3, 2, 2, 140, 'Casa ampla com quintal, perto da universidade.', 2),
  ('Apartamento 1 quarto no Campeche', 'aluguel', 'apartamento', 1600, 'Campeche', 'Florianópolis', 1, 1, 1, 42, 'Apartamento compacto a poucos minutos da praia.', 3),
  ('Casa com piscina em Jurerê', 'aluguel', 'casa', 4200, 'Jurerê', 'Florianópolis', 3, 2, 2, 180, 'Casa com piscina e área de churrasco.', 1),
  ('Apartamento 3 quartos no Itacorubi', 'aluguel', 'apartamento', 2900, 'Itacorubi', 'Florianópolis', 3, 2, 1, 95, 'Apartamento espaçoso em região tranquila.', 2),
  ('Cobertura em Coqueiros', 'aluguel', 'cobertura', 5200, 'Coqueiros', 'Florianópolis', 3, 3, 2, 160, 'Cobertura com terraço e vista para o mar.', 3),
  ('Casa com 4 quartos em Canasvieiras', 'venda', 'casa', 850000, 'Canasvieiras', 'Florianópolis', 4, 3, 2, 210, 'Casa em terreno amplo, perto da praia.', 1),
  ('Apartamento 2 quartos no Centro', 'venda', 'apartamento', 480000, 'Centro', 'Florianópolis', 2, 1, 1, 70, 'Apartamento reformado, pronto para morar.', 2),
  ('Apartamento 3 quartos na Lagoa da Conceição', 'venda', 'apartamento', 690000, 'Lagoa da Conceição', 'Florianópolis', 3, 2, 2, 110, 'Apartamento com varanda e vista para a lagoa.', 3),
  ('Cobertura duplex no Campeche', 'venda', 'cobertura', 1250000, 'Campeche', 'Florianópolis', 4, 3, 3, 240, 'Cobertura duplex com churrasqueira e vista panorâmica.', 1),
  ('Casa 3 quartos na Trindade', 'venda', 'casa', 780000, 'Trindade', 'Florianópolis', 3, 2, 2, 150, 'Casa bem localizada, com quintal e edícula.', 2),
  ('Apartamento 1 quarto no Itacorubi', 'venda', 'apartamento', 320000, 'Itacorubi', 'Florianópolis', 1, 1, 1, 45, 'Apartamento ideal para investimento ou primeira moradia.', 3);

INSERT INTO fotos_imovel (imovel_id, url, principal, ordem)
SELECT i.id, '/imoveis/' || i.tipo || '-' || n || '.jpg', (n = 1), n
FROM imoveis i
CROSS JOIN generate_series(1, 2) AS n;
