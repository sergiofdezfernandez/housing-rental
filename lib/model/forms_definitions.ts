export interface SignUpForm {
  email: string;
  password: string;
  role: string;
}
export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterPropertyFormModel {
  postalAddress: string;
  description: string;
  price: number;
  securityDeposit: number;
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
}

export interface RentPropertyFormModel {
  id: number;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  duration: number;
  deposit: number;
}
