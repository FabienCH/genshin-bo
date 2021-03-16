import { createAction } from '@reduxjs/toolkit';
import { Build } from '../../../domain/models/build';

export const addBuildsAction = createAction<Build[]>('[Entities/Builds] Add Builds');

export const removeAllBuildsAction = createAction('[Entities/Builds] Remove All Builds');

export type BuildsActionTypes = typeof addBuildsAction | typeof removeAllBuildsAction;
