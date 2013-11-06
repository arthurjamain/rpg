define([
  'underscore',
  'backbone'
], function(
  _,
  B
) {

  var obj = function(opt) {
    if (typeof this.initialize === 'function') {
      this.initialize(opt);
    }
  };

  _.extend(obj, Backbone.Events, {

  });

  obj.extend = Backbone.View.extend;

  return obj;

})