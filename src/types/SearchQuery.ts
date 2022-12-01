import { Aggregation, Event } from '@/types/LiveEvents';
import { Host } from '@/types/Hosts';
import { Product } from '@/types/Product';

export type EventStatus = 'planned' | 'live' | 'vod';

export interface HomepageQuery {
  showExpired?: boolean;
  size?: number;
  page?: number;
}

export interface FetchError {
  active: boolean;
  message: string;
}

export interface FiltersSearchQuery {
  categories?: string[];
  tags?: string[];
  eventStartTimestampStart?: number;
  eventStartTimestampEnd?: number;
  currentStatuses?: EventStatus[];
  eventName?: string;
  storeNames?: string[];
}

export interface SortableField {
  field: 'tags' | 'storeName' | 'showDate' | 'category';
  direction: 'asc' | 'desc';
}

export interface SearchQuery extends FiltersSearchQuery {
  storeId?: string;
  storeIds?: string[];
  page?: number;
  size?: number;
  eventIds?: string[] | string;
  productIds?: string[] | string;
  showExpired?: boolean;
  sort?: SortableField;
  queryString?: string;
}

export interface ProductsSearchQuery extends SearchQuery {
  priceFrom?: number;
  priceTo?: number;
}

export interface HostsModel {
  count: number;
  rows: Host[];
}

export interface EventsResultsModel {
  count: number;
  rows: Event[];
}

export interface HostsSearchResults {
  hosts: {
    count: number;
    rows: Host[];
    aggregations: {
      category: Aggregation[];
      tags: Aggregation[];
      country: Aggregation[];
    };
  };
}

export interface HomepageSearchResults {
  liveEvents: EventsResultsModel;
  vods: EventsResultsModel;
  liveEventsPlanned: EventsResultsModel;
  hosts: HostsModel;
  featuredEvents: EventsResultsModel;
}

export interface SingleIdSearchResults {
  events: {
    count: number;
    rows: Event[];
  };
}

export interface ShowsSearchResults {
  events: {
    aggregations: {
      category: Aggregation[];
      tags: Aggregation[];
      currentStatus: Aggregation[];
    };
    count: number;
    rows: Event[];
    sort?: SortableField;
  };
}

export interface ProductsResults {
  products: {
    count: number;
    rows: Product[];
  };
}

export type FilterSelectListItem = {
  id: string;
  value: string;
  count: number;
};

export type ContactData = {
  email: string;
  message: string;
  timestamp?: number;
};
