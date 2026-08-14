// ==========================================================================
// SUPABASE CLIENT — add this file next to app.js, name it supabaseClient.js
// ==========================================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Get these two values from: Supabase Dashboard > Project Settings > API
const SUPABASE_URL = 'https://pdhlbpzrsrxjynmgllzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkaGxicHpyc3J4anlubWdsbHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MDEyODUsImV4cCI6MjEwMjE3NzI4NX0.3meRz7NafCO110V1DgCJGK8T6-wtuaf05dE8kCYkn8c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
