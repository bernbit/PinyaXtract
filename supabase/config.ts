import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// Supabase Credentials
const SUPABASE_URL = "https://gseynolxaeekeeawzjtg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZXlub2x4YWVla2VlYXd6anRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNDY2NzQsImV4cCI6MjA1NDkyMjY3NH0.YdXAX2z_q40h09Ju-bfqGY989XjKOlVFxp-ZxPFVxg8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
