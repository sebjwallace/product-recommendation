from db import connect, cursor
from flask import jsonify

def getTransactions(offset = 0, limit = 100):

  query = cursor()
  query.execute('''
    SELECT * FROM transactions
    OFFSET %s LIMIT %s
  ''', [ offset, limit ])

  return jsonify(query.fetchall())