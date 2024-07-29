INSERT INTO departments (name) VALUES
('Sales'),
('Engineering'),
('Human Resources')
ON CONFLICT (name) DO NOTHING;

INSERT INTO roles (title, salary, department_id) VALUES
