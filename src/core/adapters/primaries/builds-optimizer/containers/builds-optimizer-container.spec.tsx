import { CharactersHandler } from '../../../../usescases/characters-handler';
import { WeaponsHandler } from '../../../../usescases/weapons-handler';
import { InMemoryCharactersRepository } from '../../../secondaries/in-memory-characters-repository';
import { InMemoryWeaponsRepository } from '../../../secondaries/in-memory-weapons-repository';
import BuildsOptimizerContainer from './builds-optimizer-container';
import FormSelect from '../../shared/form-select';
import { mount, ReactWrapper } from 'enzyme';
import { ExistingCharacters } from '../../../../domain/models/character';
import SetsForm from '../components/sets-form';
import ArtifactsForm from '../components/artifacts-form';
import { Button, Chip } from '@material-ui/core';
import BuildFiltersForm from '../components/build-filters-form';
import BuildsResultsGrid from '../components/builds-results-grid';
import { waitFor } from '@testing-library/react';
import { AgGridReact } from 'ag-grid-react';
import { ArtifactsDI } from '../../../../di/artifacts-di';
import { appStore } from '../../../redux/store';
import { Provider } from 'react-redux';

describe('Builds Optimizer container', () => {
  let wrapper: ReactWrapper;
  let charactersNames: ExistingCharacters[];
  let weaponsNames: string[];
  let weaponsHandler: WeaponsHandler;

  beforeEach(() => {
    ArtifactsDI.registerRepository();
    wrapper = mount(
      <Provider store={appStore}>
        <BuildsOptimizerContainer />
      </Provider>,
    );

    const charactersHandler = new CharactersHandler(new InMemoryCharactersRepository());
    weaponsHandler = new WeaponsHandler(new InMemoryWeaponsRepository());
    charactersNames = charactersHandler.getCharactersNames();
    const currentCharacter = charactersHandler.getCharacterView(charactersNames[0]);
    weaponsNames = weaponsHandler.getWeaponsNamesByTypes(currentCharacter.weaponType);
  });

  it('should renders characters and weapons initialized', () => {
    const charactersFormSelect = wrapper.find(FormSelect).at(0);
    const weaponsFormSelect = wrapper.find(FormSelect).at(2);

    expect(charactersFormSelect.prop('options')).toEqual(charactersNames);
    expect(weaponsFormSelect.prop('options')).toEqual(weaponsNames);
  });

  it('should update weapons list if selected character can equip a different weapon than the previous one', async () => {
    wrapper
      .find(FormSelect)
      .find('#character')
      .first()
      .find('input')
      .simulate('change', { target: { name: '', value: 'diluc' } });

    await waitFor(() => {
      const weaponsFormSelect = wrapper.find(FormSelect).at(2);
      const claymores = weaponsHandler.getWeaponsNamesByTypes('claymore');

      expect(weaponsFormSelect.prop('options')).toEqual(claymores);
    });
  });

  it('should remove the second set select if set pieces equals 4', () => {
    wrapper.find(SetsForm).props().onSetPiecesChange(4);
    wrapper.update();

    expect(wrapper.find({ id: 'set2' }).length).toEqual(0);
  });

  it('should allow a maximum of 5 focus stats', () => {
    let chips: ReactWrapper;
    const expectedFocusStats = ['Flat Hp', 'Percent Atk', 'Crit Rate', 'Crit Dmg', 'Energy Recharge'];
    const maxFocusStats = 5;
    wrapper.find(ArtifactsForm).props().onFocusStatsChange(['flatHp', 'percentAtk', 'critRate', 'critDmg', 'energyRecharge']);
    wrapper.update();

    chips = wrapper.find(Chip);
    expect(chips.length).toEqual(maxFocusStats);
    chips.forEach((chip, index) => {
      expect(chip.childAt(0).childAt(0).text()).toEqual(expectedFocusStats[index]);
    });

    wrapper
      .find(ArtifactsForm)
      .props()
      .onFocusStatsChange(['flatHp', 'percentAtk', 'critRate', 'critDmg', 'energyRecharge', 'healingBonus']);
    wrapper.update();

    chips = wrapper.find(Chip);
    expect(chips.length).toEqual(maxFocusStats);
    chips.forEach((chip, index) => {
      expect(chip.childAt(0).childAt(0).text()).toEqual(expectedFocusStats[index]);
    });
  });

  it('should reset previously set Bonus Dmg when changing stat', async () => {
    wrapper
      .find('#pyroDmg')
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
      expect(wrapper.find(BuildFiltersForm).props().buildFilters['pyroDmg']).toBeUndefined();
    });
  });

  it('should update the list of builds when running optimization', async () => {
    wrapper.find(Button).last().simulate('click');
    await waitFor(() => {
      expect(wrapper.find(BuildsResultsGrid).prop('builds').length).toEqual(144);
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
