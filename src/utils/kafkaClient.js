import { Kafka, Partitioners } from "kafkajs";
import { kafkaConfig } from "../config/kafka.config.js";

class KafkaClient {
  #kafka = null;
  #producer = null;
  #consumer = null;
  #admin = null;

  constructor() {
    this.#kafka = new Kafka(kafkaConfig);
  }

  async connectProducer() {
    if (this.#producer) return;

    this.#producer = this.#kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });

    try {
      await this.#producer.connect();
      console.log("\n🔄 Kafka producer connected");
    } catch (error) {
      console.error("Failed to connect kafka producer:", error);
      process.exit(1);
    }
  }

  async connectConsumer(groupId) {
    if (this.#consumer) return;

    this.#consumer = this.#kafka.consumer({ groupId });

    try {
      await this.#consumer.connect();
      console.log("\n🔄 Kafka consumer connected");
    } catch (error) {
      console.error("Failed to connect kafka consumer:", error);
      process.exit(1);
    }
  }

  async connectAdmin() {
    if (this.#admin) return;

    this.#admin = this.#kafka.admin();

    try {
      await this.#admin.connect();
      console.log("\n🔄 Kafka admin connected");
    } catch (error) {
      console.error("Failed to connect kafka admin:", error);
      process.exit(1);
    }
  }

  getProducerInstance() {
    if (!this.#producer) throw new Error("Producer is not connected");
    return this.#producer;
  }

  getConsumerInstance() {
    if (!this.#consumer) throw new Error("Consumer is not connected");
    return this.#consumer;
  }

  getAdminInstance() {
    if (!this.#admin) throw new Error("Admin is not connected");
    return this.#admin;
  }

  async disconnectProducer() {
    if (this.#producer) {
      await this.#producer.disconnect();
      console.log("\nKafka producer disconnected");
      this.#producer = null;
    }
  }

  async disconnectConsumer() {
    if (this.#consumer) {
      await this.#consumer.disconnect();
      console.log("\nKafka consumer disconnected");
      this.#consumer = null;
    }
  }

  async disconnectAdmin() {
    if (this.#admin) {
      await this.#admin.disconnect();
      console.log("\nKafka admin disconnected");
      this.#admin = null;
    }
  }

  async disconnectAll() {
    await Promise.all([
      this.disconnectProducer(),
      this.disconnectConsumer(),
      this.disconnectAdmin(),
    ]);
    console.log("\nAll Kafka clients disconnected");
  }
}

// Single instance of KafkaClient to be used across the app
const kafkaClient = new KafkaClient();
Object.freeze(kafkaClient);

export default kafkaClient;
