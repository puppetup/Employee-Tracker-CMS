INSERT INTO department (name)
VALUES ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager',  160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Armando', 'Mendez', 1, 1),
        ('Gregory', 'Siggins', 1, 1),
        ('Meredith', 'McCollum', 1, 1),
        ('Byron', 'Dalberg', 2, 2),
        ('James', 'Chang', 2, 2),
        ('Nicholas', 'Pisano', 2, 2),
        ('Chris', 'Deng', 3, 3),
        ('Jenna', 'Buettner', 3, 3),
        ('Daniel', 'Johnson', 4, 4),
        ('Jesus', 'Villegas', 4, 4);

