
import { z } from "zod";

export const KafkaConfigSchema = z.object({
  KAFKA_BROKERS: z.string().min(1),
  SCHEMA_REGISTRY_URL: z.string().url().optional(),
});

export type KafkaConfig = z.infer<typeof KafkaConfigSchema>;

export function loadKafkaConfig(): KafkaConfig {
  const parsed = KafkaConfigSchema.safeParse({
    KAFKA_BROKERS: process.env.KAFKA_BROKERS,
    SCHEMA_REGISTRY_URL: process.env.SCHEMA_REGISTRY_URL,
  });

  if (!parsed.success) {
    console.error("FATAL: missing Kafka configuration", parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}
