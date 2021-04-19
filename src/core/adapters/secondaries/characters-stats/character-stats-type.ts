import { CharacterStatsPerLevel } from '../../../domain/models/character-statistics';
import { ExistingCharacters } from '../../../domain/models/character';
import { Levels } from '../../../domain/models/levels';
import { WeaponType } from '../../../domain/models/weapon';

export interface CharacterWithStats {
  name: ExistingCharacters;
  weaponType: WeaponType;
  levels: {
    [key in Levels]: { stats: CharacterStatsPerLevel; bonusStat?: { [bonusStat: string]: number } };
  };
}
