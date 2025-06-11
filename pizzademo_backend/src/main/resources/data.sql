DELETE FROM cardapio;
DELETE FROM pizza;

INSERT INTO pizza (id, sabor) VALUES (1, 'Margherita');
INSERT INTO pizza (id, sabor) VALUES (2, 'Calabresa');
INSERT INTO pizza (id, sabor) VALUES (3, 'Quatro Queijos');

INSERT INTO cardapio (id, nome, descricao, preco, valor, tamanho, pizza_id) VALUES (1, 'Margherita', 'Molho de tomate, mussarela e manjericão.', 30.0, 30.0, 'Grande', 1);
INSERT INTO cardapio (id, nome, descricao, preco, valor, tamanho, pizza_id) VALUES (2, 'Calabresa', 'Calabresa, cebola e mussarela.', 35.0, 35.0, 'Grande', 2);
INSERT INTO cardapio (id, nome, descricao, preco, valor, tamanho, pizza_id) VALUES (3, 'Quatro Queijos', 'Mussarela, parmesão, gorgonzola e catupiry.', 40.0, 40.0, 'Grande', 3);
