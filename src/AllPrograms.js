import { h, Component } from 'preact';
import Menu from './Menu';
import Heading from './Heading';
import Agenda from './Agenda';

class AllPrograms extends Component {
  render() {
    return (
        <div>
            <Menu />
            <Heading />
            <Agenda />
        </div>
    );
  }
}

export default AllPrograms;
