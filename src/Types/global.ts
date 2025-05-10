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
  phone: string;
  address: string;
  city: string;
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


export interface IBook {
  author: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  offers: number;
  description: string;
  image: string;
  publisher: string;
  publicationDate: string;
  rating: number;
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
