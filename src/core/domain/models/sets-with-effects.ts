import { PossibleSetStats } from './set-statistics';

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

export interface SetWithEffect {
  name: SetNames;
  stat: PossibleSetStats;
  value: number;
}
