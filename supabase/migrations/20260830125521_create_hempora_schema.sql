/*
# Pure Hempora Life - Database Schema

1. New Tables
- `products` — catalog of hemp/CBD wellness products
  - id (uuid PK)
  - name (text)
  - slug (text, unique)
  - category (text) — e.g. "tinctures", "gummies", "topicals", "capsules", "flower"
  - description (text)
  - price (numeric, in cents)
  - image_url (text)
  - badge (text, nullable) — e.g. "Best Seller", "New", "Sale"
  - rating (numeric, 0-5)
  - reviews_count (int)
  - in_stock (boolean)
  - benefits (text[]) — short bullet list
  - ingredients (text)
  - size (text) — e.g. "30ml", "60 gummies"
  - strength (text) — e.g. "1000mg"
  - featured (boolean) — shown on homepage
  - created_at (timestamptz)
- `orders` — customer orders placed through checkout
  - id (uuid PK)
  - full_name (text)
  - email (text)
  - address (text)
  - city (text)
  - state (text)
  - zip (text)
  - total (numeric, in cents)
  - status (text, default 'pending')
  - items (jsonb) — [{id,name,price,qty,image}]
  - created_at (timestamptz)

2. Indexes
- products slug (unique)
- products category
- products featured

3. Security
- RLS enabled on both tables.
- products: public read (anon+authenticated), no public writes (managed via seed/SQL).
- orders: public insert (checkout), public read (order confirmation), update/delete restricted.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL,
  image_url text NOT NULL,
  badge text,
  rating numeric(2,1) DEFAULT 4.8,
  reviews_count int DEFAULT 0,
  in_stock boolean DEFAULT true,
  benefits text[] DEFAULT '{}',
  ingredients text,
  size text,
  strength text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  total numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  items jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- products: public read only
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- orders: public insert (checkout), public read for confirmation
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_read_orders" ON orders;
CREATE POLICY "anon_read_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);