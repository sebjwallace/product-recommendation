from db import connect, cursor
import pandas as pd

def generate(transaction):
  customerId = transaction['customerId']
  productId = transaction['productId']
  quantity = transaction['quantity']

  updateCustomerProduct(customerId, productId, quantity)

  query = cursor()
  query.execute('SELECT * FROM customerProduct')
  print(query.fetchall(), flush=True)

  data = pd.read_sql_query('SELECT * FROM customerProduct', connect())
  customerProductMatrix = data.pivot_table(index='customerid', columns='productid', values='quantity', fill_value=0)

  print(customerProductMatrix, flush=True)


def updateCustomerProduct(customerId, productId, quantity):
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