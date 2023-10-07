export interface Property {
  id: number;
  landlord: Landlord;
  postalAddress: String;
  description: String;
  price: number;
  securityDeposit: number;
  isRented: boolean;
}

export interface Landlord {
  name: String;
  phoneNumber: String;
  email: String;
}