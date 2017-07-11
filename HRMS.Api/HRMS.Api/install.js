var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Info Mirror',
  description: 'The nodejs.org example web server.',
  script: require('path').join(__dirname,'app.js'),
  env:{
    name: "NODE_ENV",
    value: "production"
  }
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
var EventLogger = require('node-windows').EventLogger;

var log = new EventLogger('Hello World');

log.info('Basic information.');
log.warn('Watch out!');
log.error('Something went wrong.');
// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' started!\nVisit http://127.0.0.1:9095 to see it in action.');
});

// Install the script as a service.
svc.install();