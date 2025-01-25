/*
  # Initial Schema Setup for Supplier-Product Chatbot

  1. New Tables
    - `suppliers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `contact_email` (text)
      - `phone` (text)
      - `categories` (text array)
      - `created_at` (timestamp)
      
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `brand` (text)
      - `price` (decimal)
      - `category` (text)
      - `description` (text)
      - `supplier_id` (uuid, foreign key)
      - `created_at` (timestamp)
      
    - `chat_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `query` (text)
      - `response` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create suppliers table
CREATE TABLE suppliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    contact_email text,
    phone text,
    categories text[] DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    brand text NOT NULL,
    price decimal(10,2) NOT NULL,
    category text NOT NULL,
    description text,
    supplier_id uuid REFERENCES suppliers(id),
    created_at timestamptz DEFAULT now()
);

-- Create chat history table
CREATE TABLE chat_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    query text NOT NULL,
    response text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all authenticated users for suppliers"
    ON suppliers FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow read access to all authenticated users for products"
    ON products FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can view their own chat history"
    ON chat_history FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat history"
    ON chat_history FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Insert sample data
INSERT INTO suppliers (name, contact_email, phone, categories) VALUES
    ('TechPro Solutions', 'contact@techpro.com', '+1-555-0123', ARRAY['Electronics', 'Computers']),
    ('Office Essentials', 'sales@officeessentials.com', '+1-555-0124', ARRAY['Office Supplies', 'Furniture']),
    ('Digital Dynamics', 'info@digidyn.com', '+1-555-0125', ARRAY['Electronics', 'Accessories']);

INSERT INTO products (name, brand, price, category, description, supplier_id) VALUES
    ('Pro Laptop X1', 'TechMaster', 1299.99, 'Electronics', 'High-performance laptop with 16GB RAM', (SELECT id FROM suppliers WHERE name = 'TechPro Solutions')),
    ('Ergonomic Chair', 'ComfortPlus', 299.99, 'Furniture', 'Adjustable office chair with lumbar support', (SELECT id FROM suppliers WHERE name = 'Office Essentials')),
    ('Wireless Mouse', 'TechGear', 49.99, 'Accessories', 'Bluetooth wireless mouse with precision tracking', (SELECT id FROM suppliers WHERE name = 'Digital Dynamics'));