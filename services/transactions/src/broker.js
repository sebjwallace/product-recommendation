const amqplib = require('amqplib/callback_api');

let connection, channel;

function connect(){
  return new Promise((resolve) => {
    if(connection && channel) return resolve({ connection, channel });
    amqplib.connect('amqp://user:root@rabbitmq', (error, newConnection) => {
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

async function send({ queue, message }){
  const { channel } = await connect();
  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message));
  return true;
}

module.exports = {
  connect,
  disconnect,
  send
};