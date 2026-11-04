// ==========================================================================
// CUENTAS DE USUARIO: registro, inicio de sesión, sesión y cierre (Supabase Auth)
// ==========================================================================
(function () {
  const URL_ = window.TRIBU_SUPABASE_URL, KEY = window.TRIBU_SUPABASE_ANON_KEY;
  const configured = !!(URL_ && KEY);
  let client = null, session = null;
  const listeners = [];
  const ready = new Promise((resolve) => {
    if (!configured) return resolve(null);
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
    s.onload = async () => {
      client = window.supabase.createClient(URL_, KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
      const { data } = await client.auth.getSession();
      session = data.session;
      client.auth.onAuthStateChange((_e, s2) => { session = s2; listeners.forEach((f) => f(session)); });
      resolve(client);
    };
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
  window.tribuAuth = {
    configured, ready,
    get session() { return session; },
    get user() { return session && session.user; },
    onChange(f) { listeners.push(f); },
    async signUp(email, password, datos) {
      await ready;
      return client.auth.signUp({ email, password, options: { data: datos, emailRedirectTo: new URL('login.html', location.href).href } });
    },
    async signIn(email, password) { await ready; return client.auth.signInWithPassword({ email, password }); },
    async signOut() { await ready; return client.auth.signOut(); },
    async resetPassword(email) { await ready; return client.auth.resetPasswordForEmail(email, { redirectTo: new URL('nueva-clave.html', location.href).href }); },
    async updatePassword(password) { await ready; return client.auth.updateUser({ password }); },
  };
})();
