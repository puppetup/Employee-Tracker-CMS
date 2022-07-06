INSERT INTO department (name)
VALUES ('Life Operations'),
        ('Entertainment');

INSERT INTO role (title, salary, department_id)
VALUES ('Food Taster', 600000, 1),
        ('Dancer', 300000, 1),
        ('Bouncer', 200000, 1),
        ('Henchman', 90000, 2);

INSERT INTO employee (first_name, last_name, role_id,  manager_id)
VALUES ('Delores', 'Gutenbag', 3, 3),
        ('Jebediah', 'Rosales', 4, 4),
        ('Stephanie', 'Baghai', 1, NULL),
        ('Savino', 'Hoshizaki', 2, NULL);

        



