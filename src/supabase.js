import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jkenhdrqdisfmafrdjqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZW5oZHJxZGlzZm1hZnJkanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDkxNTQsImV4cCI6MjA5NzE4NTE1NH0.LDOLzyeUZBmM_QO36cSQd8Ev2GUL44tk2s7O1x8WZlc"
);