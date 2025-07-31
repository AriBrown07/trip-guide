declare namespace ymaps {
  function ready(callback: () => void): void;
  function suggest(query: string, options?: any): Promise<any[]>;
  function geocode(address: string, options?: any): Promise<any>;

  namespace GeoObject {
    function get(index: number): any;
  }

  namespace geometry {
    function getCoordinates(): [number, number];
  }
}

declare namespace ymaps {
  function ready(callback: () => void): void;

  interface SuggestView {
    new(element: string | HTMLElement, options?: any): SuggestView;
    events: any;
  }

  interface Geocoder {
    geocode(address: string, options?: any): Promise<any>;
  }

  interface IGeocodeResult {
    geoObjects: IGeoObjectCollection;
  }

  const SuggestView: SuggestView;
  const geocode: Geocoder;
  const GeoObject: any;
}

declare const ymaps: {
  ready: (callback: () => void) => void;
  SuggestView: ymaps.SuggestView;
  geocode: ymaps.Geocoder;
  GeoObject: any;
};

declare namespace ymaps {
  interface Placemark {
    properties: {
      get(key: string): any;
    };
    // Добавьте другие необходимые методы/свойства
  }
}

