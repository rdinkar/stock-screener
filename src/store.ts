import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./features/watchlistSlice";
import screenerReducer from "./features/screenerSlice";
// import screenerReducer from './features/screener/screenerSlice';

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    screener: screenerReducer,
    // screener: screenerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
