import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://SEU-PROJETO.supabase.co',
  'SUA-ANON-KEY'
)

export default supabase