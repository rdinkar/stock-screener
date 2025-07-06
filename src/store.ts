import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./features/watchlistSlice";
import screenerReducer from "./features/screenerSlice";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    screener: screenerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
