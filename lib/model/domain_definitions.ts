export interface Property {
  id: number;
  landlord: Landlord;
  postalAddress: string;
  description: string;
  price: number;
  securityDeposit: number;
  isRented: boolean;
}
export interface Landlord {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface LeaseAgreement {
  id: number;
  tenant: Tenant;
  property: Property;
  leaseStart: number;
  leaseDuration: number;
  totalRentPaid: number;
  state: State;
  file: ContractFile;
}

export interface ContractFile {
  fileName: string;
  ipfsHash: string;
  uploadDate: Date;
  leaseAgreementId: number;
}

export enum State {
  Created = 0,
  Started = 1,
  Terminated = 2,
}

export interface Tenant {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface User {
  email?: string;
  password?: string;
  roles?: Array<string>;
}
