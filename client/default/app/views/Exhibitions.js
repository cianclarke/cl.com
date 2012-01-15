app.views.Exhibitions = Ext.extend(Ext.Panel, {
  title: 'Exhibitions',
  cls: 'exhibitions',
  iconCls: 'user',
  width: '100%',
  layout: {
    type: 'card'
  },
  initComponent: function(){
    var me = this;
    this.items = [
      {
        layout: 'vbox',
        defaults: {
          width: '100%'
        },
        items: [
          {
            xtype: 'toolbar',
            title: 'Exhibitions',
            items: [
              {
                xtype: 'spacer',
              },
              {
                xtype: 'button',
                ui: 'plain',
                iconCls: 'refresh1',
                iconMask: true,
                handler: function(){
                app.stores.recent.load();
                }
                
              }
                    
            ]
          },
          {
            xtype: 'list',
            width: '100%',
            itemCls : 'recentRow',
            store: app.stores.recent,
            itemTpl: '<div class="floatLeft">' +
              '<img src="http://www.ciaranlennon.com/images/lenses/{image}">' +
              '</div>' +
              '<div class=floatLeft">' +
              '{name}<br />' + 
            '<span class="medium">{medium}</span><br />' +
            '<span class="size">{size}</span><br />' + 
            '</div>',
            flex: 1,
            grouped: true,
            pinHeaders: false,
            disableSelection : true,
            listeners: {
              itemtap: function(list, index, el, ev){
                var r = list.store.getAt(index); 
                Ext.dispatch({
                  controller: app.controllers.Recent,
                  action: 'show',
                  record: r,
                  attachTo: app.views.viewport
                });
              }
            }
          }
        ] 
      }
    ];
    app.views.Exhibitions.superclass.initComponent.call(this);
    app.stores.recent.load();
  }
  
});