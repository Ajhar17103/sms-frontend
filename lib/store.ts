// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '@/state/menu/menuReducer';

export const store = configureStore({
  reducer: {
	menu: menuReducer,
  },
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
