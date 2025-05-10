import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  userId: string;                // User's unique ID (converted from ObjectId to string)
  role: 'user' | 'admin';        // Role
  email: string;                 // Email
  iat: number;                   // JWT Issued At timestamp
  exp: number;                   // JWT Expiration timestamp
  orders?: string[];             // Optional array of order IDs (ObjectId converted to string)
  cart?: string[];               // Optional array of cart item IDs (ObjectId converted to string)
  name?: string;                 // Optional name of the user
  phone?: string;                // Optional phone number
  address?: string;              // Optional address
  city?: string;                 // Optional city
  activity?: 'activated' | 'deactivated'; // Optional activity status
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
