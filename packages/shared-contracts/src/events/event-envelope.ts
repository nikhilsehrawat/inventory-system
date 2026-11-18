
export interface EventEnvelope<TPayload = Record<string, unknown>> {
  eventId: string;
  eventType: string;
  eventVersion: number;
  aggregateId: string; // "sku:location"
  occurredAt: string;
  correlationId: string;
  causationId: string | null;
  payload: TPayload;
}

export const eventType = {
  inventoryReceived: "INVENTORY_RECEIVED",
  inventoryShipped: "INVENTORY_SHIPPED",
  reservationCreated: "RESERVATION_CREATED",
  reservationCommitted: "RESERVATION_COMMITTED",
  reservationReleased: "RESERVATION_RELEASED",
} as const;
