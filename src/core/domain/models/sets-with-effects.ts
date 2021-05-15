import { SetStats } from './set-statistics';

export enum SetNames {
  gladiatorsFinale = 'gladiatorsFinale',
  noblesseOblige = 'noblesseOblige',
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
  tenacityOfTheMillelith = 'tenacityOfTheMillelith',
}

export interface SetWithEffect {
  name: SetNames;
  stat: SetStats;
  value: number;
}
