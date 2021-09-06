const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  clientId: "my-app",
  brokers: ["kafka:9093"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  setInterval(() => {
    producer.send({
      topic: "test-topic",
      messages: [{ value: `${new Date().toTimeString()}` }],
    });
  }, 10000);
};

run();
