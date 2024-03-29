import { CharacterStatsValues } from './character-statistics';
import { Levels } from './levels';
import { WeaponType } from './weapon';

export type ExistingCharacters =
  | 'albedo'
  | 'amber'
  | 'barbara'
  | 'beidou'
  | 'bennett'
  | 'chongyun'
  | 'diluc'
  | 'diona'
  | 'eula'
  | 'fischl'
  | 'ganyu'
  | 'huTao'
  | 'jean'
  | 'kaedeharaKazuha'
  | 'kamisatoAyaka'
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
  | 'sayu'
  | 'sucrose'
  | 'tartaglia'
  | 'traveler'
  | 'venti'
  | 'xiangling'
  | 'xiao'
  | 'xingqiu'
  | 'xinyan'
  | 'yanfei'
  | 'yoimiya'
  | 'zhongli';

export type Character = {
  name: ExistingCharacters;
  level: Levels;
  weaponType: WeaponType;
  stats: CharacterStatsValues;
  bonusStat?: { [bonusStat: string]: number };
};

export type CharacterView = {
  name: ExistingCharacters;
  weaponType: WeaponType;
  level: Levels;
};
