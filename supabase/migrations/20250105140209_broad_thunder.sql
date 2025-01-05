/*
  # Create Vehicle Store Tables

  1. New Tables
    - `regular_vehicles` - For standard vehicle store
    - `pool_vehicles` - For pool vehicle store  
    - `salary_vehicles` - For salary sacrifice store

  Each table includes:
    - Base vehicle fields (id, make, model, etc.)
    - Store-specific fields
    - Standard equipment field
    - Timestamps and user references
    
  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
    - Add policies for admin access

  3. Indexes
    - Add indexes for frequently queried columns
*/

-- Create vehicle type enum if not exists
DO $$ BEGIN
  CREATE TYPE vehicle_type AS ENUM ('limousine', 'kombi', 'suv', 'coupe', 'cabrio');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create fuel type enum if not exists
DO $$ BEGIN
  CREATE TYPE fuel_type AS ENUM ('benzin', 'diesel', 'elektro', 'hybrid');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create transmission type enum if not exists
DO $$ BEGIN
  CREATE TYPE transmission_type AS ENUM ('automatik', 'manuell');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create vehicle status enum if not exists
DO $$ BEGIN
  CREATE TYPE vehicle_status AS ENUM ('available', 'in_use', 'maintenance');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Base vehicle table template
CREATE OR REPLACE FUNCTION create_vehicle_table(table_name text) 
RETURNS void AS $$
BEGIN
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      make text NOT NULL,
      model text NOT NULL,
      year integer NOT NULL,
      type vehicle_type NOT NULL,
      status vehicle_status NOT NULL DEFAULT ''available'',
      color text,
      mileage integer DEFAULT 0,
      fuel_type fuel_type NOT NULL,
      transmission transmission_type NOT NULL,
      power integer NOT NULL,
      engine_size integer,
      electric_range integer,
      equipment_variant text NOT NULL,
      delivery_time integer NOT NULL,
      standard_equipment text,
      gross_list_price decimal(10,2) NOT NULL,
      custom_equipment jsonb DEFAULT ''[]''::jsonb,
      images jsonb DEFAULT ''[]''::jsonb,
      features jsonb DEFAULT ''[]''::jsonb,
      custom_features jsonb DEFAULT ''{}''::jsonb,
      available_colors jsonb DEFAULT ''[]''::jsonb,
      services jsonb NOT NULL DEFAULT ''{"insurance":true,"maintenance":true,"delivery":true,"winterTires":true,"gap":true,"roadside":true,"damageManagement":true}''::jsonb,
      service_prices jsonb NOT NULL DEFAULT ''{"insurance":89,"maintenance":59,"winterTires":39,"gap":19,"roadside":15,"damageManagement":29}''::jsonb,
      leasing_rates jsonb NOT NULL DEFAULT ''{"36_10000":0,"36_15000":0,"36_20000":0,"48_10000":0,"48_15000":0,"48_20000":0}''::jsonb,
      one_time_costs jsonb NOT NULL DEFAULT ''{"registration":0,"homeDelivery":0,"transfer":0}''::jsonb,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      created_by uuid REFERENCES auth.users(id)
    )', table_name);
END;
$$ LANGUAGE plpgsql;

-- Create tables for each store
SELECT create_vehicle_table('regular_vehicles');
SELECT create_vehicle_table('pool_vehicles');
SELECT create_vehicle_table('salary_vehicles');

-- Enable RLS
ALTER TABLE regular_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_vehicles ENABLE ROW LEVEL SECURITY;

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_regular_vehicles_updated_at
  BEFORE UPDATE ON regular_vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_pool_vehicles_updated_at
  BEFORE UPDATE ON pool_vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_salary_vehicles_updated_at
  BEFORE UPDATE ON salary_vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create indexes
DO $$ 
BEGIN
  -- Regular vehicles indexes
  CREATE INDEX IF NOT EXISTS idx_regular_vehicles_make_model 
    ON regular_vehicles(make, model);
  CREATE INDEX IF NOT EXISTS idx_regular_vehicles_status 
    ON regular_vehicles(status);
  CREATE INDEX IF NOT EXISTS idx_regular_vehicles_type 
    ON regular_vehicles(type);
  CREATE INDEX IF NOT EXISTS idx_regular_vehicles_fuel_type 
    ON regular_vehicles(fuel_type);
  
  -- Pool vehicles indexes
  CREATE INDEX IF NOT EXISTS idx_pool_vehicles_make_model 
    ON pool_vehicles(make, model);
  CREATE INDEX IF NOT EXISTS idx_pool_vehicles_status 
    ON pool_vehicles(status);
  CREATE INDEX IF NOT EXISTS idx_pool_vehicles_type 
    ON pool_vehicles(type);
  CREATE INDEX IF NOT EXISTS idx_pool_vehicles_fuel_type 
    ON pool_vehicles(fuel_type);
  
  -- Salary vehicles indexes
  CREATE INDEX IF NOT EXISTS idx_salary_vehicles_make_model 
    ON salary_vehicles(make, model);
  CREATE INDEX IF NOT EXISTS idx_salary_vehicles_status 
    ON salary_vehicles(status);
  CREATE INDEX IF NOT EXISTS idx_salary_vehicles_type 
    ON salary_vehicles(type);
  CREATE INDEX IF NOT EXISTS idx_salary_vehicles_fuel_type 
    ON salary_vehicles(fuel_type);
END $$;

-- Create RLS policies for each table
DO $$ 
BEGIN
  -- Regular vehicles policies
  EXECUTE $policy$
    CREATE POLICY "Anyone can view regular vehicles"
      ON regular_vehicles FOR SELECT
      USING (true);
      
    CREATE POLICY "Admins can insert regular vehicles"
      ON regular_vehicles FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
      
    CREATE POLICY "Admins can update regular vehicles"
      ON regular_vehicles FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
      
    CREATE POLICY "Admins can delete regular vehicles"
      ON regular_vehicles FOR DELETE
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
  $policy$;

  -- Pool vehicles policies
  EXECUTE $policy$
    CREATE POLICY "Anyone can view pool vehicles"
      ON pool_vehicles FOR SELECT
      USING (true);
      
    CREATE POLICY "Admins can insert pool vehicles"
      ON pool_vehicles FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
      
    CREATE POLICY "Admins can update pool vehicles"
      ON pool_vehicles FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
      
    CREATE POLICY "Admins can delete pool vehicles"
      ON pool_vehicles FOR DELETE
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
  $policy$;

  -- Salary vehicles policies
  EXECUTE $policy$
    CREATE POLICY "Anyone can view salary vehicles"
      ON salary_vehicles FOR SELECT
      USING (true);
      
    CREATE POLICY "Admins can insert salary vehicles"
      ON salary_vehicles FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
      
    CREATE POLICY "Admins can update salary vehicles"
      ON salary_vehicles FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
      
    CREATE POLICY "Admins can delete salary vehicles"
      ON salary_vehicles FOR DELETE
      USING (
        EXISTS (
          SELECT 1 FROM auth.users
          WHERE auth.users.id = auth.uid()
          AND auth.users.role = 'admin'
        )
      );
  $policy$;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;