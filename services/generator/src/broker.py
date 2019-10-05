import pika
import json

def connect():
  while True:
    try:
      credentials = pika.PlainCredentials('user','root')
      connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq',5672,'/',credentials))
      channel = connection.channel()
      channel.queue_declare('transactions', durable=True)
      return channel
    except pika.exceptions.AMQPConnectionError:
      continue

def consume(queue, cb):
  def callback(ch, method, properties, body):
    response = json.dumps(cb(json.loads(body)))
    # channel.queue_declare(queue='recommendations')
    channel.basic_publish(
      exchange = '',
      routing_key = 'recommendations',
      body = str(response)
    )
    channel.basic_ack(method.delivery_tag)

  channel = connect()
  channel.basic_consume(
    queue = queue,
    auto_ack = False,
    on_message_callback = callback
  )
  channel.start_consuming()