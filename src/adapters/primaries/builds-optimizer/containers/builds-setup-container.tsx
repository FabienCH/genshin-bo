import { Fragment, ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CharacterForm from '../components/character-form';
import SetsForm from '../components/sets-form';
import ArtifactsForm from '../components/artifacts-form';
import { BuildsOptimizerDI } from '../../../../di/builds-optimizer-di';
import { ExistingCharacters, CharacterView } from '../../../../domain/builds-optimizer/models/character';
import { WeaponView } from '../../../../domain/builds-optimizer/models/weapon';
import { Levels } from '../../../../domain/builds-optimizer/models/levels';
import React from 'react';
import { ArtifactsFiltersView } from '../../../../usescases/artifacts/artifacts-filter';
import { SetNames } from '../../../../domain/artifacts/models/sets-with-effects';
import { ArtifactStatsTypes, ArtifactsMainStats } from '../../../../domain/artifacts/models/main-statistics';
import { SelectOption } from '../../../../usescases/builds-optimizer/builds-forms-handler';

const styles = createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  character: {
    flex: '45%',
    marginRight: 30,
  },
  sets: {
    flex: '55%',
  },
});

interface BuildsSetupContainerProps extends WithStyles<typeof styles> {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: CharacterView;
  currentWeapon: WeaponView;
  artifactsFilters: ArtifactsFiltersView;
  artifactLevelUp?: 16 | 20;
  onCharacterChange: (character: CharacterView) => void;
  onWeaponChange: (weapon: WeaponView) => void;
  onArtifactsFiltersChange: (artifactsFilters: ArtifactsFiltersView) => void;
  onArtifactLevelUpChange: (artifactLevelUp?: 16 | 20) => void;
}

function BuildsSetupContainer(props: BuildsSetupContainerProps): ReactElement {
  const { charactersNames, weaponsNames, currentCharacter, currentWeapon, artifactsFilters, artifactLevelUp, classes } = props;

  const getWeaponLevelsOptions = (name: string): SelectOption[] => BuildsOptimizerDI.buildsFormsHandler.getWeaponLevelsOptions(name);

  const getUpdatedCurrentSets = (deleteCondition: boolean, index: number): { [index: number]: SetNames } => {
    const currentSets = artifactsFilters.currentSets;
    if (deleteCondition) {
      delete currentSets[index];
    }
    return currentSets;
  };

  const emitArtifactsFilterChange = (changes: Partial<ArtifactsFiltersView>): void => {
    props.onArtifactsFiltersChange({
      ...artifactsFilters,
      ...changes,
    });
  };

  const [weaponsLevels, setWeaponsLevels] = React.useState(getWeaponLevelsOptions(currentWeapon.name));

  const handleCharacterNameChange = (name: ExistingCharacters): void => {
    props.onCharacterChange({ ...currentCharacter, name });
  };

  const handleCharacterLevelChange = (level: Levels): void => {
    props.onCharacterChange({ ...currentCharacter, level });
  };

  const handleWeaponNameChange = (name: string): void => {
    props.onWeaponChange({ ...currentWeapon, name });
    setWeaponsLevels(getWeaponLevelsOptions(name));
  };

  const handleWeaponLevelChange = (level: Levels): void => {
    props.onWeaponChange({ ...currentWeapon, level });
  };

  const handleSetNameChange = (event: { value: SetNames; setIndex: number }): void => {
    const currentSets = getUpdatedCurrentSets(event.value == null, event.setIndex);
    const newCurrentSets = event.value == null ? currentSets : { ...currentSets, [event.setIndex]: event.value };
    emitArtifactsFilterChange({ currentSets: newCurrentSets });
  };

  const handleSetPiecesChange = (setPieces: 2 | 4): void => {
    const currentSets = getUpdatedCurrentSets(setPieces === 4, 1);

    emitArtifactsFilterChange({ setPieces, currentSets });
  };

  const handleFocusStatsChange = (focusStats: ArtifactStatsTypes[]): void => {
    if (focusStats.length <= 5) {
      emitArtifactsFilterChange({ focusStats });
    }
  };

  const handleMinLevelChange = (level: number): void => {
    emitArtifactsFilterChange({ minArtifactLevel: level });
  };

  const handleMainsStatsChange = (mainsStats: ArtifactsMainStats): void => {
    emitArtifactsFilterChange({ mainsStats });
  };

  const handleHasFourSubsChange = (hasFourSubs: boolean): void => {
    emitArtifactsFilterChange({ hasFourSubs });
  };

  const handleArtifactLevelUpChange = (artifactLevelUp?: 16 | 20): void => {
    props.onArtifactLevelUpChange(artifactLevelUp);
  };

  return (
    <Fragment>
      <Container className={classes.container}>
        <Box className={classes.character}>
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
        </Box>
        <Box className={classes.sets}>
          <SetsForm
            currentSets={artifactsFilters.currentSets}
            setPieces={artifactsFilters.setPieces}
            onSetNameChange={handleSetNameChange}
            onSetPiecesChange={handleSetPiecesChange}
          ></SetsForm>
        </Box>
      </Container>
      <ArtifactsForm
        mainsStats={artifactsFilters.mainsStats}
        focusStats={artifactsFilters.focusStats}
        minLevel={artifactsFilters.minArtifactLevel}
        hasFourSubs={artifactsFilters.hasFourSubs}
        artifactLevelUp={artifactLevelUp}
        onMainsStatsChange={handleMainsStatsChange}
        onFocusStatsChange={handleFocusStatsChange}
        onMinLevelChange={handleMinLevelChange}
        onHasFourSubsChange={handleHasFourSubsChange}
        onArtifactLevelUpChange={handleArtifactLevelUpChange}
      ></ArtifactsForm>
    </Fragment>
  );
}

export default withStyles(styles)(BuildsSetupContainer);
