
CREATE DATABASE react_crud;


CREATE TABLE `react_crud`.`users`
(
    `id` int NOT NULL auto_increment,
    `name` varchar(50),
    `email` varchar(60),
    `status` varchar(60),
    `mobile` bigint(10),
    `created_at` timestamp default CURRENT_TIMESTAMP(),
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP(), 
    PRIMARY KEY (id)
);
