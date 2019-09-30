from db import connect, cursor

def createJob(customerId, productId, quantity):
  connection = connect()
  
  connection.cursor().execute('''
    WITH props AS (
      INSERT INTO transactions
      (customer_id, product_id, quantity)
      VALUES
      (%s, %s, %s)
      RETURNING id
    )
    INSERT INTO jobs
    (transaction, status)
    SELECT id, 1
    FROM props;
  ''', [ customerId, productId, quantity ])

  connection.commit()

def getNextJob():
  connection = connect()

  query = cursor()
  query.execute('''
    SELECT * FROM jobs
    WHERE status=1
    ORDER BY timestamp ASC
    LIMIT 1
  ''')

  return query.fetchone()
