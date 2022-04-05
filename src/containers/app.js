import React from 'react';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';
import {registerLoaders} from '@loaders.gl/core';
import {OBJLoader} from '@loaders.gl/obj';

registerLoaders([OBJLoader]);

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

const obj_1F = '../../obj/p_tokai_1F_joined.obj';
const obj_3F = '../../obj/p_tokai_3F_joined.obj';

class App extends Container {
  componentDidMount(){
    super.componentDidMount();
    this.props.actions.setViewport({ zoom:16.0 });
  }

  render() {
    const { actions, clickedObject, inputFileName, viewport,
      routePaths, movesbase, movedData } = this.props;
    const { movesFileName } = inputFileName;
    const optionVisible = false;

    return (
      <div>
        <div className="harmovis_controller">
          <ul className="flex_list">
            <li className="flex_row">
              <div className="harmovis_input_button_column">
              <label htmlFor="MovesInput">
                Operation data<MovesInput actions={actions} id="MovesInput" />
              </label>
              <div>{movesFileName}</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData,
                clickedObject, actions, optionVisible }),

              new SimpleMeshLayer({
                id:'obj_1F',
                data:[{position:[136.8997048380978,35.18488012688885]}],
                mesh:obj_1F,
                getColor:[0,255,255,255],
                getOrientation:[0,180,90],
                opacity: 1.0,
              }),

              new SimpleMeshLayer({
                id:'obj_3F',
                data:[{position:[136.90318096442977,35.18490625444084]}],
                mesh:obj_3F,
                getColor:[0,255,0,255],
                getOrientation:[0,180,90],
                opacity: 1.0,
              })
            ]}
          />
        </div>
      </div>
    );
  }
}
export default connectToHarmowareVis(App);
