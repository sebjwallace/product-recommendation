import os
import psycopg2
import psycopg2.extras

env = os.environ

def connect():
  connection = psycopg2.connect(
    database = env['POSTGRES_DB'],
    user = env['POSTGRES_USER'],
    password = env['POSTGRES_PASSWORD'],
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