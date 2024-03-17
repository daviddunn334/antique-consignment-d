Generating types: https://supabase.com/docs/guides/api/rest/generating-types

npx supabase login
npx supabase gen types typescript --project-id "jbgabzlzzrxtvwrwjomu" --schema public > src/lib/models/gen/supabase.ts
