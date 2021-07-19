export interface Profile {
  id: {
    name: string;
    value: string | null;
  };
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      name: string;
      number: number;
    };
    city: string;
    country: string;
    state: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      description: string;
      offset: string;
    };
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
