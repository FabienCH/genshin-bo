import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ArtifactsActionTypes } from './artifacts/artifacts-action';
import { appReducer, AppState } from './reducer';

export const appStore = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch = (): ThunkDispatch<AppState, void, ArtifactsActionTypes> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
