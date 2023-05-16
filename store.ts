import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

export interface User {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email_address: string | undefined;
  password: string | undefined;
}

export interface UserState {
  user: User | null;
  token: String;
  plans: {};
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  token: "",
  plans: {},
  loading: false,
};

export const signin = (myData: any) => async (dispatch: any) => {
  const { data, navigation } = myData;
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
      if (data.token) {
        dispatch(setToken(data.token));
        Alert.alert("Success", "Login Successful");
      } else {
        Alert.alert("Error", data.message);
      }
    });
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    setPlans: (state, action: PayloadAction<any>) => {
      state.plans = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
    },
  },
});

export const signup = (myData: any) => async (dispatch: any) => {
  const { data, navigation } = myData;
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
      if (data.id) {
        const userData = data;
        dispatch(setUser(userData));
        navigation.navigate("Done");
      } else {
        Alert.alert("Error", data.message);
      }
    });
};
export const signout = async () => {
  console.log("i reach");
  let dispatch = useDispatch();

  await dispatch(logout());
};

export const createplan =
  (myData: { data: {}; token: any; handleNext: () => void }) =>
  async (dispatch: any) => {
    const { data, token, handleNext } = myData;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    fetch(
      "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/plans",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          handleNext();
          dispatch(fetchPlans(token));
        } else {
          Alert.alert("Error", data.message);
        }
      });
  };

export const fetchSession = (token: string) => async (dispatch: any) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(
    "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/sessions",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.id) {
        dispatch(setUser(data));
      }
    });
};

export const fetchPlans = (token: string) => async (dispatch: any) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(
    "https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/plans",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.item_count) {
        dispatch(setPlans(data));
      }
    });
};

export const { setUser, setToken, setPlans, logout } = userSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
