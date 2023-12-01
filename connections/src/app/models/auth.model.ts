export interface SignUpModel {
  email: string;
  name: string;
  password: string;
}

export interface SignInModel {
  email: string;
  password: string;
}

export interface SignInResponseModel {
  token: string;
  uid: string;
}
