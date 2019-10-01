CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL NOT NULL UNIQUE,
  ref varchar,
  customer_id varchar NOT NULL,
  product_id varchar NOT NULL,
  quantity int NOT NULL,
  timestamp timestamp default current_timestamp
);