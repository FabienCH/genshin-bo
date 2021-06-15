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
import { artifactsJsonString } from '../../../test/artifacts-from-json';
import { mockBlobText } from '../../../test/blob-text-mock';
import { mockHTMLVideoElement } from '../../../test/htmlVideoElementMock';
import { ArtifactsPresenter } from './artifacts-presenter';

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
    wrapper = mount(
      <Provider store={appStore}>
        <ArtifactsContainer></ArtifactsContainer>
      </Provider>,
    );
    artifactsImporterSpy = jest.spyOn(wrapper.find(ArtifactsContainer), 'artifactsPresenter').mockImplementation(async () => undefined);

    agGridReact = wrapper.find(AgGridReact).instance();
  });

  it('renders with a grid of artifacts', (done) => {
    const artifactsPresenter = new ArtifactsPresenter(
      ArtifactsDI.getArtifactsHandler(),
      ArtifactsDI.getArtifactsImporter(),
      ArtifactsDI.getArtifactsExporter(),
      ArtifactsDI.getVideoValidator(),
    );
    const { artifacts } = artifactsPresenter.getViewModel();
    ensureGridApiHasBeenSet(agGridReact).then(() => done());

    expect(agGridReact.props.rowData).toEqual(artifacts);
  });

  fit('should import artifacts and not override currents ones', async () => {
    //console.warn(' wrapper.find(ArtifactsContainer).getWrappingComponent() !!!!!!!!!!!!!!', wrapper.getWrappingComponent());
    //console.warn(' wrapper.find(ArtifactsContainer).getDOMNode() !!!!!!!!!!!!!!', wrapper.getDOMNode());
    console.warn(' wrapper.getElement() !!!!!!!!!!!!!!', wrapper.getElement());
    console.warn(' wrapper..getElement().props !!!!!!!!!!!!!!', wrapper.getElement().props);
    console.warn(' wrapper.instance() !!!!!!!!!!!!!!', wrapper.instance());
    //console.warn(' wrapper.find(ArtifactsContainer).getNode() !!!!!!!!!!!!!!', wrapper.getNode());
    console.warn(' wrapper.prop() !!!!!!!!!!!!!!', wrapper.prop('artifactsPresenter'));
    console.warn(' wrapper.props() !!!!!!!!!!!!!!', wrapper.props());
    //console.warn(' wrapper.find(ArtifactsContainer).state() !!!!!!!!!!!!!!', wrapper.find(ArtifactsContainer).state());
    console.warn(' wrapper.find(ArtifactsContainer).debug() !!!!!!!!!!!!!!', wrapper.find(ArtifactsContainer).debug());
    console.warn(' wrapper.debug() !!!!!!!!!!!!!!', wrapper.debug());

    const file = new File([], 'filename.mp4', { type: 'video/mp4' });
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });

    await waitFor(() => {
      wrapper.find(ArtifactsImport).find(Button).last().simulate('click');

      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, 1, false, false);
    });
  });

  it('should import artifacts and override currents ones', async () => {
    const file = new File([], 'filename.mp4', { type: 'video/mp4' });
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });
    wrapper
      .find(Checkbox)
      .first()
      .find('input')
      .simulate('change', { target: { name: '', checked: true } });

    await waitFor(() => {
      wrapper.find(ArtifactsImport).find(Button).last().simulate('click');

      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, 1, true, false);
    });
  });

  it('should import artifacts with fix ocr errors enabled', async () => {
    const file = new File([], 'filename.mp4', { type: 'video/mp4' });
    wrapper.find('#upload-video').simulate('change', { target: { name: '', files: [file] } });

    wrapper
      .find(Checkbox)
      .last()
      .find('input')
      .simulate('change', { target: { name: '', checked: true } });

    await waitFor(() => {
      wrapper.find(ArtifactsImport).find(Button).last().simulate('click');

      expect(artifactsImporterSpy).toHaveBeenCalledWith(file, 1, false, true);
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
