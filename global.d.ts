declare global {
  interface Window {
    daum: {
      Postcode: new (options: { oncomplete: (data: any) => void }) => any;
    };
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => any;
        Map: new (
          container: HTMLElement,
          options: { center: any; level: number }
        ) => any;
        Marker: new (options: { position: any; map: any }) => any;
        InfoWindow: new (options: { content: string }) => any;
        MarkerClusterer: new (options: {
          map: any;
          averageCenter?: boolean;
          minLevel?: number;
        }) => any;
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: any[], status: string) => void
            ) => void;
          };
          Status: {
            OK: string;
          };
        };
        event: {
          addListener: (target: any, type: string, callback: () => void) => void;
        };
      };
    };
  }
}

export {};