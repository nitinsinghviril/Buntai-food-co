-- Run in Supabase > SQL Editor.

-- ============ STEP 1 (run now, does not affect the POS) ============
-- Read-only functions the dashboard calls. They only return rows for the
-- company code that is passed in.
create or replace function public.dash_orders(p_code text)
returns table(id text, data jsonb, created_at bigint)
language sql security definer set search_path = public as $$
  select o.id, o.data, o.created_at
  from pos_orders o
  where o.company_code = p_code and o.deleted = false and o.data is not null
  order by o.created_at;
$$;

create or replace function public.dash_company(p_code text)
returns jsonb
language sql security definer set search_path = public as $$
  select c.data from pos_companies c where c.company_code = p_code limit 1;
$$;

grant execute on function public.dash_orders(text)  to anon, authenticated;
grant execute on function public.dash_company(text) to anon, authenticated;

-- ============ STEP 2 (run ONLY after the POS is updated) ============
-- Today anyone holding the publishable key can read/write both tables directly,
-- so the company code is only protected by being hard to guess.
-- To truly lock it, turn on RLS and require the POS to send a header
-- "x-company-code" with every request (supabase-js: createClient(url, key,
-- { global: { headers: { 'x-company-code': CODE } } })).
-- WARNING: running this before the POS sends that header will break POS sync.
--
-- alter table pos_orders    enable row level security;
-- alter table pos_companies enable row level security;
--
-- create policy "own company orders" on pos_orders for all to anon
--   using      (company_code = (current_setting('request.headers', true)::json ->> 'x-company-code'))
--   with check (company_code = (current_setting('request.headers', true)::json ->> 'x-company-code'));
--
-- create policy "own company settings" on pos_companies for all to anon
--   using      (company_code = (current_setting('request.headers', true)::json ->> 'x-company-code'))
--   with check (company_code = (current_setting('request.headers', true)::json ->> 'x-company-code'));
--
-- The dashboard functions above keep working because they are security definer.
