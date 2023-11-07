import { Eip1193Provider } from 'ethers';

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
  Terminated,
}
export class RpcError {
  code!: string;
  data!: {
    code: number;
    data: string;
    message: string;
  };
  message!: string;
}

export interface EthereumProviderWithEventSubscription extends Eip1193Provider {
  on: (eventName: string, listener: (args: never[]) => void) => void;
  removeListener: (event: string, callback: (args: never[]) => void) => void;
}
