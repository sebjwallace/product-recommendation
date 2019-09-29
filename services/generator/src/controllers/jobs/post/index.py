from db import connect

def addJob(customerId, productId, quantity):
  connection = connect()

  connection.cursor().execute('''
    INSERT INTO jobs
    (customer_id, product_id, quantity, status)
    VALUES
    (%s, %s, %s, 'pending')
  ''', [ customerId, productId, quantity ])

  connection.commit()

  return { "ok": True }