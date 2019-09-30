CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL NOT NULL UNIQUE,
  ref varchar,
  customer_id varchar NOT NULL,
  product_id varchar NOT NULL,
  quantity int NOT NULL,
  timestamp timestamp default current_timestamp
);

CREATE TABLE IF NOT EXISTS job_statuses (
  id SERIAL NOT NULL UNIQUE,
  status varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL NOT NULL,
  transaction int NOT NULL references transactions(id),
  status int NOT NULL references job_statuses(id),
  timestamp timestamp default current_timestamp
);