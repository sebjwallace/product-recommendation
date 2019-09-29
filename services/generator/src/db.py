import psycopg2

def connect():
  connection = psycopg2.connect(
    database = 'db',
    user = 'user',
    password = 'root',
    host = 'generator-db',
    port = '5432'
  )

  connection.cursor().execute('''
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL NOT NULL,
      customer_id varchar NOT NULL,
      product_id varchar NOT NULL,
      quantity numeric NOT NULL
    )
  ''')

  connection.commit()

  return connection