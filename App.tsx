import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider, useDispatch, useSelector } from "react-redux";
import { UserState, fetchUser, store } from "./store";
import Router from "./navigations/Router";

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
