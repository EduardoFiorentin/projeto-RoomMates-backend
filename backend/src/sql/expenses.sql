CREATE TABLE expenses (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    owner_id varchar(255) NOT NULL,
    operation CHAR(1) NOT NULL,
    CHECK (operation IN ('i', 'o')),
    date TIMESTAMP NOT NULL,
    value NUMERIC NOT NULL,
    description VARCHAR(255)
);

-- mock
INSERT INTO expenses (id, owner_id, operation, date, value, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'i', '2024-07-01 10:30:00', 100.50, 'Salary Payment'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'o', '2024-07-02 12:00:00', 50.75, 'Grocery Shopping'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'i', '2024-07-03 09:15:00', 200.00, 'Freelance Project'),
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007', 'o', '2024-07-04 08:45:00', 75.00, 'Electricity Bill'),
('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009', 'i', '2024-07-05 11:30:00', 150.00, 'Bonus Payment');

INSERT INTO expenses (id, owner_id, operation, date, value, description) VALUES
('550e8400-e29b-41d4-a716-446655440010', '1234', 'i', '2024-07-01 10:30:00', 100.50, 'Salary Payment'),
('550e8400-e29b-41d4-a716-446655440020', '1234', 'o', '2024-07-01 10:30:00', 100.50, 'Salary Payment'),
('550e8400-e29b-41d4-a716-446655440030', '1234', 'i', '2024-07-01 10:30:00', 100.50, 'Salary Payment')