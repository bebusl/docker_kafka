const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  clientId: "my-app",
  brokers: ["kafka:9093"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

async function init() {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic" });
  await consumer
    .run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("컨슈머 받은메세지 : ", message.value.toString());
      },
    })
    .catch((e) => {
      console.error("컨슈머 에러", e);
      consumer.disconnect();
    });
}

init();
