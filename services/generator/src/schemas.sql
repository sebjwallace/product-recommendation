CREATE TABLE IF NOT EXISTS customerProduct (
  id SERIAL NOT NULL UNIQUE,
  customerId varchar NOT NULL UNIQUE,
  productId varchar NOT null UNIQUE,
  quantity int DEFAULT 0
);