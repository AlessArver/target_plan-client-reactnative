import React from "react";
import { Provider } from "react-redux";

import store from "./src/flux";
import { Routing } from "./src/routing";

export default function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}
