-- ==============================================
-- BEING-App: simpan setting aksesibilitas per akun
-- Jalankan di Supabase Dashboard -> SQL Editor
-- ==============================================

alter table public.progress
  add column if not exists a11y jsonb;