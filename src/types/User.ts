export type HostsNotifications = {
  otherNews: boolean;
  showsStarting: boolean;
};

export type SpriiNotifications = {
  highlightedEvents: boolean;
  newHosts: boolean;
  updates: boolean;
};

export interface Notifications {
  hosts: HostsNotifications;
  sprii: SpriiNotifications;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  followedHosts: string[];
  followedEvents: string[];
  followedProducts: string[];
  notifications: Notifications;
}

export const enum ProviderId {
  FACEBOOK = 'facebook.com',
  GITHUB = 'github.com',
  GOOGLE = 'google.com',
  PASSWORD = 'password',
  PHONE = 'phone',
  TWITTER = 'twitter.com',
  APPLE = 'apple.com',
}
