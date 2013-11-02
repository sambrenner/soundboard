var fs = require('fs');

exports.index = function(req, res){
  var sounds = fs.readdirSync('./public/sounds');

  res.render('index', { title: 'Soundboard', sounds: sounds });
};