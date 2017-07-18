import { h, Component } from 'preact';

class Agenda extends Component {
  componentDidMount() {
    fetch('/app/pasthour', {method: 'post'})  
        .then(function(response) {  
          return response.text();  
        })  
        .then(function(text) {
            if(text === "")  text = "We are Sorry, things went wrong....Please try after sometime";
            document.getElementById('pastHourData').innerHTML = text;
            var ele = document.querySelectorAll(".timeline-badge");
            for(let i=0;i<ele.length;i++){
              ele[i].addEventListener('click', function(event){
                  var selectedID = document.getElementById(event.target.id);
                  selectedID.style.backgroundColor = "greenyellow";
              });
            }  
        })  
        .catch(function(error) {
            document.getElementById('pastHourData').innerHTML = "We are Sorry, getting error....Please try after sometime";  
        }); 
  }  
  render() {
    return (
    <div className="col-sm-offset-0 col-sm-12">
      <p className="lead helpCustom">Complete Agenda for today!</p>
      <div id="pastHourData">
        <p className="text-center">Fetching.... Please wait</p>
      </div>
      <hr/>
    </div>
    );
  }
}

export default Agenda;
