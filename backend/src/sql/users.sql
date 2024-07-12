CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255), 
    login VARCHAR(255) UNIQUE,
    password VARCHAR(255)
)

INSERT INTO users(id, name, login, password) VALUES ('aaaaa', 'name', 'login', 'pass')

DROP TABLE users;

DROP DATABASE users;
