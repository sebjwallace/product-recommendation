INSERT INTO job_statuses
(status)
VALUES
('pending'), ('processing'), ('complete')
ON CONFLICT DO NOTHING;