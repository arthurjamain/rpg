define([
  'underscore',
  'backbone'
], function(
  _,
  B
) {

  var obj = function constructor (opt) {
    if (typeof this.initialize === 'function') {
      this.initialize(opt);
    }
  };

  _.extend(obj.prototype, Backbone.Events, {

  });

  obj.extend = Backbone.View.extend;

  return obj;

})