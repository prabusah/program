var latestQuakeID = "";
var serveStatic = require('serve-static');
var http = require('http');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var moment = require('moment-timezone');
var app = express();
var gistRevision = 'f5062bc6ac1ca08cac39e2020424ada24580967a'
app.use('/build', (req, res, next) => {
    setTimeout(next, 200);
});

app.use('/build', serveStatic(path.join(__dirname, '/build'), {
    lastModified: false,
    maxAge: 86400000
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, '/build/', 'index.html'));
});

app.get("/bundle.js", (request, response) => {
  response.sendFile(path.join(__dirname, '/build/', 'bundle.js'));
});

app.get("/sw.js", (request, response) => {
  response.sendFile(path.join(__dirname, '/build/', 'sw.js'));
});
app.get("/manifest.json", (request, response) => {
  response.sendFile(path.join(__dirname, '/build/', 'manifest.json'));
});
app.get("/sitemap.xml", (request, response) => {
  response.sendFile(__dirname + '/sitemap.xml');
});
app.get("/google85b7222bebaa4811.html", (request, response) => {
  response.sendFile(__dirname + '/google85b7222bebaa4811.html');
});
app.get("/app/submit", (req, res) => {
  gistRevision = req.query.url;
  res.send(gistRevision+ ' Revision updated');
});

app.post("/app/currentProgram", (req, res) => {
  let retText = '';
  fetch('https://gist.githubusercontent.com/prabusah/a059b1abcbc57dcfc316a3461a27b2d8/raw/'+gistRevision+'/programs',
  {headers: {method: 'GET', agent: null, port: 80}})
  .then(function(res) {
      return res.json();
  }).then(function(json) {
      let body = json;
      let features = body.programs;
      //console.log(features);
      for(i=0;i<5;i++){
        let time = features[i].time;
        let hour = moment().tz("Asia/Kolkata").format("HH");
        if(time == hour){
          retText = retText + `
          <div class="card-container">
            <div class="card" id="spl">
              <p class="plan text-center">${features[i].topic}</p>
              <p>&nbsp;</p>
              <div class="text-center">
                <div class="features">
                  <span><b>Time : </b></span><span class="value">${features[i].time}</span>
                </div>
                <div class="features">
                  <span><b>Duration : </b></span><span class="value">${features[i].duration}</span>
                </div>
                <p class="features">
                  <span><b>Description :</b> </span>
                  <span>${features[i].desc}
                </p>
                <p class="features pull-right">
                  <span><b>Presenter : </b></span><span class="value">${features[i].presenter}</span>
                </p>
              </div>
            </div>
          </div>
          `;
        }
      }
      if(retText == '') {
          getNoAgenda();
        }  
  }).catch((error) => {
      console.log(error);
  }).finally(() => {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.write(retText);
      res.end();
  });
});

function getNoAgenda(){
   return `
         <div class="card-container">
            <div class="card" id="spl">
                <p>&nbsp;</p>
                <p class="plan text-center">No Agenda scheduled at this time</p>
                <p class="features"/>
            </div>
          </div>
        `;
}

app.post("/app/pasthour", (req, res) => {
  let retText = '';
  fetch('https://gist.githubusercontent.com/prabusah/a059b1abcbc57dcfc316a3461a27b2d8/raw/'+gistRevision+'/programs',
  {headers: {method: 'GET', agent: null, port: 80}})
  .then(function(res) {
      return res.json();
  }).then(function(json) {
      let body = json;
      let features = body.programs;
      //console.log(features);
      for(i=1;i<=5;i++){
        retText = retText + `
          <div id="timeline-badge${i}" class="timeline-badge" style="top:${i*50}px;">
          </div>
        `
      }
      for(i=0;i<5;i++){
        retText = retText + `
        <div class="card-container">
          <div class="card timeline" id="spl">
            <p class="plan text-center">${features[i].topic}</p>
            <p>&nbsp;</p>
            <div class="text-center">
              <div class="features">
                <span><b>Time : </b></span><span class="value">${features[i].time}</span>
              </div>
              <div class="features">
                <span><b>Duration : </b></span><span class="value">${features[i].duration}</span>
              </div>
              <p class="features">
                <span><b>Description :</b> </span>
                <span>${features[i].desc}
              </p>
              <p class="features pull-right">
                <span><b>Presenter : </b></span><span class="value">${features[i].presenter}</span>
              </p>
            </div>
          </div>
        </div>
        `;
      }  
  }).catch((error) => {
      console.log(error);
  }).finally(() => {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.write(retText);
      res.end();
  });
});



// listen for requests :)
var server = http.createServer(app);

server.listen(3000, () => {
  console.log('Express server listening on port '+3000);
});