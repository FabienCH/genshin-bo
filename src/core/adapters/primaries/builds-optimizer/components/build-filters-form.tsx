import { ChangeEvent, Fragment, ReactElement } from 'react';
import { Box, Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CharacterStats, CharacterStatsValues, CharacterStatTypes } from '../../../../domain/models/character-statistics';
import FormSelect from '../../shared/form-select';
import WarningMessage from '../../shared/warning-message';
import BuildFiltersTextFieldProps from './build-filters-text-field';
import RunButtons from '../../shared/run-buttons';

const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  div: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  textField: {
    marginRight: 30,
    display: 'flex',
    flex: '170px 0 1',
  },
  buttonsContainer: {
    flex: '250px 1 1',
  },
  buildsComputationProgress: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 5,
    marginBottom: 10,
    fontSize: '1rem',
  },
});

const statsByLines = [
  [CharacterStats.hp, CharacterStats.atk, CharacterStats.def, CharacterStats.critRate, CharacterStats.critDmg],
  [CharacterStats.elementalMastery, CharacterStats.energyRecharge, CharacterStats.healingBonus, CharacterStats.powerfulShield],
];

const listedStats = [
  {
    label: 'Bonus Dmg',
    stats: [
      CharacterStats.pyroDmg,
      CharacterStats.hydroDmg,
      CharacterStats.dendroDmg,
      CharacterStats.electroDmg,
      CharacterStats.anemoDmg,
      CharacterStats.cryoDmg,
      CharacterStats.geoDmg,
      CharacterStats.physicalDmg,
    ],
  },
  {
    label: 'Elemental Res',
    stats: [
      CharacterStats.pyroRes,
      CharacterStats.hydroRes,
      CharacterStats.dendroRes,
      CharacterStats.electroRes,
      CharacterStats.anemoRes,
      CharacterStats.cryoRes,
      CharacterStats.geoRes,
    ],
  },
];

const selectedListedStats: { stat: CharacterStatTypes; value: number | undefined }[] = [
  { stat: listedStats[0].stats[0], value: undefined },
  { stat: listedStats[1].stats[0], value: undefined },
];

interface BuildFiltersFormProps extends WithStyles<typeof styles> {
  buildFilters: Partial<CharacterStatsValues>;
  canRunOptimization: boolean;
  buildsCombinationsLimitReached: boolean;
  isOptimizationRunning: boolean;
  buildsComputationProgress: string;
  onBuildFiltersChange: (event: { stat: CharacterStatTypes; value: number | undefined }) => void;
  onRunClick: () => void;
  onCancelClick: () => void;
}

function BuildFiltersForm(props: BuildFiltersFormProps): ReactElement {
  const {
    buildFilters,
    canRunOptimization,
    buildsCombinationsLimitReached,
    isOptimizationRunning,
    buildsComputationProgress,
    classes,
  } = props;

  const parseValue = (value: unknown): number | undefined => {
    const intValue = parseInt(`${value}`);
    return isNaN(intValue) ? undefined : intValue;
  };

  const handleBuildFiltersChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>, stat: CharacterStatTypes): void => {
    props.onBuildFiltersChange({ stat, value: parseValue(event.target.value) });
  };

  const handleListedStatsChange = (stat: CharacterStatTypes, index: number): void => {
    props.onBuildFiltersChange({ stat: selectedListedStats[index].stat, value: undefined });
    selectedListedStats[index].stat = CharacterStats[stat];
    props.onBuildFiltersChange({ stat, value: selectedListedStats[index].value });
  };

  const handleListedStatsValueChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>, index: number): void => {
    const value = parseValue(event.target.value);
    selectedListedStats[index].value = value;
    props.onBuildFiltersChange({ stat: selectedListedStats[index].stat, value });
  };

  const handleRunClick = (): void => {
    props.onRunClick();
  };

  const handleCancelClick = (): void => {
    props.onCancelClick();
  };

  const displayWarning = buildsCombinationsLimitReached && !isOptimizationRunning;

  return (
    <Container className={classes.container} maxWidth={false}>
      {statsByLines.map((statsByLine: CharacterStatTypes[], lineIndex: number) => (
        <div key={lineIndex} className={classes.div}>
          {statsByLine.map((characterStat: CharacterStatTypes) => (
            <BuildFiltersTextFieldProps
              data={{ stat: characterStat, value: buildFilters[characterStat] }}
              key={characterStat}
              onChange={(e) => handleBuildFiltersChange(e, characterStat)}
            ></BuildFiltersTextFieldProps>
          ))}
        </div>
      ))}
      <div className={classes.div}>
        {listedStats.map((listedStat: { label: string; stats: CharacterStats[] }, index: number) => {
          const key = index === 0 ? 'bonus-dmg' : 'elemental-res';
          return (
            <Fragment key={key}>
              <Box className={classes.textField}>
                <FormSelect
                  label={listedStat.label}
                  selectedValue={selectedListedStats[index].stat}
                  options={listedStat.stats}
                  onChange={(e) => handleListedStatsChange(e, index)}
                ></FormSelect>
              </Box>
              <BuildFiltersTextFieldProps
                data={selectedListedStats[index]}
                onChange={(e) => handleListedStatsValueChange(e, index)}
              ></BuildFiltersTextFieldProps>
            </Fragment>
          );
        })}
        <div className={classes.buttonsContainer}>
          <span className={classes.buildsComputationProgress}>{buildsComputationProgress}</span>
          <RunButtons
            runButtonLabel="Run"
            canRun={canRunOptimization}
            isRunning={isOptimizationRunning}
            runClicked={handleRunClick}
            cancelClicked={handleCancelClick}
          ></RunButtons>
        </div>
      </div>
      <div className={classes.div} style={{ justifyContent: displayWarning ? 'space-between' : ' flex-end' }}>
        {displayWarning ? (
          <WarningMessage message="Total builds combinations can not be higher than 10 billions, please use more restrictive artifacts filters."></WarningMessage>
        ) : null}
      </div>
    </Container>
  );
}

export default withStyles(styles)(BuildFiltersForm);
