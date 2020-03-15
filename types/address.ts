export interface Address {
  id: string;
  region: string;
  address: string;
  postcode: string;
  receiver: {
    name: string,
    phone: string;
  }
  defaulted: boolean;
}