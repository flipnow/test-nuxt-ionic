export interface Order {
  uid: string;
  checkoutUid: string;
  eventUid: string;
  hostName: string;
  campaignUid: string;
  campaignName: string;
  timeCreated: number;
  timeCompleted: number;
  deadline: number;
  customerUid: string;
  pageUid: string;
  status: OrderStages;
  qtyProducts: number;
  totalPrice: number;
  products: {
    uid: string;
    name: string;
    unitPrice: number;
    quantity: number;
    linkToProduct?: string;
  }[];
  checkoutLink: string;
}

type OrderStages = 'pending' | 'payment_unverified' | 'paid' | 'exported_not_handled' | 'completed';
