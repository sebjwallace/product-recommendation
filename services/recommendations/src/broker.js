const amqplib = require('amqplib/callback_api');

const { RABBITMQ_USER, RABBITMQ_PASSWORD } = process.env;
const rabbitMqPath = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@rabbitmq`;

let connection, channel;

function connect(){
  return new Promise((resolve) => {
    if(connection && channel) return resolve({ connection, channel });
    amqplib.connect(rabbitMqPath, (error, newConnection) => {
      if(error) return setTimeout(connect, 500);
      connection = newConnection;
      connection.createChannel((error, newChannel) => {
        if(error) return setTimeout(connect, 500);
        channel = newChannel;
        resolve({ connection, channel });
      });
    });
  });
}

function disconnect(){
  return new Promise((resolve) => {
    setTimeout(() => {
      connection.close();
      connection = channel = null;
      resolve();
    });
  });
}

async function consume({ queue, callback }){
  const { channel } = await connect();
  channel.assertQueue(queue, { durable: true });
  channel.consume(queue, async (message) => {
    await callback(message.content.toString());
    channel.ack(message);
  }, { noAck: false });
}

module.exports = {
  connect,
  disconnect,
  consume
};