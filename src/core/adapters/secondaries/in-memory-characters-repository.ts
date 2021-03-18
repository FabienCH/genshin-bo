import { CharactersRepository } from '../../domain/characters-repository';
import { CharacterBuilder } from '../../domain/models/character-builder';
import { ExistingCharacters, Character } from '../../domain/models/character';
import { amber } from './characters-stats/amber';
import { CharacterWithStats } from './characters-stats/character-stats-type';
import { razor } from './characters-stats/razor';
import { albedo } from './characters-stats/albedo';
import { barbara } from './characters-stats/barbara';
import { beidou } from './characters-stats/beidou';
import { bennett } from './characters-stats/bennett';
import { chongyun } from './characters-stats/chongyun';
import { diluc } from './characters-stats/diluc';
import { diona } from './characters-stats/diona';
import { fischl } from './characters-stats/fischl';
import { ganyu } from './characters-stats/ganyu';
import { jean } from './characters-stats/jean';
import { kaeya } from './characters-stats/kaeya';
import { keqing } from './characters-stats/keqing';
import { klee } from './characters-stats/klee';
import { lisa } from './characters-stats/lisa';
import { mona } from './characters-stats/mona';
import { ningguang } from './characters-stats/ningguang';
import { noelle } from './characters-stats/noelle';
import { qiqi } from './characters-stats/qiqi';
import { sucrose } from './characters-stats/sucrose';
import { tartaglia } from './characters-stats/tartaglia';
import { traveler } from './characters-stats/traveler';
import { venti } from './characters-stats/venti';
import { xiangling } from './characters-stats/xiangling';
import { xingqiu } from './characters-stats/xingqiu';
import { xinyan } from './characters-stats/xinyan';
import { zhongli } from './characters-stats/zhongli';
import { Levels } from '../../domain/models/levels';
import { InMemoryWeaponsRepository } from './in-memory-weapons-repository';
import { CharacterStats, CharacterStatsPerLevel } from '../../domain/models/character-statistics';
import { xiao } from './characters-stats/xiao';
import { huTao } from './characters-stats/hu-tao';

export class InMemoryCharactersRepository implements CharactersRepository {
  private readonly weaponsRepository: InMemoryWeaponsRepository;
  private readonly charactersStats: CharacterWithStats[];
  private readonly defaultStats: CharacterStatsPerLevel = { [CharacterStats.hp]: 0, [CharacterStats.atk]: 0, [CharacterStats.def]: 0 };

  constructor() {
    this.weaponsRepository = new InMemoryWeaponsRepository();
    this.charactersStats = [
      albedo,
      amber,
      barbara,
      beidou,
      bennett,
      chongyun,
      diluc,
      diona,
      fischl,
      ganyu,
      huTao,
      jean,
      kaeya,
      keqing,
      klee,
      lisa,
      mona,
      ningguang,
      noelle,
      qiqi,
      razor,
      sucrose,
      tartaglia,
      traveler,
      venti,
      xiangling,
      xiao,
      xingqiu,
      xinyan,
      zhongli,
    ];
  }

  public getAll(level: Levels): Character[] {
    return this.charactersStats.map((characterStat) =>
      this.characterStatToCharacter(characterStat.name, level, characterStat.levels[level]),
    );
  }

  public getCharacter(name: ExistingCharacters, level: Levels, weaponProps: { name: string; level: Levels }): Character {
    const allCharacterStats = this.charactersStats.find((character) => character.name === name);
    const characterStats = allCharacterStats ? allCharacterStats.levels[level] : { stats: this.defaultStats };
    return this.characterStatToCharacter(name, level, characterStats, weaponProps);
  }

  private characterStatToCharacter(
    name: ExistingCharacters,
    level: Levels,
    characterStats: { stats: CharacterStatsPerLevel; bonusStat?: { [bonusStat: string]: number } },
    weaponProps?: { name: string; level: Levels },
  ) {
    const characterBuilder = weaponProps
      ? new CharacterBuilder().withWeapon(this.weaponsRepository.getWeapon(weaponProps.name, weaponProps.level))
      : new CharacterBuilder();

    return characterBuilder.withName(name).withLevel(level).withStats(characterStats.stats).withBonusStat(characterStats.bonusStat).build();
  }
}
