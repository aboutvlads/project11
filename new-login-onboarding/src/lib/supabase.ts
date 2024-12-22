import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserPreferences {
  id: string;
  home_airport: string;
  bucket_list_destinations: string[];
  notification_preferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  updated_at: string;
}

export const updateUserPreferences = async (
  userId: string,
  preferences: Partial<UserPreferences>
) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert(
      {
        id: userId,
        ...preferences,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

  if (error) throw error;
  return data;
};
