CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  parent_id INT DEFAULT NULL,
  FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO category (name, parent_id) VALUES ('Manutention', NULL); -- id 1
INSERT INTO category (name, parent_id) VALUES ('Transpalette', 1);  -- id 2
INSERT INTO category (name, parent_id) VALUES ('Gerbeur', 1);  -- id 3
INSERT INTO category (name, parent_id) VALUES ('Chariot élévateur', 1); -- id 4

CREATE TABLE customer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  fullname VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20),
  role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO customer (username, fullname, email, password, phoneNumber, role) VALUES 
('john_doe', 'John Doe', 'JohnDoe@gmail.com', '12345', '0123456789', 'admin'),
('jane_smith', 'Jane Smith', 'JaneSmith@gmail.com', '123456', '0987654321', 'customer');

CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  image VARCHAR(255) NOT NULL DEFAULT 'stock_epuise.jpg',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO product (category_id, title, description, price, stock, image) VALUES 
(2, 'Transpalette manuel', 'Transpalette manuel avec levée facile', 400.00, 20, 'transpalette-manuel.jpg'),  -- id 1 
(2, 'Transpalette électrique', 'Transpalette électrique pour faciliter le déplacement des charges lourdes', 3500.00, 10, 'transpalette-electrique.jpg'),  -- id 2
(2, 'Transpalette électrique peseur', 'Transpalette électrique peseur pour peser des charges lourdes', 4599.00, 15, 'transpalette-electrique-peseur.jpg');  -- id 3

INSERT INTO product (category_id, title, description, price, stock, image) VALUES
(3, 'Gerbeur électrique', 'Gerbeur compact et puissant pour charges lourdes', 10000.00, 13, 'gerbeur-electrique.jpg'),  -- id 4
(3, 'Gerbeur électrique autoporté', 'Gerbeur puissant et mobile pour se déplacer rapidement', 8000.00, 8, 'gerbeur-electrique-autoporte.jpg');  -- id 5

INSERT INTO product (category_id, title, description, price, stock, image) VALUES
(4, 'Chariot élévateur Caces 3', 'Chariot puissant et flexible parfait pour le travail en extérieur', 25000.00, 5, 'chariot-elevateur-Caces_3.jpg'), -- id 6
(4, 'Chariot à mat rétractable Caces 5', 'Chariot compact pour soulever des charges lourdes en hauteur', 35630.00, 5, 'chariot-a-mat-retractable-Caces_5.jpg');  -- id 7

CREATE TABLE payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_amount DECIMAL(10, 2),
  payment_method ENUM('credit card', 'paypal') NOT NULL DEFAULT 'credit card',
  payment_status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO payment (payment_amount, payment_method, payment_status) VALUES
(39000, 'credit card', 'completed'),
(25000, 'paypal', 'completed');

CREATE TABLE delivery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  carrier VARCHAR(255) NOT NULL,
  delivery_status ENUM('pending', 'shipped', 'delivered') NOT NULL DEFAULT 'pending',
  shipping_costs DECIMAL(10, 2),
  departure_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  arrival_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO delivery (address, carrier, delivery_status, shipping_costs) VALUES
('123 Rue des Champs, Paris', 'XPO Logistics', 'delivered', 10.00),
('456 Avenue des Nations, Lyon', 'DHL', 'shipped', 20.00);  

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  payment_id INT NOT NULL,
  delivery_id INT NOT NULL,
  total_price DECIMAL(10, 2),
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (delivery_id) REFERENCES delivery(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE
);

-- Commande John Doe
INSERT INTO orders (customer_id, payment_id, delivery_id, total_price) 
VALUES (1, 1, 1, 39000.00);

-- Nouvelle commande avec payment_id = 2
INSERT INTO orders (customer_id, payment_id, delivery_id, total_price) 
VALUES (2, 2, 2, 25000.00);

CREATE TABLE orders_product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orders_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL, 
  price DECIMAL(10, 2),
  FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

INSERT INTO orders_product (orders_id, product_id, quantity, price) VALUES
(1, 1, 1, 400.00), -- Transpalette manuel
(1, 4, 1, 10000.00), -- Gerbeur électrique
(1, 6, 1, 25000.00), -- Chariot élévateur CACES 3
(2, 2, 1, 3500.00);  -- Nouvelle commande avec Transpalette électrique

CREATE TABLE comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  content TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE favorite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  UNIQUE KEY customer_product (customer_id, product_id)
);
