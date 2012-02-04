app.views.Recent = Ext.extend(Ext.Panel, {
  title: 'Recent',
  cls: 'recent',
  iconCls: 'home',
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
            title: 'Recent Work',
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
            onItemDisclosure: true,
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
    app.views.Recent.superclass.initComponent.call(this);
    app.stores.recent.load();
  }
  
});