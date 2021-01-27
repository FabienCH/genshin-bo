import { CharacterStatsValues } from './character-statistics';
import { PossibleLevels } from './possible-levels';
import { Weapon } from './weapon';

export type ExistingCharacters =
  | 'albedo'
  | 'amber'
  | 'barbara'
  | 'beidou'
  | 'bennett'
  | 'chongyun'
  | 'diluc'
  | 'diona'
  | 'fischl'
  | 'ganyu'
  | 'jean'
  | 'kaeya'
  | 'keqing'
  | 'klee'
  | 'lisa'
  | 'mona'
  | 'ningguang'
  | 'noelle'
  | 'qiqi'
  | 'razor'
  | 'sucrose'
  | 'tartaglia'
  | 'traveler'
  | 'venti'
  | 'xiangling'
  | 'xingqiu'
  | 'xinyan'
  | 'zhongli';

export type Character = {
  name: ExistingCharacters;
  level: PossibleLevels;
  weapon: Weapon;
  stats: CharacterStatsValues;
  bonusStat?: { [bonusStat: string]: number };
};