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

notify pgrst, 'reload schema';
