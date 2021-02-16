import { CharacterStatsPerLevel } from '../../../domain/models/character-statistics';
import { ExistingCharacters } from '../../../domain/models/character';
import { Levels } from '../../../domain/models/levels';

export interface CharacterStats {
  name: ExistingCharacters;
  levels: {
    [key in Levels]: { stats: CharacterStatsPerLevel; bonusStat?: { [bonusStat: string]: number } };
  };
}
