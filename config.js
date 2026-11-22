// Use a URL e a chave PUBLICÁVEL/anon do seu projeto Supabase.
// Nunca coloque a chave service_role ou secret no site.
const SUPABASE_URL = "COLE_A_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = "COLE_A_CHAVE_PUBLICA";
const supabaseConfigured = SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("COLE_A") && !SUPABASE_ANON_KEY.includes("COLE_A");
