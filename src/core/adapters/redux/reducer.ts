import { artifactsReducer, ArtifactsState } from './artifacts/artifacts-reducer';

export interface AppState {
  artifacts: ArtifactsState;
}

export const appReducer = {
  artifacts: artifactsReducer,
};
