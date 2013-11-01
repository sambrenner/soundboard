var http = require('http');
var fs = require('fs');

http.createServer(function(req,res) {
  var sounds = fs.readdirSync('./sounds');
  
  res.writeHead(200, {'Content-Type':'text/html'});

  res.write('<ul>');

  for(var i=0; i<sounds.length; i++) {
    var sound = sounds[i];
    res.write('<li>' + sound + '</li>');
  }

  res.write('</ul>');

  res.end();
}).listen(8080, '127.0.0.1');

console.log('Soundboard is running on http://127.0.0.1:8080');