export {};

declare global {
  interface Window {
    kakao: any;
  }

  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Map {
        constructor(container: HTMLElement, options: any);
      }

      class Marker {
        constructor(options: any);
      }

      function load(callback: () => void): void;
    }
  }
}
