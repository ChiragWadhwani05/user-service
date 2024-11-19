import kafkaClient from "../utils/kafkaClient.js";
import { Kafka } from "../constants.js";
import {
  createUserProfile,
  updateEmail,
  updateUsername,
} from "./user.service.js";

const { TOPIC_NAME, CONSUMER_GROUP_ID } = Kafka;

export default async function initializeKafkaTopic() {
  await kafkaClient.connectAdmin();
  const admin = kafkaClient.getAdminInstance();
  try {
    await admin.connect();
    const topics = await admin.listTopics();

    if (!topics.includes(TOPIC_NAME)) {
      await admin.createTopics({
        topics: [{ topic: TOPIC_NAME, numPartitions: 1 }],
      });
      console.log(`Topic ${TOPIC_NAME} created.`);
    } else {
      console.log(`Topic ${TOPIC_NAME} already exists.`);
    }
  } catch (error) {
    console.error("Error initializing Kafka topic:", error);
    process.exit(1);
  } finally {
    await admin.disconnect();
  }
}
export async function initializeKafkaConsumer() {
  await kafkaClient.connectConsumer(CONSUMER_GROUP_ID);
  const consumer = kafkaClient.getConsumerInstance();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: false });

  consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        const { eventType, data } = event;

        switch (eventType) {
          case "createUser":
            await createUserProfile(data);
            break;

          case "updateUsername":
            await updateUsername(data);
            break;

          case "updateEmail":
            await updateEmail(data);
            break;

          default:
            console.log(`Unknown event type: ${eventType}`);
            break;
        }
      } catch (error) {
        console.error("Error processing UserCreated event:", error);
      }
    },
  });
}
