import {createClient} from "@supabase/supabase-js";
import {Database} from "./models/gen/supabase.ts";

export const supabase = createClient<Database>('https://jbgabzlzzrxtvwrwjomu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZ2Fiemx6enJ4dHZ3cndqb211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxNTkwNjEsImV4cCI6MjAyNDczNTA2MX0.mzChFaPmbTgPsbFRMe8dTzidLM85lNe6ZHu8WmEN68E')
