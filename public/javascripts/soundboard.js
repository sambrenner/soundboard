var soundboard = soundboard || {};
soundboard.main = (function(window,document) {
  var _sounds = [];
  var _instances = {};

  var _saveSounds = function() {
    $('li').each(function() {
      var name = $(this).text();
      createjs.Sound.registerSound("/sounds/" + name, name);
    });
  };

  var _bindClicks = function() {
    $('li').on('click', function() {
      var $this = $(this);
      var name = $this.text();
      
      if($this.data('state') == 'playing') {
        //pause
        $this.removeClass('playing');
        $this.addClass('paused');
        $this.data('state', 'paused');
        _instances[name].pause();
      } else if($this.data('state') == 'paused') {
        //play from pause
        _instances[name].play();
        $this.addClass('playing');
        $this.removeClass('paused');
        $this.data('state', 'playing');
      } else {
        //play from stop
        $this.addClass('playing');
        $this.data('state', 'playing');

        _instances[name] = createjs.Sound.play(name);
        _instances[name].addEventListener('complete', createjs.proxy(function() {
          $this.data('state', 'ready');
          $this.removeClass('playing');
        }, this));
      }
    });
  }

  var self = {
    init: function() {
      _saveSounds();
      _bindClicks();
    }
    
  }

  return self;
})(this,this.document);

$(document).ready(function() {
  soundboard.main.init();
});