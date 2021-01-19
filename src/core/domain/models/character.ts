import { CharacterStatsValues } from './character-statistics';

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

export type PossibleLevels = '1' | '20' | '20a' | '40' | '40a' | '50' | '50a' | '60' | '60a' | '70' | '70a' | '80' | '80a' | '90';

export type Character = {
  name: ExistingCharacters;
  level: PossibleLevels;
  stats: CharacterStatsValues;
  bonusStat: { [bonusStat: string]: number };
};
