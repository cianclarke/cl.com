app.views.Dailies = Ext.extend(Ext.Panel, {
  title: 'Dailies',
  cls: 'exhibitions',
  iconCls: 'calendar',
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
            title: 'Dailies',
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
                app.stores.dailies.load();
                }
                
              }
                    
            ]
          },
          {
            xtype: 'list',
            onItemDisclosure: true,
            width: '100%',
            itemCls : 'recentRow',
            store: app.stores.dailies,
            itemTpl: '<div class="floatLeft">' +
              '<img src="http://www.ciaranlennon.com/images/dailies/{image}">' +
              '</div>' +
              '<div class=floatLeft">' +
              '{name}<br />' + 
            '<span class="medium">{medium}</span><br />' +
            '<span class="size">{size}</span><br />' + 
            '</div>',
            flex: 1,
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
    app.views.Dailies.superclass.initComponent.call(this);
    app.stores.dailies.load();
  }
  
});