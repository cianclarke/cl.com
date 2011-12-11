app.views.Image = Ext.extend(Ext.Panel, {

  title: 'Image Details',
  cls: 'imageDetails',
 layout: 'vbox',
  initComponent: function(){
    var me = this;
    var container = this.attachedTo;
    var title = this.title || '';
    var record = this.record;
    
    this.listeners =  {
      click: {    // FIXME: Expand / collapse code here
          element: 'el',
          fn: function() {    // FIXME: Expand / collapse code here
              container.setActiveItem(0, 'slide');
              me.destroy();
              
          }
      }
    };
    
    var image = new Ext.Panel({
      tpl: '<img style="min-width: 500px; min-height: 500px;" src="http://www.ciaranlennon.com/images/lenses/{image}" alt="{name}">',
      flex: 1
    });
    var panel = new Ext.Panel({
      tpl: '<img style="height: 80%" src="http://www.ciaranlennon.com/images/lenses/{image}" alt="{title}"/><br />' +
      '<span class="name">{name}</span><br />'+
      '{medium}<br />'+
      '{size}<br />'
    });
    image.update(record);
    panel.update(record);
    
    this.items = [
      image,
      panel
    ];
    
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
                                  me.destroy();
                                }
                              }
                            ]
                  }
    ];
    
    app.views.Image.superclass.initComponent.call(this);
  }
  
});