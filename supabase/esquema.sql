-- ==========================================================================
-- La Tribu del Oro · Tabla de perfiles de usuario
-- Pégalo en Supabase → SQL Editor → New query → Run (una sola vez).
-- Las contraseñas NO se guardan aquí: Supabase las guarda cifradas en su sistema de autenticación.
-- ==========================================================================
create table if not exists public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  correo text,
  pais text,
  whatsapp text,
  interes text,
  autoriza_datos boolean not null default false,
  autoriza_marketing boolean not null default false,
  mayor_edad boolean not null default false,
  politica_version text,
  fecha_autorizacion timestamptz,
  creado_en timestamptz not null default now()
);

alter table public.perfiles enable row level security;

-- Cada usuario solo puede ver y editar SU propio perfil. Tú ves todos desde el panel de Supabase.
drop policy if exists "ver mi perfil" on public.perfiles;
create policy "ver mi perfil" on public.perfiles for select using (auth.uid() = id);
drop policy if exists "editar mi perfil" on public.perfiles;
create policy "editar mi perfil" on public.perfiles for update using (auth.uid() = id);

-- Al crearse una cuenta, se copia automáticamente su información de registro a "perfiles".
create or replace function public.crear_perfil()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfiles (id, nombre, correo, pais, whatsapp, interes, autoriza_datos, autoriza_marketing, mayor_edad, politica_version, fecha_autorizacion)
  values (
    new.id,
    new.raw_user_meta_data->>'nombre',
    new.email,
    new.raw_user_meta_data->>'pais',
    new.raw_user_meta_data->>'whatsapp',
    new.raw_user_meta_data->>'interes',
    coalesce((new.raw_user_meta_data->>'autoriza_datos')::boolean, false),
    coalesce((new.raw_user_meta_data->>'autoriza_marketing')::boolean, false),
    coalesce((new.raw_user_meta_data->>'mayor_edad')::boolean, false),
    new.raw_user_meta_data->>'politica_version',
    (new.raw_user_meta_data->>'fecha_autorizacion')::timestamptz
  );
  return new;
end; $$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users
  for each row execute function public.crear_perfil();
