import { CharactersHandler } from '../../../usescases/characters-handler';
import { WeaponsHandler } from '../../../usescases/weapons-handler';
import { InMemoryCharactersRepository } from '../../secondaries/in-memory-characters-repository';
import { InMemoryWeaponsRepository } from '../../secondaries/in-memory-weapons-repository';
import BuildOptimizerContainer from './build-optimizer-container';
import FormSelect from '../shared/form-select';
import { mount, ReactWrapper } from 'enzyme';
import { ExistingCharacters } from '../../../domain/models/character';
import SetsForm from './sets-form';
import ArtifactsForm from './artifacts-form';
import { Button, Chip } from '@material-ui/core';
import BuildFiltersForm from './build-filters-form';
import BuildsResults from './builds-results';
import { waitFor } from '@testing-library/react';
import { AgGridReact } from 'ag-grid-react';

describe('Build Optimizer container', () => {
  let wrapper: ReactWrapper;
  let charactersNames: ExistingCharacters[];
  let weaponsNames: string[];

  beforeEach(() => {
    wrapper = mount(<BuildOptimizerContainer />);

    const charactersHandler = new CharactersHandler(new InMemoryCharactersRepository());
    const weaponsHandler = new WeaponsHandler(new InMemoryWeaponsRepository());
    charactersNames = charactersHandler.getCharactersNames();
    weaponsNames = weaponsHandler.getWeaponsNames();
  });

  it('should renders characters and weapons initialized', () => {
    const charactersFormSelect = wrapper.find(FormSelect).at(0);
    const weaponsFormSelect = wrapper.find(FormSelect).at(2);

    expect(charactersFormSelect.prop('data')).toEqual(charactersNames);
    expect(weaponsFormSelect.prop('data')).toEqual(weaponsNames);
  });

  it('should remove the second set select if set pieces equals 4', () => {
    wrapper.find(SetsForm).props().onSetPiecesChange(4);
    wrapper.update();

    expect(wrapper.find({ id: 'set2' }).length).toEqual(0);
  });

  it('should allow a maximum of 6 focus stats', () => {
    let chips: ReactWrapper;
    const expectedFocusStats = ['Flat Hp', 'Percent Atk', 'Crit Rate', 'Crit Dmg', 'Energy Recharge', 'Healing Bonus'];
    wrapper
      .find(ArtifactsForm)
      .props()
      .onFocusStatsChange(['flatHp', 'percentAtk', 'critRate', 'critDmg', 'energyRecharge', 'healingBonus']);
    wrapper.update();

    chips = wrapper.find(Chip);
    expect(chips.length).toEqual(expectedFocusStats.length);
    chips.forEach((chip, index) => {
      expect(chip.childAt(0).childAt(0).text()).toEqual(expectedFocusStats[index]);
    });

    wrapper
      .find(ArtifactsForm)
      .props()
      .onFocusStatsChange(['flatHp', 'percentAtk', 'critRate', 'critDmg', 'energyRecharge', 'healingBonus', 'percentDef']);
    wrapper.update();

    chips = wrapper.find(Chip);
    expect(chips.length).toEqual(expectedFocusStats.length);
    chips.forEach((chip, index) => {
      expect(chip.childAt(0).childAt(0).text()).toEqual(expectedFocusStats[index]);
    });
  });

  it('should reset previously set Bonus Dmg when changing stat', async () => {
    wrapper
      .find('#bonus-dmg-text-field')
      .last()
      .simulate('change', { target: { name: '', value: 10 } });

    await waitFor(() => {
      expect(wrapper.find(BuildFiltersForm).props().buildFilters['pyroDmg']).toEqual(10);
    });

    wrapper
      .find('#bonusdmg')
      .first()
      .find('input')
      .simulate('change', { target: { name: '', value: 'cryoDmg' } });

    await waitFor(() => {
      expect(wrapper.find(BuildFiltersForm).props().buildFilters['pyroDmg']).toEqual(0);
    });
  });

  it('should update the list of builds when running optimization', async () => {
    wrapper.find(Button).last().simulate('click');
    await waitFor(() => {
      expect(wrapper.find(BuildsResults).prop('builds').length).toEqual(144);
    });
  });

  it('adding a build filter should add the corresponding column in builds list', async () => {
    wrapper.find(Button).last().simulate('click');

    wrapper
      .find('#elementalMastery')
      .first()
      .find('input')
      .simulate('change', { target: { name: '', value: '20' } });

    await waitFor(() => {
      const elementalMasteryHeaderCell = wrapper
        .find(AgGridReact)
        .html()
        .includes('<span ref="eText" class="ag-header-cell-text" unselectable="on">Elemental Mastery</span>');

      expect(elementalMasteryHeaderCell).toBeTruthy();
    });
  });
});
