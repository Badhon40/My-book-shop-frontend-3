import { ReactNode } from "react";

// Newly added types

export type TRoutes = {
  index?: boolean;
  path?: string;
  element?: ReactNode;
  children?: TRoutes[];
  name?: string;
};

export interface TransactionDetails {
  user: { email: string };
  _id: string;
  status: string;
  totalPrice: number;
  createdAt: Date;
  transaction?: {
    id: string;
    method: string;
    transactionStatus: string;
  };
}
export interface User {
  id: string;
  activity: string;
  createdAt: string;
  name: string;
  email: string;
  role: string;
  _id: string;
}
export interface UserToken {
  id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
  token: string;
}
export interface CartItem {
  userId: string;
  bookId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IBook {
  author: string;
  title: string;
  price: number;
  _id: string;
}

export interface IResponseBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
}
