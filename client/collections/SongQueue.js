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
      var previous = this.at(this.length - 2);
      if (previous !== undefined) {
        item.set('previous', previous);
        previous.set('next', added);
      }
      added.on('ended', function () {
        this.shift();
        if (this.length) {
          this.at(0).set('previous', undefined);
          this.playFirst();
        }
      }, this);
      added.on('dequeue', function() {
        if (added.get('previous') !== undefined) {
          added.previous.set('next', added.get('next'));
        }
        if (added.next !== undefined) {
          added.next.set('previous', added.get('previous'));
        }
        this.remove(added);
      },this);
    }, this);
  }

});
