from flask import Flask
from flask import request

from controllers.jobs.post.index import addJob

app = Flask(__name__)

@app.route('/jobs', methods = ['POST'])
def postJobs():
  body = request.json
  return addJob(
    body['customerId'],
    body['productId'],
    body['quantity']
  )

if __name__ == '__main__':
  app.run(debug=False, host='0.0.0.0')