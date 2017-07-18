import { h, Component } from 'preact';
class Menu extends Component {
  componentDidMount() {
    var menuBarToggle = document.getElementsByClassName('navbar-toggle');
    var navBar = document.getElementById('navbarID');
    
    menuBarToggle[0].addEventListener('click', function(event){
      event.preventDefault();
      if(!navBar.classList.contains('collapse')) return;
      if(navBar.classList.contains('collapse'))
        navBar.classList.remove('collapse');
      else
        navBar.classList.add('collapse');
        
    });
  }
  render() {
    return (
      <div>
      <div className="App">
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="true" aria-controls="navbar">
              <span className="sr-only">Programs</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Programs</a>
          </div>
          <div id="navbarID" className="navbar-collapse collapse" aria-expanded="true">
            <ul className="nav navbar-nav">
              <li className="active"><a className="home" href="/">Home</a></li>
              <li><a className="contact" href="/allPrograms">All Programs</a></li>
            </ul>
          </div>
        </div>
    </nav>
      </div>
      </div>
    );
  }
}

export default Menu;
