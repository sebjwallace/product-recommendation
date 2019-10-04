import pika
import json

credentials = pika.PlainCredentials('user','root')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq',5672,'/',credentials))
channel = connection.channel()
channel.queue_declare('transactions', durable=True)

def consume(cb):
  def callback(ch, method, properties, body):
    transaction = json.loads(body)
    cb(transaction['customerId'], transaction['productId'], transaction['quantity'])
    # channel.basic_ack(method.delivery_tag)

  channel.basic_consume(
    queue = 'transactions',
    auto_ack = True,
    on_message_callback = callback
  )

  channel.start_consuming()