INSERT INTO products(id, name, value, amount_stored) VALUES (1,'Cadeira',120,22),(2,'Mesa',250,6),(3,'Prateleira',50,12),(4,'Quadro',25,0),(5,'Porta',250,0),(6,'Painel P/TV até 75\"',125,0),(7,'Banco',15,0);

INSERT INTO materials(id, name, amount_stored) VALUES (1,'Tabua MDF',120),(2,'Encosto Estofado',120),(3,'Pistão Hidraulico',30),(4,'Suporte Prateleira',130),(5,'Parafuso',500),(6,'Porca',500),(7,'Arruela de metal',0);

INSERT INTO bill_of_materials(id, material_needed, product_id, material_id) VALUES (1,1,2,2),(2,2,1,1),(3,1,4,1),(4,1,1,3),(5,2,5,3);
