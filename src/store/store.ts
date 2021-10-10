import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers/reducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {stateOne: StateOneType, stateTwo: StateTwoType}
export type AppDispatch = typeof store.dispatch

export default store;
