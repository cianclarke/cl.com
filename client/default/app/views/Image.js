app.views.Image = Ext.extend(Ext.Panel, {

  title: 'Image Details',
  cls: 'imageDetails',
  tpl: '<img style="height: 80%" src="{image}" alt="{title}"/><br />' +
  '{medium}<br />'+
  '{size}<br />',
  initComponent: function(){
    var container = this.attachedTo;
    var title = this.title || '';
    this.dockedItems = [
                  {
                    xtype: 'toolbar',
                    title: title,
                    items: [
                              {
                                xtype: 'button',
                                text: 'Back',
                                ui: 'back',
                                handler: function(){
                                  container.setActiveItem(0, 'slide');
                                }
                              }
                            ]
                  }
    ]
    app.views.Image.superclass.initComponent.call(this);
  }
  
});