export interface ICandidateInfo {
  picture: {
    large: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
    gender: string;
  };
  dob: {
    age: number;
    date: string;
  };
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    timezone: {
      description: string;
      offset: number;
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
}
