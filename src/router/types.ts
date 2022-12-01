export enum RouteName {
  Home = 'Home',
  SingleShow = 'SingleShow',
  Shows = 'Shows',
  Products = 'Products',
  Categories = 'Categories',
  Orders = 'Orders',
  GetFeatured = 'GetFeatured',
  Hosts = 'Hosts',
  MoreMenu = 'MoreMenu',
  SingleHost = 'Single Host',
  Favorites = 'Favorites',
  GetInTouch = 'GetInTouch',
  TermsAndConditions = 'TermsAndConditions',
  PrivacyPolicy = 'PrivacyPolicy',
  AccountClosed = 'AccountClosed',
  HowItWorks = 'How It Works',
  Profile = 'Profile',
  NotFound = 'NotFound',
}

export const mobileRoutes = [RouteName.Home, RouteName.Shows, RouteName.Hosts /*RouteName.Products*/] as const;

export type TabRoutes = typeof mobileRoutes[number];
