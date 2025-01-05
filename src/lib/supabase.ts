import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://fyvpcqhrrehnboncbufk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5dnBjcWhycmVobmJvbmNidWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5ODc4NzQsImV4cCI6MjA1MTU2Mzg3NH0.cuuhnx7HLnjGKSSe6SBW4j-kkOzjlwOfDsPoH9aB19A';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);