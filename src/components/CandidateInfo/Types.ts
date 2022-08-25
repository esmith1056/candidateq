export interface ICandidateInfo {
  picture: {
    large: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    age: number;
    date: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    timezone: {
      description: string;
      offset: string;
    };
  };
  email: string;
  phone: string;
  cell: string;
  registered: {
    age: number;
    date: string;
  };
  id: {
    name?: string;
    value?: string;
  };
  gender: string;
  admission?: string;
  comment?: string;
}
