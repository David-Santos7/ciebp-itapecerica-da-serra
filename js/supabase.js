const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA-CHAVE-ANON';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// deixa global
window.supabaseClient = supabase;