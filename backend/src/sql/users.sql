CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    room_id VARCHAR(255)
)

INSERT INTO users(id, name, login, password, room_id) VALUES ('55dd8400-e69b-41d4-a716-444433440007', 'administrador', 'admin', 'admin', '550h8400-e69b-41d4-a716-444433440007');

DROP TABLE users;

DROP DATABASE users;
