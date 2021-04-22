import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import CharacterForm from '../components/character-form';
import SetsForm from '../components/sets-form';
import ArtifactsForm from '../components/artifacts-form';
import { BuildsOptimizerDI } from '../../../../di/builds-optimizer-di';
import { ExistingCharacters, CharacterView } from '../../../../domain/models/character';
import { ArtifactsMainStats, ArtifactStatsTypes } from '../../../../domain/models/main-statistics';
import { SetNames } from '../../../../domain/models/sets-with-effects';
import { WeaponView } from '../../../../domain/models/weapon';
import { Levels } from '../../../../domain/models/levels';
import React from 'react';
import { ArtifactsFilters } from '../../../../usescases/artifacts-filter';

const styles = createStyles({
  buildSetup: {
    display: 'flex',
  },
});

interface BuildsSetupContainerProps extends WithStyles<typeof styles> {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: CharacterView;
  currentWeapon: WeaponView;
  artifactsFilters: ArtifactsFilters;
  onCharacterChange: (character: CharacterView) => void;
  onWeaponChange: (weapon: WeaponView) => void;
  onArtifactsFiltersChange: (artifactsFilters: ArtifactsFilters) => void;
}

function BuildsSetupContainer(props: BuildsSetupContainerProps): ReactElement {
  const { charactersNames, weaponsNames, currentCharacter, currentWeapon, artifactsFilters, classes } = props;
  const [weaponsLevels, setWeaponsLevels] = React.useState(BuildsOptimizerDI.buildsFormsHandler.getWeaponLevelsOptions(currentWeapon.name));

  const handleCharacterNameChange = (name: ExistingCharacters): void => {
    props.onCharacterChange({ ...currentCharacter, name });
  };

  const handleCharacterLevelChange = (level: Levels): void => {
    props.onCharacterChange({ ...currentCharacter, level });
  };

  const handleWeaponNameChange = (name: string): void => {
    props.onWeaponChange({ ...currentWeapon, name });
    setWeaponsLevels(BuildsOptimizerDI.buildsFormsHandler.getWeaponLevelsOptions(name));
  };

  const handleWeaponLevelChange = (level: Levels): void => {
    props.onWeaponChange({ ...currentWeapon, level });
  };

  const handleSetNameChange = (event: { value: SetNames; setIndex: number }): void => {
    const currentSets = artifactsFilters.currentSets;
    if (event.value == null) {
      delete currentSets[event.setIndex];
    }
    const newCurrentSets = event.value == null ? currentSets : { ...currentSets, [event.setIndex]: event.value };
    props.onArtifactsFiltersChange({
      ...artifactsFilters,
      currentSets: newCurrentSets,
    });
  };

  const handleSetPiecesChange = (setPieces: 2 | 4): void => {
    props.onArtifactsFiltersChange({
      ...artifactsFilters,
      setPieces,
    });
  };

  const handleFocusStatsChange = (focusStats: ArtifactStatsTypes[]): void => {
    props.onArtifactsFiltersChange({
      ...artifactsFilters,
      focusStats,
    });
  };

  const handleMinLevelChange = (level: number): void => {
    props.onArtifactsFiltersChange({
      ...artifactsFilters,
      minArtifactLevel: level,
    });
  };

  const handleMainsStatsChange = (mainsStats: ArtifactsMainStats): void => {
    props.onArtifactsFiltersChange({
      ...artifactsFilters,
      mainsStats,
    });
  };

  return (
    <div className={classes.buildSetup}>
      <CharacterForm
        charactersNames={charactersNames}
        currentCharacter={currentCharacter}
        weaponsNames={weaponsNames}
        weaponsLevels={weaponsLevels}
        currentWeapon={currentWeapon}
        onCharacterNameChange={handleCharacterNameChange}
        onCharacterLevelChange={handleCharacterLevelChange}
        onWeaponNameChange={handleWeaponNameChange}
        onWeaponLevelChange={handleWeaponLevelChange}
      ></CharacterForm>
      <SetsForm
        currentSets={artifactsFilters.currentSets}
        setPieces={artifactsFilters.setPieces}
        onSetNameChange={handleSetNameChange}
        onSetPiecesChange={handleSetPiecesChange}
      ></SetsForm>
      <ArtifactsForm
        mainsStats={artifactsFilters.mainsStats}
        focusStats={artifactsFilters.focusStats}
        minLevel={artifactsFilters.minArtifactLevel}
        onMainsStatsChange={handleMainsStatsChange}
        onFocusStatsChange={handleFocusStatsChange}
        onMinLevelChange={handleMinLevelChange}
      ></ArtifactsForm>
    </div>
  );
}

export default withStyles(styles)(BuildsSetupContainer);
