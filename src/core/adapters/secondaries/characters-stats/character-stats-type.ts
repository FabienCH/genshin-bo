import { CharacterStatsPerLevel } from '../../../domain/models/character-statistics';
import { ExistingCharacters, PossibleLevels } from '../../../domain/models/character';

export interface CharacterStats {
  name: ExistingCharacters;
  levels: {
    [key in PossibleLevels]: { stats: CharacterStatsPerLevel; bonusStat?: { [bonusStat: string]: number } };
  };
}
