CREATE TABLE IF NOT EXISTS customerProduct (
  id SERIAL NOT NULL UNIQUE,
  customerId varchar NOT NULL,
  productId varchar NOT NULL,
  quantity int DEFAULT 0,
  UNIQUE (customerId, productId)
);