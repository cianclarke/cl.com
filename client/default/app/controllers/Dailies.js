app.controllers.Dailies = new Ext.Controller({
  show: function(options){
      // show a shiny new panel in here
      var attachTo = options.attachTo,
      record = options.record;
      var panel = new app.views.Image({
        attachedTo: attachTo,
        title: record.data.title,
        record: record.data
      });
      attachTo.setActiveItem(panel, 'slide');

  }
});