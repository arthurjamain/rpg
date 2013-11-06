define([
  'jquery',
  'js/game/Object'
], function(
  $,
  BaseObject
) {

  return BaseObject.extend({

    initialize: function(opt) {

      // Assign default values
      _.defaults(opt, {
        container   : document.body,
        width       : 800,
        height      : 600
      });

      // Store / format values
      this.$container = $('#' + opt.container);
      this.width = opt.width;
      this.height = opt.height;

      // Init
      this.initCanvas();

      console.info('Scene initialized.');
    },


    initCanvas: function() {
      this.c1 = document.createElement('canvas');
      this.c1.className = 'displayer';
      this.c1.width = this.width;
      this.c1.height = this.height;

      this.c2 = document.createElement('canvas');
      this.c2.className = 'drawer';
      this.c2.width = this.width;
      this.c2.height = this.height;

      this.$container.append(this.c1);
      this.$container.append(this.c2);

      console.info('Canvas initialized.');
    }

  });

})