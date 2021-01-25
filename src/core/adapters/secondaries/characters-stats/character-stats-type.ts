import { CharacterStatsPerLevel } from '../../../domain/models/character-statistics';
import { ExistingCharacters } from '../../../domain/models/character';
import { PossibleLevels } from '../../../domain/models/possible-levels';

export interface CharacterStats {
  name: ExistingCharacters;
  levels: {
    [key in PossibleLevels]: { stats: CharacterStatsPerLevel; bonusStat?: { [bonusStat: string]: number } };
  };
}
