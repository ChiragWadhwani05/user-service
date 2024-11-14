import kafkaClient from "../utils/kafkaClient.js";
import { Kafka } from "../constants.js";
import { createUserProfile } from "../services/userservice.js";

const { TOPIC_NAME, CONSUMER_GROUP_ID } = Kafka;

export async function initializeKafkaConsumer() {
  await kafkaClient.connectConsumer(CONSUMER_GROUP_ID);
  const consumer = kafkaClient.getConsumerInstance();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: false });

  consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log("UserCreated event received:", event.data);

        // Call function to create user profile using the event data
        await createUserProfile(event.data);
      } catch (error) {
        console.error("Error processing UserCreated event:", error);
      }
    },
  });
}
