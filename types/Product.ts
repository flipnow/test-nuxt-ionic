export type Product = {
  uid: string;
  name: string;
  image?: {
    url: string;
  };
  price: number;
  presentationTime: number;
  presentationEndTime: number;
  liveEvent: {
    id: string;
    event: {
      id: string;
      liveVideoCover: string;
      coverPhotoPath: string;
      eventName: string;
      liveStartTime: number;
      storeInfo: {
        id: string;
        name: string;
        currency: string;
        picture: string;
      };
      tags: string[];
    };
  };
};
