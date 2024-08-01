CREATE TABLE expense_participants (
    expense_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (expense_id, user_id),
    FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir despesa
INSERT INTO expenses (id, operation, date, value, description) 
VALUES ('uuid-expense-1', 'o', '2024-07-01 10:30:00', 100.0, 'Gasto com limpeza');

-- Relacionar usuários à despesa
INSERT INTO expense_users (expense_id, user_id) VALUES ('uuid-expense-1', 'uuid-user-1');
INSERT INTO expense_users (expense_id, user_id) VALUES ('uuid-expense-1', 'uuid-user-2');


-- Inserir despesa
INSERT INTO expenses (id, operation, date, value, description) 
VALUES ('uuid-expense-2', 'i', '2024-07-01 10:30:00', 50.0, 'Compra de suprimentos pessoais');

-- Relacionar usuário à despesa
INSERT INTO expense_users (expense_id, user_id) VALUES ('uuid-expense-2', 'uuid-user-3');


-- codigo para pesquisar por expense: 
-- import { DataSource } from "typeorm";
-- import { Expenses } from "../entities/Expenses";

-- const dataSource = new DataSource({
--     // suas configurações de dataSource
-- });

-- async function getExpenseWithParticipants(expenseId: string): Promise<Expenses | null> {
--     const expenseRepository = dataSource.getRepository(Expenses);
--     return await expenseRepository.findOne({
--         where: { id: expenseId },
--         relations: ["participants"]
--     });
-- }

-- teste manual
INSERT INTO expenses (id, owner_id, operation, date, value, description) 
VALUES ('e9cd8f6e-b1d7-419a-a39c-f96d86dd45e9','55dd8400-e69b-41d4-a716-444433440007' , 'i', '2024-07-01 10:30:00', 50.0, 'Compra de suprimentos pessoais');

INSERT INTO expense_participants (expense_id, user_id) VALUES ('e9cd8f6e-b1d7-419a-a39c-f96d86dd45e9', '55dd8400-e69b-41d4-a716-444433440007');
INSERT INTO expense_participants (expense_id, user_id) VALUES ('e9cd8f6e-b1d7-419a-a39c-f96d86dd45e9', '2a879889-38f8-457f-a254-d962dcdb1c20');


-- buscar expense com usuários 

SELECT 
    e.id AS expense_id,
    e.owner_id,
    e.operation,
    e.date,
    e.value,
    e.description,
    u.id AS user_id,
    u.name,
    u.login,
    u.password
FROM 
    expenses e
LEFT JOIN 
    expense_participants ep ON e.id = ep.expense_id
LEFT JOIN 
    users u ON ep.user_id = u.id
WHERE 
    e.id = 'e9cd8f6e-b1d7-419a-a39c-f96d86dd45e9';

SELECT 
    e.id AS expense_id, 
    e.owner_id,
    e.operation,
    e.date,
    e.value,
    e.description,
    u.id AS user_id,
    u.name,
    u.login,
    u.password
FROM 
    expenses e
LEFT JOIN 
    expense_participants ep ON e.id = ep.expense_id
LEFT JOIN 
    users u ON ep.user_id = u.id
WHERE 
    e.id = 'e9cd8f6e-b1d7-419a-a39c-f96d86dd45e9';