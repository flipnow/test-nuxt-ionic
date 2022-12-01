import { client } from './client';
import { HomepageSearchResults, HomepageQuery } from '@/types/SearchQuery';

export const fetchHomepage = async (params: HomepageQuery) =>
  client.post<HomepageSearchResults>('/search/homepage', params);
