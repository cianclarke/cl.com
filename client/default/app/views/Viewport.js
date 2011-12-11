app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
          home: new app.views.Home(),
          //countries: new app.views.Countries(),
          recent: new app.views.Recent(),
          cv: new app.views.CV()
        });
        //put instances of cards into viewport
        Ext.apply(this, 
          {
            height: '100%',
            items: [
                {
                  layout: 'vbox',
                  defaults: {
                    width: '100%'
                  },
                  items: [
                    {
                      xtype: 'toolbar',
                      cls: 'header',
                      title: 'Ciar&aacute;n Lennon'
                    },
                    new Ext.TabPanel({
                      cardSwitchAnimation: 'slide',
                      flex: 1,
                      tabBar: new Ext.TabBar({
                        dock: 'top',
                        layout: {
                            pack: 'center'
                        },
                      }),
                      items: [
                        app.views.recent,
                        app.views.home,
                        app.views.cv
                      ]
                    }), 
                  ]
                }
                
                
            ]
        });
        app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});