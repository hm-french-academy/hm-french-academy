import { supabase } from './auth-guard.js';

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user || null;
}

export async function updateStudentProfile(fields = {}) {
  const allowed = {};
  if (typeof fields.full_name === 'string') allowed.full_name = fields.full_name.trim();
  if (!Object.keys(allowed).length) return { data: null, error: null };
  return supabase.auth.updateUser({ data: allowed });
}

export async function changePassword(password) {
  return supabase.auth.updateUser({ password });
}
