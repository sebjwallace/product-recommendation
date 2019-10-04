from db import connect

def generate(customerId, productId, quantity):
  connection = connect()
  
  connection.cursor().execute('''
    INSERT INTO customerProduct (customerId, productId)
      VALUES (%(customerId)s, %(productId)s) ON CONFLICT DO NOTHING;
    UPDATE customerProduct
      SET quantity = quantity + %(quantity)s
      WHERE customerId = %(customerId)s AND productId = %(productId)s;
  ''', {
    "customerId": customerId,
    "productId": productId,
    "quantity": quantity
  })

  connection.commit()
  
  c = connection.cursor()
  c.execute('SELECT * FROM customerProduct')
  print(c.fetchall(), flush=True)