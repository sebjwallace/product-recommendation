from flask import Flask
from flask import request

import db
from controllers.jobs.post.index import addJob
from storage import getAllJobs, getNextJob, clearJobs
from controllers.transactions.get.index import getTransactions

app = Flask(__name__)

@app.route('/jobs', methods = ['POST'])
def jobs():
  body = request.json
  return addJob(
    body['customerId'],
    body['productId'],
    body['quantity']
  )

@app.route('/transactions', methods = ['GET'])
def transactions():
  query = request.args
  return getTransactions(
    query['offset'],
    query['limit']
  )

@app.route('/jobs', methods = ['GET'])
def jobsAll():
  return getAllJobs() or ''

@app.route('/jobs/clear', methods = ['GET'])
def jobsClear():
  clearJobs()
  return { "ok": True }

@app.route('/jobs/next', methods = ['GET'])
def jobsNext():
  return getNextJob() or ''

db.setup()

if __name__ == '__main__':
  app.run(debug=False, host='0.0.0.0')