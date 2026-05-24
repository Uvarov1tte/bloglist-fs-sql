CREATE TABLE blogs( 
    id SERIAL PRIMARY KEY, 
    author text, 
    url text NOT NULL, 
    title text NOT NULL, 
    likes int DEFAULT 0 
);

insert into blogs (author, url, title) values ('Host 1', 'http://localhost:0001', 'Lorem Ipsum 1');
insert into blogs (author, url, title) values ('Host 2', 'http://localhost:0002', 'Lorem Ipsum 2');