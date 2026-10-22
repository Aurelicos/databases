CREATE TABLE IF NOT EXISTS showcase (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO showcase (name, email) VALUES ('User_0', 'User_0@example.com');
