import { CharacterStatsPerLevel } from '../../../../domain/builds-optimizer/models/character-statistics';
import { ExistingCharacters } from '../../../../domain/builds-optimizer/models/character';
import { Levels } from '../../../../domain/builds-optimizer/models/levels';
import { WeaponType } from '../../../../domain/builds-optimizer/models/weapon';

export interface CharacterWithStats {
  name: ExistingCharacters;
  weaponType: WeaponType;
  levels: {
    [key in Levels]: { stats: CharacterStatsPerLevel; bonusStat?: { [bonusStat: string]: number } };
  };
}
