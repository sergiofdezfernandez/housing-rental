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
  name: string;
  phoneNumber: string;
  email: string;
  duration: number;
  deposit: number;
}
