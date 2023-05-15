import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  email_address: string | undefined;
  password: string | undefined;
}

interface UserState {
  user: User | null;
  token: String;
}

const initialState: UserState = {
  user: null,
  token: "",
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
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(
    "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/users",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 201) {
        const userData = data.data;
        dispatch(setUser(userData));
      }
    });
};

export const signin = (data: User) => async (dispatch: any) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(
    "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/sessions",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.status === 200) {
        const userData = data.data;
        dispatch(setUser(userData));
      }
    });
};

export const fetchUser = () => async (dispatch: any) => {
  try {
    const response = await fetch(
      "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/sessions",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

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
