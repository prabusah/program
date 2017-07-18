import { h, Component } from 'preact';
import Menu from './Menu';
import Heading from './Heading';
import CurrentProgram from './CurrentProgram';

class App extends Component {
  render() {
    return (
        <div>
            <Menu />
            <Heading />
            <CurrentProgram />
        </div>
    );
  }
}

export default App;
