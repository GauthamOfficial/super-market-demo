-- Link orders to Clerk users for account order history.
-- When a signed-in user places an order, we set clerk_user_id so they can see their orders on /account.
alter table public.orders
  add column if not exists clerk_user_id text;

create index if not exists idx_orders_clerk_user_id on public.orders (clerk_user_id);

comment on column public.orders.clerk_user_id is 'Clerk user id (e.g. user_xxx) when order was placed while signed in; null for guest orders.';
