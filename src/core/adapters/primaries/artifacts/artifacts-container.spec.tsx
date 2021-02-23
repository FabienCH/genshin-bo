import ArtifactsContainer from './artifacts-container';
import { AgGridReact } from 'ag-grid-react';
import { mount, ReactWrapper } from 'enzyme';
import { ArtifactsHandler } from '../../../usescases/artifacts-handler';
import { InMemoryArtifactsRepository } from '../../secondaries/in-memory-artifacts-repository';

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
  beforeEach(() => {
    wrapper = mount(<ArtifactsContainer />);
    agGridReact = wrapper.find(AgGridReact).instance();
  });

  it('renders with a grid of artifacts', (done) => {
    const artifactsHandler = new ArtifactsHandler(new InMemoryArtifactsRepository());
    const artifacts = artifactsHandler.getAll();
    ensureGridApiHasBeenSet(agGridReact).then(() => done());

    expect(agGridReact.props.rowData).toEqual(artifacts);
  });
});
