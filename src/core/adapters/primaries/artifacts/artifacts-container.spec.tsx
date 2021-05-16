import ArtifactsContainer from './artifacts-container';
import ArtifactsImport from './components/artifacts-import';
import { AgGridReact } from 'ag-grid-react';
import { mount, ReactWrapper } from 'enzyme';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { appStore } from '../../redux/store';
import { Provider } from 'react-redux';
import { queryByTestId, waitFor } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { artifactsJsonString } from '../../../../test/artifacts-from-json';
import { mockBlobText } from '../../../../test/blob-text-mock';
import { mockHTMLVideoElement } from '../../../../test/htmlVideoElementMock';

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
    window.URL.createObjectURL = () => '';
    mockHTMLVideoElement(570, 1000);
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
    const file = new File([], 'filename.mp4', { type: 'video/mp4' });
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });

    await waitFor(() => {
      wrapper.find(ArtifactsImport).find(Button).last().simulate('click');

      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, 1, false);
    });
  });

  it('should import artifacts and override currents ones', async () => {
    const file = new File([], 'filename.mp4', { type: 'video/mp4' });
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });
    wrapper
      .find(Checkbox)
      .find('input')
      .simulate('change', { target: { name: '', checked: true } });

    await waitFor(() => {
      wrapper.find(ArtifactsImport).find(Button).last().simulate('click');

      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, 1, true);
    });
  });

  it('should not display artifacts import from json modal when user import a non json file', async () => {
    const file = new File([''], 'filename', { type: 'text/plain' });
    mockBlobText(file);

    wrapper.find('#upload-json').simulate('change', { target: { name: '', files: [file] } });

    await waitFor(() => {
      const dialogBox = queryByTestId(document.body, 'json-import-modal');
      expect(dialogBox).toBeFalsy();
    });
  });

  it('should display artifacts import from json modal when user import a json file', async () => {
    const file = new File([artifactsJsonString], 'filename.json', { type: 'application/json' });
    mockBlobText(file);

    wrapper.find('#upload-json').simulate('change', { target: { name: '', files: [file] } });

    await waitFor(() => {
      const dialogBox = queryByTestId(document.body, 'json-import-modal');
      expect(dialogBox?.innerHTML.includes('You are about to import 14 artifacts')).toBeTruthy();
    });
  });
});
