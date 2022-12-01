export interface ProductImage {
  url: string;
}

export interface CampaignPresentationVariant {
  available: boolean;
  uid: string;
  variantNames: string[];
}

export interface LifeVideoFormatAPI {
  width: number;
  height: number;
  picture?: string;
}

export interface CampaignPresentationProduct {
  price: number;
  uid: string;
  searchWords: string[];
  available: boolean;
  variants: CampaignPresentationVariant[];
  sorting: number;
  presentationTime: number;
  liveFinished: boolean;
  name: string;
  suggestedRetailPrice: number;
  images: ProductImage[];
  image: ProductImage;
  offerInCheckout: boolean;
  presentationEndTime: number;
  presentationStartTime: number;
}

export interface CampaignPresentationProducts {
  [id: string]: CampaignPresentationProduct;
}

export type EventStatus = 'live' | 'vod' | 'planned';

export interface Event {
  id: string;

  event: {
    id: string;
    source: string;
    coverPhotoPath: string;
    campaignId: string;
    status: string;
    eventStartTimestamp: number;
    liveVideoCover: string;
    currentStatus: EventStatus;
    description: string;
    eventName: string;
    storeInfo: {
      id: string;
      source: string;
      name: string;
      currency: string;
      country: string;
      picture: string;
      cover: string;
    };
    cdn: string;
    cdnVideoId: string;
    liveStartTime: number;
    liveEndTime: number;
    liveVideoBroadcastDelay?: number;
    liveVideoFormat?: LifeVideoFormatAPI;
    category: string;
    tags: string[];
  };
  campaign: {
    deadline?: number | null;
    products?: {
      [id: string]: CampaignPresentationProduct;
    };
  };
}
export interface EventUpdateDocument {
  time: number;
  updatedEvent: Event;
}

export interface WidgetEvent {
  campaignId: string;
  eventStartTimestamp: number;
  eventName: string;
  description: string;
  deadline: number;
  liveStartTime: number;
  currentStatus: string;
}

export type Aggregation = {
  key: string;
  doc_count: number;
};
