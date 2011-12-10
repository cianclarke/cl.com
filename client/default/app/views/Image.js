app.views.Image = Ext.extend(Ext.Panel, {

  title: 'Image Details',
  cls: 'imageDetails',
  tpl: '<img style="height: 80%" src="http://www.ciaranlennon.com/images/lenses/{image}" alt="{title}"/><br />' +
  '<span class="name">{name}</span><br />'+
  '{medium}<br />'+
  '{size}<br />',
  initComponent: function(){
    var me = this;
    var container = this.attachedTo;
    var title = this.title || '';
    
    this.listeners =  {
      click: {    // FIXME: Expand / collapse code here
          element: 'el',
          fn: function() {    // FIXME: Expand / collapse code here
              container.setActiveItem(0, 'slide');
              me.destroy();
              
          }
      }
    };
    
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