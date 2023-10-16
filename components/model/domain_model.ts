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

export interface LeaseAgreement {
  id: number;
  tenant: Tenant;
  property: Property;
  leaseStart: number;
  leaseDuration: number;
  totalRentPaid: number;
  state: State;
}

export interface Tenant {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

export enum State {
  Created,
  Started,
  Terminated
}