import ArtifactsContainer from './artifacts-container';
import { AgGridReact } from 'ag-grid-react';
import { mount, ReactWrapper } from 'enzyme';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { appStore } from '../../redux/store';
import { Provider } from 'react-redux';
import { waitFor } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const ensureGridApiHasBeenSet = (wrapper: AgGridReact) => {
  return new Promise((resolve) => {
    const waitForGridReady = () => {
      if (wrapper.props) {
        resolve(wrapper);
        return;
      }
      setTimeout(waitForGridReady, 10);
    };
    waitForGridReady();
  });
};

describe('Artifacts container', () => {
  let wrapper: ReactWrapper;
  let agGridReact: AgGridReact;
  let artifactsImporterSpy: jest.SpyInstance;

  beforeEach(() => {
    ArtifactsDI.registerRepository();
    ArtifactsDI.registerOcrWorker();
    artifactsImporterSpy = jest.spyOn(ArtifactsDI.getArtifactsImporter(), 'importFromVideo').mockImplementation(async () => undefined);
    wrapper = mount(
      <Provider store={appStore}>
        <ArtifactsContainer />
      </Provider>,
    );
    agGridReact = wrapper.find(AgGridReact).instance();
  });

  it('renders with a grid of artifacts', (done) => {
    const artifacts = ArtifactsDI.artifactsHandler.getAll();
    ensureGridApiHasBeenSet(agGridReact).then(() => done());

    expect(agGridReact.props.rowData).toEqual(artifacts);
  });

  it('should import artifacts and not override currents ones', async () => {
    const file = new File([], 'filename');
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });
    wrapper.find(Button).last().simulate('click');

    await waitFor(() => {
      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, false);
    });
  });

  it('should import artifacts and override currents ones', async () => {
    const file = new File([], 'filename');
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });
    wrapper
      .find(Checkbox)
      .find('input')
      .simulate('change', { target: { name: '', checked: true } });
    wrapper.find(Button).last().simulate('click');

    await waitFor(() => {
      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, true);
    });
  });
});
