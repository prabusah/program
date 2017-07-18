import { h, Component } from 'preact';

class CurrentProgram extends Component {
  componentDidMount() {
    fetch('/app/currentProgram', {method: 'post'})  
        .then(function(response) {  
          return response.text();  
        })  
        .then(function(text) {
            if(text === "")  text = "We are Sorry, things went wrong....Please try after sometime";
            document.getElementById('pastHourData').innerHTML = text;
        })  
        .catch(function(error) {
            document.getElementById('pastHourData').innerHTML = "We are Sorry, getting error....Please try after sometime";  
        }); 
  }  
  render() {
    return (
    <div className="col-sm-offset-0 col-sm-12">
      <p className="lead helpCustom">Current Agenda!</p>
      <hr width="1" size="500"/>
      <div id="pastHourData">
        <p className="text-center">Fetching.... Please wait</p>
      </div>
      <hr/>
    </div>
    );
  }
}

export default CurrentProgram;
