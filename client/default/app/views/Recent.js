app.views.Recent = Ext.extend(Ext.Panel, {
  title: 'Recent',
  cls: 'recent',
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
            title: 'Recent Work'
          },
          {
            xtype: 'list',
            width: '100%',
            store: app.stores.recent,
            itemTpl: '<strong>{name}</strong><br />' + 
            '{medium}<br />' +
            '{size}<br />',
            flex: 1,
            //grouped: true,
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
  }
  
});