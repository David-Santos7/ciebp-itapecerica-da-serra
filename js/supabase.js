// ==========================================
// CONFIG SUPABASE
// ==========================================

// URL do projeto
const SUPABASE_URL =
  'https://SEU-PROJETO.supabase.co'

// Chave pública ANON
const SUPABASE_ANON_KEY =
  'sb_publishable_QHZWgDbGu-7PVGgHRKJn3A_AqY2UvB-'

// Instância global
export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)

/*

// Lightweight non-module wrapper to expose a global Supabase client
// Uses the same URL/key as js/config/supabase.js
;(function(){
  if (window.supabaseClient) return;
  const SUPABASE_URL = 'https://sforgndgcxkbbzstbehu.supabase.co'
  const SUPABASE_ANON_KEY = 'sb_publishable_QHZWgDbGu-7PVGgHRKJn3A_AqY2UvB-'
  if (typeof supabase === 'undefined') {
    console.warn('Supabase CDN not loaded; realtime and db will not function.');
    return;
  }
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } })
})();
*/