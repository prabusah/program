import { h, render } from 'preact';
import Router from 'preact-router';
import App from './App';
import AllPrograms from './AllPrograms';
import './index.css';
import './images/banner.png';
import './images/close.png';
import './images/details.png';
import './images/quake.png';
import './images/tsunami-144x144.png';
import './images/tsunami-192x192.png';
import './images/tsunami-384x384.png';

const Root = () => {
  return (
  <Router>
      <App exact path="/" />
      <AllPrograms path="/allPrograms" />
  </Router>
  )
}

render(
  <Root />,
  document.getElementById('root')
);
