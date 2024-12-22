import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Deal = Database['public']['Tables']['deals']['Row'] & {
  tags: string[];
};

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      try {
        // Fetch deals
        const { data: dealsData, error: dealsError } = await supabase
          .from('deals')
          .select('*')
          .order('created_at', { ascending: false });

        if (dealsError) throw dealsError;

        // Fetch tags for all deals
        const { data: tagsData, error: tagsError } = await supabase
          .from('deal_tags')
          .select('*');

        if (tagsError) throw tagsError;

        // Combine deals with their tags
        const dealsWithTags = dealsData.map(deal => ({
          ...deal,
          tags: tagsData
            .filter(tag => tag.deal_id === deal.id)
            .map(tag => tag.tag)
        }));

        setDeals(dealsWithTags);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  return { deals, loading, error };
}