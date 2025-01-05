/*
  # Create Vehicle Tables

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `make` (text, required)
      - `model` (text, required) 
      - `year` (integer)
      - `license_plate` (text)
      - `vin` (text)
      - `color` (text)
      - `mileage` (integer)
      - `status` (enum: available, in_use, maintenance)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid, foreign key)
    
    - `vehicle_maintenance`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `maintenance_type` (text)
      - `maintenance_date` (date)
      - `description` (text)
      - `cost` (decimal)
      - `status` (enum: scheduled, in_progress, completed)

  2. Security
    - Enable RLS on both tables
    - Add policies for user access control
    - Add policies for admin access

  3. Indexes
    - Add indexes for frequently queried columns
*/

-- Create vehicle status enum
CREATE TYPE vehicle_status AS ENUM ('available', 'in_use', 'maintenance');

-- Create maintenance status enum
CREATE TYPE maintenance_status AS ENUM ('scheduled', 'in_progress', 'completed');

-- Create vehicles table
CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer,
  license_plate text,
  vin text,
  color text,
  mileage integer DEFAULT 0,
  status vehicle_status NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create vehicle_maintenance table
CREATE TABLE vehicle_maintenance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  maintenance_type text NOT NULL,
  maintenance_date date NOT NULL,
  description text,
  cost decimal(10,2),
  status maintenance_status NOT NULL DEFAULT 'scheduled',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_maintenance ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicle_maintenance_updated_at
  BEFORE UPDATE ON vehicle_maintenance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicle_maintenance_vehicle_id ON vehicle_maintenance(vehicle_id);
CREATE INDEX idx_vehicle_maintenance_status ON vehicle_maintenance(status);
CREATE INDEX idx_vehicle_maintenance_date ON vehicle_maintenance(maintenance_date);

-- Create RLS Policies for vehicles table

-- Users can view vehicles assigned to them
CREATE POLICY "Users can view own vehicles"
  ON vehicles
  FOR SELECT
  USING (user_id = auth.uid());

-- Users can create new vehicle entries
CREATE POLICY "Users can create vehicles"
  ON vehicles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own vehicles
CREATE POLICY "Users can update own vehicles"
  ON vehicles
  FOR UPDATE
  USING (user_id = auth.uid());

-- Only admins can delete vehicles
CREATE POLICY "Admins can delete vehicles"
  ON vehicles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create RLS Policies for vehicle_maintenance table

-- Users can view maintenance records for their vehicles
CREATE POLICY "Users can view own maintenance records"
  ON vehicle_maintenance
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vehicles
      WHERE vehicles.id = vehicle_maintenance.vehicle_id
      AND vehicles.user_id = auth.uid()
    )
  );

-- Users can create maintenance records for their vehicles
CREATE POLICY "Users can create maintenance records"
  ON vehicle_maintenance
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM vehicles
      WHERE vehicles.id = vehicle_id
      AND vehicles.user_id = auth.uid()
    )
  );

-- Users can update maintenance records for their vehicles
CREATE POLICY "Users can update own maintenance records"
  ON vehicle_maintenance
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM vehicles
      WHERE vehicles.id = vehicle_maintenance.vehicle_id
      AND vehicles.user_id = auth.uid()
    )
  );

-- Only admins can delete maintenance records
CREATE POLICY "Admins can delete maintenance records"
  ON vehicle_maintenance
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );