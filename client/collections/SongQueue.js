// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){

  },

  events: {

  },

  playFirst: function() {
    this.at(0).play();
  },

  add: function(model) {
    if (model.length === undefined) model = [model];
    _.each(model, function(item) {
      Songs.prototype.add.call(this, item);
      if (this.length === 1) {
        this.playFirst();
      }
      var added = this.at(this.length - 1);
      added.on('ended', function () {
        this.shift();
        if (this.length) {
          this.playFirst();
        }
      }, this);
      added.on('dequeue', function() {
        this.remove(added);
      },this);
    }, this);
  }

});
