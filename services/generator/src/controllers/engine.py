import math
import pandas as pd
import numpy as np
import scipy.spatial
from db import connect, cursor

def generate(transaction):
  customerId = transaction['customerId']
  productId = transaction['productId']
  quantity = transaction['quantity']

  updateCustomerProduct(customerId, productId, quantity)

  data = pd.read_sql_query('SELECT * FROM customerProduct', connect())
  customerProductMatrix = data.pivot_table(index='customerid', columns='productid', values='quantity', fill_value=0)

  customerIndex = customerProductMatrix.index.get_loc(customerId)
  customerVector = np.asarray([customerProductMatrix.loc[customerId]])

  distances = scipy.spatial.distance.cdist(customerProductMatrix, customerVector, metric='euclidean')
  distances[customerIndex][0] = math.inf
  
  customerProductMatrix['Distances'] = distances
  customerProductMatrix = customerProductMatrix.sort_values('Distances')
  del customerProductMatrix['Distances']

  bestMatchingCustomers = customerProductMatrix.head()
  bestMatchingCustomerBinaries = np.where(bestMatchingCustomers > 0, 1, 0)
  consensus = np.expand_dims(np.sum(bestMatchingCustomerBinaries, axis=0), 0)
  consensus[customerVector > 0] = 0

  customerProductMatrix.loc['Rank'] = np.squeeze(consensus, 0)
  customerProductMatrix = customerProductMatrix.T.sort_values('Rank', ascending=False)

  recommendedProducts = customerProductMatrix[customerProductMatrix['Rank'] > 0]

  return recommendedProducts


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