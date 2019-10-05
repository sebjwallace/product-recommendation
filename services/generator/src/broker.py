import pika
import json

def connect():
  while True:
    try:
      credentials = pika.PlainCredentials('user','root')
      connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq',5672,'/',credentials))
      return connection.channel()
      # channel.queue_declare('transactions', durable=True)
    except pika.exceptions.AMQPConnectionError:
      continue

def consume(queue, cb):
  channel = connect()
  def callback(ch, method, properties, body):
    response = cb(json.loads(body))
    # channel.queue_declare(queue=queue)
    channel.basic_publish(
      exchange = '',
      routing_key = 'recommendations',
      body = str(response)
    )
    channel.basic_ack(method.delivery_tag)

  channel.basic_consume(
    queue = queue,
    auto_ack = False,
    on_message_callback = callback
  )

  channel.start_consuming()