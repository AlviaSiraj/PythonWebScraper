import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import questionReducer from "./questionReducer";

const store = configureStore({
  reducer: {
    questions: questionReducer,
    reducer: reducer,
    // other reducers if you have them
  },
});

export default store;
