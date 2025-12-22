/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    kakao: any;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Map {
        constructor(
          container: HTMLElement,
          options: {
            center: LatLng;
            level: number;
          }
        );
      }

      class Marker {
        constructor(options: {
          map: Map;
          position: LatLng;
        });
      }
    }
  }
}

export {};
