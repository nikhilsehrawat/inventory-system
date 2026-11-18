
CREATE TABLE inventory_ledger (
  sku TEXT NOT NULL,
  location TEXT NOT NULL,
  on_hand INTEGER NOT NULL DEFAULT 0 CHECK (on_hand >= 0),
  version BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (sku, location)
);

CREATE TABLE outbox (
  event_id TEXT PRIMARY KEY,
  aggregate_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_version INTEGER NOT NULL,
  payload JSONB NOT NULL,
  correlation_id TEXT NOT NULL,
  causation_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT
);

CREATE INDEX outbox_unpublished_idx ON outbox (created_at) WHERE published_at IS NULL;

CREATE TABLE processed_events (
  consumer_group TEXT NOT NULL,
  event_id TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (consumer_group, event_id)
);

CREATE TABLE reservation_audit (
  hold_id UUID PRIMARY KEY,
  sku TEXT NOT NULL,
  location TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  state TEXT NOT NULL,
  correlation_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
