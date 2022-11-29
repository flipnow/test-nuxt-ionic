/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    elisa: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    Elisa: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    safari: any;
  }
}

declare module 'flubber' {
  function interpolate(...paths: string[]): (offset: number) => string;
  export { interpolate };
}

declare namespace cookiebot {
  class Cookiebot {
    renew(): void;
  }
}

interface Window {
  readonly Cookiebot: cookiebot.Cookiebot;
}
