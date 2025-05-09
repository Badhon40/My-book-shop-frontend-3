/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

// Define a custom type for the token payload
export interface CustomJwtPayload {
  role?: string; // Add 'role' property (optional)
  [key: string]: any; // Allow additional properties
}

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwtDecode<CustomJwtPayload>(token); // Specify the type of the decoded payload
};