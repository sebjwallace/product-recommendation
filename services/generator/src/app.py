from flask import Flask
from flask import request

import db
from broker import consume
from controllers.engine import generate

app = Flask(__name__)

db.setup()
consume(generate)

if __name__ == '__main__':
  app.run(debug=False, host='0.0.0.0')