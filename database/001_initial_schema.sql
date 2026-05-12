CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('tenant', 'landlord', 'host', 'admin', 'telco_partner');
CREATE TYPE inventory_category AS ENUM ('residential', 'commercial');
CREATE TYPE duration_type AS ENUM ('short', 'mid', 'long', 'hourly', 'daily', 'monthly');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'deposit_received', 'deposit_secured', 'active', 'completed', 'cancelled', 'disputed');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'authorised', 'paid', 'failed', 'refunded');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(32) UNIQUE NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  role user_role NOT NULL DEFAULT 'tenant',
  city VARCHAR(80),
  verification_status verification_status NOT NULL DEFAULT 'pending',
  rating_average NUMERIC(3, 2) NOT NULL DEFAULT 0,
  rating_count INTEGER NOT NULL DEFAULT 0,
  reward_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE verification_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(60) NOT NULL,
  storage_url TEXT NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  category inventory_category NOT NULL,
  duration duration_type NOT NULL,
  city VARCHAR(80) NOT NULL,
  suburb VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  price_amount INTEGER NOT NULL,
  price_unit VARCHAR(30) NOT NULL,
  bedrooms INTEGER,
  capacity INTEGER,
  verified BOOLEAN NOT NULL DEFAULT false,
  neat_stock BOOLEAN NOT NULL DEFAULT false,
  rating_average NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  low_data_image_url TEXT,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  available_from DATE,
  available_to DATE,
  reservation_status VARCHAR(40) NOT NULL DEFAULT 'available',
  reserved_by_booking_id UUID,
  reserved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX listings_search_idx ON listings (category, duration, city, suburb, verified, price_amount);
CREATE INDEX listings_geo_idx ON listings (latitude, longitude);

CREATE TABLE listing_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id),
  tenant_id UUID NOT NULL REFERENCES users(id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  reservation_status VARCHAR(60) NOT NULL DEFAULT 'held_pending_payment',
  reserved_at TIMESTAMPTZ,
  total_amount INTEGER NOT NULL,
  deposit_amount INTEGER NOT NULL DEFAULT 0,
  amount_due INTEGER NOT NULL DEFAULT 0,
  lease_term_months INTEGER,
  service_fee INTEGER NOT NULL DEFAULT 0,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(40) NOT NULL,
  telco_channel VARCHAR(40),
  deposit_status VARCHAR(60) NOT NULL DEFAULT 'pending_payment',
  custody_status VARCHAR(60) NOT NULL DEFAULT 'not_received',
  custody_provider VARCHAR(120),
  custody_reference VARCHAR(120),
  custody_received_at TIMESTAMPTZ,
  interest_accrued INTEGER NOT NULL DEFAULT 0,
  release_status VARCHAR(60) NOT NULL DEFAULT 'not_ready',
  inspection_status VARCHAR(60) NOT NULL DEFAULT 'pending',
  provider_reference VARCHAR(120),
  deposit_received_at TIMESTAMPTZ,
  damage_deductions INTEGER NOT NULL DEFAULT 0,
  refundable_amount INTEGER,
  released_to_landlord_amount INTEGER,
  release_authorised_by VARCHAR(120),
  release_requested_at TIMESTAMPTZ,
  lease_contract_status VARCHAR(60) NOT NULL DEFAULT 'not_generated',
  lease_contract_generated_at TIMESTAMPTZ,
  lease_pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  provider VARCHAR(60) NOT NULL,
  provider_reference VARCHAR(120),
  amount INTEGER NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  raw_payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rater_id UUID NOT NULL REFERENCES users(id),
  ratee_id UUID NOT NULL REFERENCES users(id),
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment TEXT,
  relationship VARCHAR(40) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  reporter_id UUID NOT NULL REFERENCES users(id),
  reason VARCHAR(160) NOT NULL,
  details TEXT,
  status VARCHAR(40) NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lease_audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  current_monthly_rate INTEGER NOT NULL,
  comparable_average_rate INTEGER NOT NULL,
  estimated_savings INTEGER NOT NULL,
  recommendation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reward_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason VARCHAR(120) NOT NULL,
  partner_name VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vouchers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_name VARCHAR(120) NOT NULL,
  title VARCHAR(160) NOT NULL,
  points_cost INTEGER NOT NULL,
  category VARCHAR(80) NOT NULL,
  supports_sme BOOLEAN NOT NULL DEFAULT true,
  terms TEXT NOT NULL
);

CREATE TABLE telco_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  msisdn VARCHAR(32) NOT NULL,
  telco VARCHAR(40) NOT NULL,
  external_session_id VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
