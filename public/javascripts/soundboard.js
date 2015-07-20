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
        _instances[name].paused = true;
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

    /**
     * Filter input.
     *
     * Checks to see if the track label in a soundcard matches user input.
     * hides all the divs that do not match and only shows matching divs.
     */
    $('#soundboard-filter').keyup(function () {
        var filter = $("#soundboard-filter").val();
        console.log('$(this).find(".panel-body:not(:contains("' + filter + '"))');
        $('#soundcards').each(function() {
            $(this).find(".panel-body:not(:contains('" + filter + "'))").parent().parent().hide();
            $(this).find(".panel-body:contains('" + filter + "')").parent().parent().show();
        });
    });
  };

  var self = {
    init: function() {
      _saveSounds();
      _bindClicks();
    }

  };

  return self;
})(this,this.document);

$(document).ready(function() {
  soundboard.main.init();
});
