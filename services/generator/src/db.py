import psycopg2

def connect():
  connection = psycopg2.connect(
    database = 'db',
    user = 'user',
    password = 'root',
    host = 'generator-db',
    port = '5432'
  )

  connection.cursor().execute(open("/usr/src/app/src/setup.sql", "r").read())

  connection.commit()

  return connection