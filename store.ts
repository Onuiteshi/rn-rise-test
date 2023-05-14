import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  first_name: string;
  last_name: string;
  date_of_birth: string | undefined;
  email_address: string | undefined;
  password: string | undefined;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const signup = (data: User) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/users",
      data
    );

    console.warn(response);

    if (response.status === 201) {
      const userData = response.data;
      dispatch(setUser(userData));
    }
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

export const fetchUser = () => async (dispatch: any) => {
  try {
    const response = await fetch("https://api.example.com/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const userData = await response.json();
      dispatch(setUser(userData));
    }
  } catch (error) {
    console.error("Fetching user failed:", error);
  }
};

export const { setUser, logout } = userSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
