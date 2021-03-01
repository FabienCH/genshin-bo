import { formPlaceholder, FormPlaceholder } from './form-placeholder';
import { SetStats } from './set-statistics';

export enum SetNames {
  gladiatorsFinale = 'gladiatorsFinale',
  wanderersTroupe = 'wanderersTroupe',
  maidenBeloved = 'maidenBeloved',
  retracingBolide = 'retracingBolide',
  crimsonWitchOfFlames = 'crimsonWitchOfFlames',
  lavawalker = 'lavawalker',
  heartOfDepth = 'heartOfDepth',
  thunderingFury = 'thunderingFury',
  thundersoother = 'thundersoother',
  viridescentVenerer = 'viridescentVenerer',
  blizzardStrayer = 'blizzardStrayer',
  archaicPetra = 'archaicPetra',
  bloodstainedChivalry = 'bloodstainedChivalry',
}

export type SetNamesWithPlaceholder = FormPlaceholder | SetNames;
export const setNamesWithPlaceholder: SetNamesWithPlaceholder[] = [formPlaceholder, ...Object.values(SetNames)];

export interface SetWithEffect {
  name: SetNames;
  stat: SetStats;
  value: number;
}
