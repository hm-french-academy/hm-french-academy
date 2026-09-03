import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './supabase-config.js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export async function requireAuth(redirect = 'login.html') {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    window.location.replace(redirect);
    return null;
  }
  return data.session;
}

export async function logout(redirect = 'login.html') {
  try {
    if (window.HMProgress?.flush) await window.HMProgress.flush();
  } catch (e) {
    console.warn('HM Academy: progress flush before logout failed.', e);
  }
  await supabase.auth.signOut();
  window.location.replace(redirect);
}

// HM Academy: account-based access repair trigger.
// v2026-09-03
