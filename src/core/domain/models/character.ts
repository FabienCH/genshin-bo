import { CharacterStatsValues } from './character-statistics';
import { Levels } from './levels';
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
  | 'huTao'
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
  | 'rosaria'
  | 'sucrose'
  | 'tartaglia'
  | 'traveler'
  | 'venti'
  | 'xiangling'
  | 'xiao'
  | 'xingqiu'
  | 'xinyan'
  | 'zhongli';

export type Character = {
  name: ExistingCharacters;
  level: Levels;
  weapon: Weapon;
  stats: CharacterStatsValues;
  bonusStat?: { [bonusStat: string]: number };
};
