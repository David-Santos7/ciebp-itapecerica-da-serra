
const SUPABASE_URL =
  'https://sforgndgcxkbbzstbehu.supabase.co'

const SUPABASE_ANON_KEY =
  'sb_publishable_QHZWgDbGu-7PVGgHRKJn3A_AqY2UvB-'

// ========================================
// CLIENT
// ========================================

const supabaseClient =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  )

// ========================================
// EXPORT GLOBAL
// ========================================

window.supabaseClient =
  supabaseClient