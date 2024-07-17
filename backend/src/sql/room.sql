CREATE TABLE room (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    owner_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    members_num INTEGER NOT NULL
);

INSERT INTO room("id", "owner_id", "name", "members_num") VALUES 
('550h8400-e69b-41d4-a716-444433440007 ', '1234', 'Rapadura Land', 2);