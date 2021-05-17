import { configureStore, getDefaultMiddleware, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ArtifactsActionTypes } from './artifacts/artifacts-action';
import { artifactsMiddleware } from './artifacts/artifacts-middleware';
import { buildsMiddleware } from './builds/builds-middleware';
import { appReducer, AppState } from './reducer';

export const appStore = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [...getDefaultMiddleware(), artifactsMiddleware, buildsMiddleware],
});

export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch = (): ThunkDispatch<AppState, void, ArtifactsActionTypes> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
