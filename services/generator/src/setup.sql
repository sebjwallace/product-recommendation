CREATE TABLE IF NOT EXISTS job_statuses (
  id SERIAL NOT NULL,
  status varchar NOT NULL UNIQUE
);

INSERT INTO job_statuses
(status)
VALUES
('pending'), ('processing'), ('complete')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL NOT NULL,
  customer_id varchar NOT NULL,
  product_id varchar NOT NULL,
  quantity numeric NOT NULL,
  status varchar NOT NULL references job_statuses(status)
);