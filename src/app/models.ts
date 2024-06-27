export interface UserLogin {
  login: string;
  password: string;
}
export interface LoginResponse {
  response: boolean;
  jwt: string;
  status: string;
  name: string;
}
export interface Order {
  time: string;
  client: string;
  mentor: string;
  subject: string;
  price: number;
}
export interface Orders {
  orders: Order[];
}
