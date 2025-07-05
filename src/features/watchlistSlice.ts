import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import mockData from "../assets/mock-data-json.json";

export interface Watchlist {
  id: number;
  name: string;
  stocks: string[];
  createdAt: string;
  updatedAt: string;
  alerts?: boolean;
  alertNote?: string;
}

interface WatchlistState {
  watchlists: Watchlist[];
  selectedId: number | null;
}

const initialState: WatchlistState = {
  watchlists: mockData.watchlists.map((wl) => ({
    ...wl,
    alerts: false,
    alertNote: "",
  })),
  selectedId: mockData.watchlists.length > 0 ? mockData.watchlists[0].id : null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addWatchlist(state, action: PayloadAction<{ name: string }>) {
      const newId = Math.max(0, ...state.watchlists.map((w) => w.id)) + 1;
      const now = new Date().toISOString();
      state.watchlists.push({
        id: newId,
        name: action.payload.name,
        stocks: [],
        createdAt: now,
        updatedAt: now,
        alerts: false,
        alertNote: "",
      });
      state.selectedId = newId;
    },
    editWatchlist(state, action: PayloadAction<{ id: number; name: string }>) {
      const wl = state.watchlists.find((w) => w.id === action.payload.id);
      if (wl) {
        wl.name = action.payload.name;
        wl.updatedAt = new Date().toISOString();
      }
    },
    deleteWatchlist(state, action: PayloadAction<number>) {
      state.watchlists = state.watchlists.filter(
        (w) => w.id !== action.payload
      );
      if (state.selectedId === action.payload) {
        state.selectedId =
          state.watchlists.length > 0 ? state.watchlists[0].id : null;
      }
    },
    selectWatchlist(state, action: PayloadAction<number>) {
      state.selectedId = action.payload;
    },
    reorderStocks(
      state,
      action: PayloadAction<{ id: number; stocks: string[] }>
    ) {
      const wl = state.watchlists.find((w) => w.id === action.payload.id);
      if (wl) {
        wl.stocks = action.payload.stocks;
        wl.updatedAt = new Date().toISOString();
      }
    },
    setAlerts(state, action: PayloadAction<{ id: number; alerts: boolean }>) {
      const wl = state.watchlists.find((w) => w.id === action.payload.id);
      if (wl) wl.alerts = action.payload.alerts;
    },
    setAlertNote(state, action: PayloadAction<{ id: number; note: string }>) {
      const wl = state.watchlists.find((w) => w.id === action.payload.id);
      if (wl) wl.alertNote = action.payload.note;
    },
  },
});

export const {
  addWatchlist,
  editWatchlist,
  deleteWatchlist,
  selectWatchlist,
  reorderStocks,
  setAlerts,
  setAlertNote,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
