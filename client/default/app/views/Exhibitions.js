app.views.Exhibitions = Ext.extend(Ext.Panel, {
  title: 'Exhibitions',
  cls: 'exhibitions',
  iconCls: 'globe_black',
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
                app.stores.exhibitions.load();
                }
                
              }
                    
            ]
          },
          {
            xtype: 'list',
            width: '100%',
            onItemDisclosure: true,
            itemCls : 'recentRow',
            store: app.stores.exhibitions,
            itemTpl: '<div class="floatLeft">' +
                  '<tpl for="images">' +
                  '' +
                  '<img src="http://www.ciaranlennon.com/{.}" alt="Preloader Image" style="display: {[xindex === 1 ? "block" : "none"]};">' +
                  '</tpl>' +
              '</div>' +
              '<div class=floatLeft">' +
              '<h2>{name}</h2><br />' + 
            '<span class="medium">{medium}</span><br />' +
            '</div>',
            flex: 1,
            disableSelection : true,
            listeners: {
              itemtap: function(list, index, el, ev){
                var r = list.store.getAt(index); 
                Ext.dispatch({
                  controller: app.controllers.Exhibit,
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
    app.stores.exhibitions.load();
  }
  
});