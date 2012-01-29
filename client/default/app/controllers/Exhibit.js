app.controllers.Exhibit = new Ext.Controller({
  show: function(options){
      // show a shiny new panel in here
      var attachTo = options.attachTo,
      record = options.record;
      var panel = new app.views.Exhibit({
        attachedTo: attachTo,
        title: record.data.name,
        record: record.data
      });
      attachTo.setActiveItem(panel, 'slide');

  }
});