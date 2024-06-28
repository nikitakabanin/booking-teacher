export interface UserLoginReq {
  login: string;
  password: string;
}
export interface UserLoginRes {
  jwt: string;
  role: string;
  name: string;
  login: string;
}
export interface UserRegReq {
  name: string;
  login: string;
  password: string;
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
