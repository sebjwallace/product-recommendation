import psycopg2
import psycopg2.extras

def connect():
  connection = psycopg2.connect(
    database = 'db',
    user = 'user',
    password = 'root',
    host = 'generator-db',
    port = '5432'
  )

  return connection

def cursor():
  connection = connect()
  return connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

def setup():
  connection = connect()
  connection.cursor().execute(open("/usr/src/app/src/schemas.sql", "r").read())
  connection.commit()