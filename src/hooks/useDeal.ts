import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Deal = Database['public']['Tables']['deals']['Row'] & {
  tags: string[];
};

export function useDeal(id: string | undefined) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeal() {
      if (!id) {
        setError('No deal ID provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch deal
        const { data: dealData, error: dealError } = await supabase
          .from('deals')
          .select('*')
          .eq('id', id)
          .single();

        if (dealError) throw dealError;

        // Fetch tags for the deal
        const { data: tagsData, error: tagsError } = await supabase
          .from('deal_tags')
          .select('tag')
          .eq('deal_id', id);

        if (tagsError) throw tagsError;

        // Combine deal with its tags
        const dealWithTags = {
          ...dealData,
          tags: tagsData.map(t => t.tag)
        };

        setDeal(dealWithTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDeal();
  }, [id]);

  return { deal, loading, error };
}