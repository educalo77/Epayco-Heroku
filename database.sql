CREATE DATABASE epayco;

-- set extentions

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_document VARCHAR(255) NOT NULL,
    user_phone VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- insert fake users

INSERT INTO users (user_name, user_email, user_document, user_phone, user_password) VALUES ('educalo', 'educalo386@gmail.com', '26124132', '+5491134748996', 'megadeth');