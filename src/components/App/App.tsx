import {Grid} from '../Grid';
import './App.css'
import data from '../../assets/data.json';
import gridDefinition from '../../assets/gridDefinition.json';

function App() {

  // Plain and simple grid, nothing more. Pass the data, users and definition
  return (
    <Grid data={data} definition={gridDefinition} />
  )
}

export default App
