from db import connect

def addJob(customerId, productId, quantity):
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

  return { "ok": True }