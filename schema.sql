CREATE TABLE parks(
    id INT AUTO_INCREMENT NOT NULL,
    parks_name VARCHAR(100),
    location VARCHAR(100),
    date_est DATE(), 
    size VARCHAR (100)
    visitors INTEGER(25), 
    description TEXT,
    visited BOOLEAN DEFAULT(1)
    PRIMARY KEY(id)
);