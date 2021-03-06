app.views.Image = Ext.extend(Ext.Panel, {

  title: 'Image Details',
  cls: 'imageDetails',
 layout: 'vbox',
 defaults: {
    width: '100%'
  },
  initComponent: function(){
    var me = this;
    var container = this.attachedTo;
    var title = this.title || '';
    var record = this.record;
    
    this.listeners =  {
      click: {    // FIXME: Expand / collapse code here
          element: 'el',
          fn: function() {    // FIXME: Expand / collapse code here
              container.setActiveItem(0, {type: 'slide', direction: 'right'});
              me.destroy();
              
          }
      }
    };
    
    var image = new Ext.Panel({
      tpl: '<img style="" src="http://www.ciaranlennon.com/images/lenses/{image}" alt="{name}">',
      flex: 1
    });
    var panel = new Ext.Panel({
      tpl: '' +
      '<span class="name">{name}</span><br />'+
      '{medium}<br />'+
      '{size}<br />'
    });
    image.update(record);
    panel.update(record);
    
    this.items = [
      {
        xtype: 'toolbar',
        title: title,
        items: [
                  {
                    xtype: 'button',
                    text: 'Back',
                    ui: 'back',
                    handler: function(){
                      container.setActiveItem(0, {type: 'slide', direction: 'right'});
                      me.destroy();
                    }
                  }
                ]
      },
      image,
      panel
    ];
    
    this.dockedItems = [
                  
    ];
    
    app.views.Image.superclass.initComponent.call(this);
  }
  
});