from flask import Flask
from flask import request

import db
import broker
from controllers import engine

app = Flask(__name__)

db.setup()
broker.consume('transactions', engine.process)

if __name__ == '__main__':
  app.run(debug=False, host='0.0.0.0')